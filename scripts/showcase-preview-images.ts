import puppeteer from 'puppeteer'
import path from 'path'
import fs from 'fs'
import sharp from 'sharp'
import _ from 'lodash'
import { Octokit } from 'octokit'

import showcaseData from '../configs/showcase.json'

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
  github: string | null
  image: string | null
}

export type IShowcase = Record<ShowcaseKeys, ShowcaseItem[]>

const DIR_FOR_STORING_PREVIEW_IMAGE = 'showcases'
const DEFAULT_VIEWPORT_WIDTH = 1920
const DEFAULT_VIEWPORT_HEIGHT = 1080

/**
 * We might need to create a token. Or it might reach api rate limit easily
 */
const octokit = new Octokit({
  auth: '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',
})

const REPO_CONFIG = {
  mediaType: {
    format: 'raw',
  },
  owner: 'chakra-ui',
  repo: 'awesome-chakra-ui',
  path: 'README.md',
}

async function generateShowcaseData() {
  const { data } = await octokit.rest.repos.getContent(REPO_CONFIG)
  const splitContent = (data as any).split('##')
  const len = splitContent.length

  const categories = splitContent.slice(2, len - 1)

  const parsedDataFromAwesomeChakraUI = await parseRepoData(
    categories.slice(0, 1),
  )

  console.log(JSON.stringify(parsedDataFromAwesomeChakraUI, null, 2))

  return parsedDataFromAwesomeChakraUI
}

async function generatePreviewImage() {
  // Open the browser with width 1920 and height 1080
  const browser = await puppeteer.launch({
    defaultViewport: {
      width: DEFAULT_VIEWPORT_WIDTH,
      height: DEFAULT_VIEWPORT_HEIGHT,
    },
  })
  // Create a new page
  const page = await browser.newPage()
  // Clone the whole object
  const newData = _.cloneDeep(showcaseData as IShowcase)
  // Get all categories
  const keys = Object.keys(newData)

  for (let key of keys) {
    const localDirToPreviewImageDir = path.join(
      process.cwd(),
      'public',
      DIR_FOR_STORING_PREVIEW_IMAGE,
      key,
    )
    // If there is no directory, create a new one
    if (!fs.existsSync(localDirToPreviewImageDir)) {
      fs.mkdirSync(localDirToPreviewImageDir)
    }
    // Look into a specific category
    const target = newData[key]

    for (let i = 0; i < target.length; i++) {
      const { url, name } = target[i]
      // If there is no url in the item, jump to the next item
      if (!url) continue
      // Go to the url and consider navigation to be finished when there are no more than 2 network connections for at least 500 ms.
      await page.goto(url, { waitUntil: 'networkidle2' })

      await wait(1000)

      // Get a image file name
      const fileName = `${name.split(' ').join('-')}.png`
      // Get an appropriate image path
      const imagePath = path.join(localDirToPreviewImageDir, fileName)
      // Add image path into showcase object
      target[i].image = path.join(DIR_FOR_STORING_PREVIEW_IMAGE, key, fileName)
      // Take a screenshot of the page
      const buffer = await page.screenshot()
      // Resize the image to avoid performance issues
      sharp(buffer)
        .resize(850)
        .toFile(imagePath, (err, info) => {
          if (err) console.error(err)
          console.log(info)
        })
    }
  }
  // Renew the whole showcase data
  writeImagePathIntoConfigFile(newData)
  await browser.close()
}

const wait = async (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

const writeImagePathIntoConfigFile = (result: IShowcase) => {
  fs.writeFileSync('./configs/showcase.json', JSON.stringify(result, null, 2))
}

//https://github.com/chakra-ui/awesome-chakra-ui

class Item {
  name: string
  description?: string
  url?: string
  github?: string
  image?: string
  type: string

  constructor({
    name,
    description = null,
    url = null,
    github = null,
    image = null,
    type,
  }) {
    this.name = name
    this.description = description
    this.url = url
    this.github = github
    this.image = image
    this.type = type
  }
}

const parseRepoData = async (context: string[]) => {
  let parsedData = {}

  for (let c of context) {
    const splitItems = c.split('\n').filter((s) => s !== '')

    const category = splitItems
      .shift()
      .split(' ')
      .filter((s) => s !== '')[1]
    let parsedItems = []

    for (let str of splitItems) {
      const curlyBraces = /\[(.*?)\]/
      const parentheses = /\(((https|http).*?)\)/
      // Get the content inside the first curly brackets, array[1]
      const name = str.match(curlyBraces)[1]
      // Get what we caught in the first parentheses, using array[1]
      const link = str.match(parentheses)[1]
      // Description
      const description = str
        .replace(curlyBraces, '')
        .replace(parentheses, '')
        .split(':')
        .filter((s) => s !== ' ')[1]

      if (!isGithubUrl(link)) {
        parsedItems.push(
          new Item({ name, url: link, description, type: category }),
        )
        continue
      }
      const { owner, repo } = parseGithubUrl(link)

      let homepage = ''

      try {
        homepage = await getHomePage({ owner, repo })
      } catch (err) {
        console.error(err)
      }

      parsedItems.push(
        new Item({
          name,
          url: homepage,
          github: link,
          description,
          type: category,
        }),
      )
    }
    parsedData[category] = parsedItems
  }

  return parsedData
}

const isGithubUrl = (url) => {
  const githubUrlPrefix = '^(https|http)://github.com/'
  return new RegExp(githubUrlPrefix).test(url)
}

const parseGithubUrl = (url) => {
  if (!isGithubUrl(url)) return

  const splitUrl = url.split('/').filter((s) => s !== '')
  const len = splitUrl.length

  const owner = splitUrl[len - 2]

  const repo = splitUrl[len - 1]

  return { owner, repo }
}

const getHomePage = async ({ owner, repo }) => {
  try {
    const {
      data: { homepage },
    } = await octokit.rest.repos.get({
      owner,
      repo,
    })
    return homepage || null
  } catch (err) {
    console.error(err)
  }
}

try {
  generatePreviewImage()
} catch (err) {
  console.log(err)
}
