/**
 * Generate showcase data from https://github.com/chakra-ui/awesome-chakra-ui
 * Take websites' screenshots with puppeteer to display as preview images
 */

import puppeteer from 'puppeteer'
import path from 'path'
import fs from 'fs'
import sharp from 'sharp'
import _ from 'lodash'
import { Octokit } from 'octokit'

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

export type IShowcase = Record<ShowcaseKeys, ShowcaseItem[]> | {}

const DIR_FOR_STORING_PREVIEW_IMAGE = 'showcases'
const CONFIG_PATH = './configs/showcase.json'
const DEFAULT_VIEWPORT_WIDTH = 1920
const DEFAULT_VIEWPORT_HEIGHT = 1080

async function main() {
  // Open the browser with width 1920 and height 1080
  const browser = await puppeteer.launch({
    defaultViewport: {
      width: DEFAULT_VIEWPORT_WIDTH,
      height: DEFAULT_VIEWPORT_HEIGHT,
    },
  })
  // Create a new page
  const page = await browser.newPage()
  // Configure the navigation timeout
  await page.setDefaultNavigationTimeout(0)
  // Clone the whole object
  const newData = await generateShowcaseData()
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
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(newData, null, 2))
  await browser.close()
}

/**
 * We might need to create a token. Or it might reach api rate limit easily
 */
const octokit = new Octokit({
  auth: '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',
})

//https://github.com/chakra-ui/awesome-chakra-ui

const REPO_CONFIG = {
  mediaType: {
    format: 'raw',
  },
  owner: 'chakra-ui',
  repo: 'awesome-chakra-ui',
  path: 'README.md',
}

// Generate showcase data from awesome-chakra-ui without preview images
async function generateShowcaseData() {
  const { data } = await octokit.rest.repos.getContent(REPO_CONFIG)
  const splitContent = (data as any).split('##')
  const len = splitContent.length

  // Remove the first two sections and the last section (for contributors)
  const categories = splitContent.slice(2, len - 1)

  // Get the parsed data from awesome-chakra-ui
  const parsedDataFromRepo = await parseRepoData(categories)

  return parsedDataFromRepo
}

// An instance of the item inside each of categories
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
      /**
       * More about string.match()
       * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match
       */

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
        ?.trim()

      if (!isGithubUrl(link)) {
        parsedItems.push(
          new Item({ name, url: link, description, type: category }),
        )
        continue
      }
      const { owner, repo } = parseGithubUrl(link)

      // Get the homepage from repo
      let url = ''

      try {
        url = await getHomePage({ owner, repo })
      } catch (err) {
        console.error(err)
        continue
      }

      parsedItems.push(
        new Item({
          name,
          url,
          github: link,
          description,
          type: category,
        }),
      )
    }
    parsedData[category as ShowcaseKeys] = parsedItems
  }

  return parsedData
}

// Check if the url is a github's url
const isGithubUrl = (url: string) => {
  const githubUrlPrefix = '^(https|http)://github.com/'
  return new RegExp(githubUrlPrefix).test(url)
}

// Parse the url of the github repo to get { owner, repo }
const parseGithubUrl = (url: string) => {
  if (!isGithubUrl(url)) return

  const splitUrl = url.split('/').filter((s) => s !== '')
  const len = splitUrl.length

  // Check if the url is a root of the repo
  if (len !== 4) return

  const owner = splitUrl[len - 2]
  const repo = splitUrl[len - 1]

  return { owner, repo }
}

// Get the homepage's url from repo
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
