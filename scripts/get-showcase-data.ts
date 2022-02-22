import puppeteer from 'puppeteer'
import path from 'path'
import fs from 'fs'
import sharp from 'sharp'
import _ from 'lodash'
import { Octokit } from 'octokit'
import dotenv from 'dotenv'
import showcaseData from '../configs/showcase.json'
import fetch from 'node-fetch'

dotenv.config()

export type ShowcaseKeys =
  | 'projects'
  | 'websites'
  | 'libraries'
  | 'tools'
  | 'articles'

export type ShowcaseItem = {
  name: string
  description: string | null
  url: string | null
  type: ShowcaseKeys | null
  image: string | null
}

export type IShowcase = Partial<Record<ShowcaseKeys, ShowcaseItem[]>>

const DIR_FOR_STORING_PREVIEW_IMAGE = 'showcases'
const CONFIG_PATH = './configs/showcase.json'
const DEFAULT_VIEWPORT_WIDTH = 1920
const DEFAULT_VIEWPORT_HEIGHT = 1080

async function main() {
  const browser = await puppeteer.launch({
    defaultViewport: {
      width: DEFAULT_VIEWPORT_WIDTH,
      height: DEFAULT_VIEWPORT_HEIGHT,
    },
  })

  const page = await browser.newPage()

  const newData = await generateShowcaseData()

  // Remove those data existing in showcase.json but not existing in chakra-awesome-repo
  const polishedCurrentData = removeDeletedData(newData)

  const keys = Object.keys(newData)

  for (let key of keys) {
    const localDirToPreviewImageDir = path.join(
      process.cwd(),
      'public',
      DIR_FOR_STORING_PREVIEW_IMAGE,
      key,
    )

    if (!fs.existsSync(localDirToPreviewImageDir)) {
      fs.mkdirSync(localDirToPreviewImageDir)
    }

    const target = newData[key]

    if (!polishedCurrentData[key]) {
      polishedCurrentData[key] = []
    }

    for (let i = 0; i < target.length; i++) {
      const { url, name } = target[i]
      const currentDataTarget = polishedCurrentData[key]

      const showcaseDataTargetItem = currentDataTarget.filter(
        (item) => item.url === url,
      )[0]

      if (!url) continue

      // If the data does exist and we fetched the image before, pass it
      if (showcaseDataTargetItem) continue

      // If it's youtube's url, use a thumbnail instead of a screenshot
      if (isYoutubeVideoUrl(url) || isYoutubeShortUrl(url)) {
        target[i].image = getYouTubeThumbnail(url)
        continue
      }

      if (isGitHubImageUrl(url)) {
        target[i].image = await getGitHubSocialImage(
          url,
          name,
          localDirToPreviewImageDir,
          key,
        )
        continue
      }

      try {
        await page.goto(url, { waitUntil: 'networkidle2' })
      } catch (error) {
        console.log(error)
      }

      await wait(1000)

      // Escapes characters that cannot be used on Windows.
      const escapedName = name.replace(/[<>:"/¥|?*]+/g, '-')

      const fileName = `${escapedName.split(' ').join('-')}.png`
      const imagePath = path.join(localDirToPreviewImageDir, fileName)
      target[i].image = path.join(DIR_FOR_STORING_PREVIEW_IMAGE, key, fileName)
      const buffer = await page.screenshot()

      currentDataTarget.push(target[i])

      sharp(buffer)
        .resize(850)
        .toFile(imagePath, (err, info) => {
          if (err) console.error(err)
          console.log(info)
        })
    }
  }
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(polishedCurrentData, null, 2))
  await browser.close()
}

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
})

const REPO_CONFIG = {
  mediaType: {
    format: 'raw',
  },
  owner: 'chakra-ui',
  repo: 'awesome-chakra-ui',
  path: 'README.md',
}

// Generate showcase data from https://github.com/chakra-ui/awesome-chakra-ui
async function generateShowcaseData() {
  const { data } = await octokit.rest.repos.getContent(REPO_CONFIG)
  const splitContent = (data as any).split('##')
  const len = splitContent.length

  // Remove the first two sections and the last section (for contributors)
  const categories = splitContent.slice(2, len - 1)

  const parsedDataFromRepo = await parseRepoData(categories)

  return parsedDataFromRepo
}

class Item {
  name: string
  description?: string
  url?: string
  image?: string
  type: string

  constructor({ name, description = null, url = null, image = null, type }) {
    this.name = name
    this.description = description
    this.url = url
    this.image = image
    this.type = type
  }
}

// Parse the data into type of `IShowcase`
const parseRepoData = async (context: string[]): Promise<IShowcase> => {
  let parsedData: IShowcase = {}

  for (let c of context) {
    const splitItems = c.split('\n').filter((s) => s !== '')

    const category = splitItems
      .shift()
      .split(' ')
      .filter((s) => s !== '')[1]
      ?.toLowerCase()
    let parsedItems = []

    if (!category) continue

    for (let str of splitItems) {
      const curlyBraces = /\[(.*?)\]/
      const parentheses = /\(((https|http).*?)\)/

      const name = str.match(curlyBraces)[1]
      const link = str.match(parentheses)[1]

      let description = str
        .replace(curlyBraces, '')
        .replace(parentheses, '')
        .slice(4)

      let innerLinks = description.match(curlyBraces)

      while (innerLinks) {
        description = description
          .replace(parentheses, '')
          .replace(curlyBraces, innerLinks[1])
        innerLinks = description.match(curlyBraces)
      }

      if (!isGithubUrl(link)) {
        parsedItems.push(
          new Item({ name, url: link, description, type: category }),
        )
        continue
      }
      const parsedUrl = parseGithubUrl(link)

      if (!parsedUrl) {
        console.error('ERROR', link)
        continue
      }

      const { owner, repo } = parsedUrl

      let url = link

      try {
        url = (await getHomePage({ owner, repo })) ?? link
      } catch (err) {
        console.error(err)
        continue
      }

      parsedItems.push(
        new Item({
          name,
          url,
          description,
          type: category,
        }),
      )
    }
    parsedData[category as ShowcaseKeys] = parsedItems
  }

  return parsedData
}

const removeDeletedData = (newData: IShowcase) => {
  const duplicatedData = _.cloneDeep(showcaseData)

  for (const [key, value] of Object.entries(duplicatedData as IShowcase)) {
    const categoryInNewData: ShowcaseItem[] = newData[key]
    if (!categoryInNewData) {
      delete duplicatedData[key]
      continue
    }

    const polishedValue = value.filter(({ name }) => {
      return categoryInNewData.some(
        ({ name: newDataName }) => newDataName === name,
      )
    })

    duplicatedData[key] = polishedValue
  }

  return duplicatedData
}

const isGithubUrl = (url: string) => {
  const githubUrlPrefix = '^(https|http)://github.com/'
  return new RegExp(githubUrlPrefix).test(url)
}

const youtubeVideoUrlPrefix = /(https|http):\/\/(www.|)youtube.com\/watch\?v=+/i
const youtubeShortUrlPrefix = /(https|http):\/\/youtu.be\//i
const githubUrlPrefix = /(https|http):\/\/github.com\//i

const isYoutubeVideoUrl = (url: string) => youtubeVideoUrlPrefix.test(url)
const isYoutubeShortUrl = (url: string) => youtubeShortUrlPrefix.test(url)
const isGitHubImageUrl = (url: string) => githubUrlPrefix.test(url)

const getYoutubeVideoId = (youtubeUrl: string) =>
  isYoutubeVideoUrl(youtubeUrl)
    ? youtubeUrl.replace(youtubeVideoUrlPrefix, '').replace(/\&.*/, '')
    : youtubeUrl.replace(youtubeShortUrlPrefix, '').replace(/\&.*/, '')

const getYouTubeThumbnail = (youtubeUrl: string) => {
  const youtubeId = getYoutubeVideoId(youtubeUrl)
  return `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
}

const META_IMAGE_REGEX =
  /<meta(?=\s|>)(?=(?:[^>=]|='[^']*'|="[^"]*"|=[^'"][^\s>]*)*?\sproperty=(?:'og:image|"og:image"|og:image))(?=(?:[^>=]|='[^']*'|="[^"]*"|=[^'"][^\s>]*)*?\scontent=('[^']*'|"[^"]*"|[^'"][^\s>]*))(?:[^'">=]*|='[^']*'|="[^"]*"|=[^'"][^\s>]*)*>/g
const getGitHubSocialImage = async (
  repoUrl: string,
  name: string,
  localDirToPreviewImageDir: string,
  key: string,
) => {
  try {
    const pageContents = await (await fetch(repoUrl)).text()
    const metaImage = pageContents.match(META_IMAGE_REGEX)
    const imageRegex = /https:\/\/.+"/
    const imageUrl = imageRegex.exec(metaImage[0])[0].slice(0, -1)

    const fileName = `${name.split(' ').join('-')}.png`
    const imagePath = path.join(localDirToPreviewImageDir, fileName)

    const blob = await (await fetch(imageUrl)).blob()
    const buffer = await blob.stream().read()

    sharp(buffer)
      .resize(850)
      .toFile(imagePath, (err, info) => {
        if (err) console.error(err)
        console.log(info)
      })

    return path.join(DIR_FOR_STORING_PREVIEW_IMAGE, key, fileName)
  } catch (err) {
    console.error(err)
  }
}

const parseGithubUrl = (url: string) => {
  if (!isGithubUrl(url)) return

  const splitUrl = url.split('/').filter((s) => s !== '')
  const len = splitUrl.length

  // Check if the url is the root of the repo
  if (len !== 4) return

  const owner = splitUrl[len - 2]
  const repo = splitUrl[len - 1]

  return { owner, repo }
}

const getHomePage = async ({ owner, repo }) => {
  try {
    const { data } = await octokit.rest.repos.get({
      owner,
      repo,
    })
    return data?.homepage || null
  } catch (err) {
    console.error(err)
  }
}

const wait = async (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

try {
  main()
} catch (err) {
  console.log(err)
}
