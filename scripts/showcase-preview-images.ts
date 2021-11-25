import puppeteer from 'puppeteer'
import path from 'path'
import fs from 'fs'
import sharp from 'sharp'
import _ from 'lodash'
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

async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function writeImagePathIntoConfigFile(result: IShowcase) {
  fs.writeFileSync('./configs/showcase.json', JSON.stringify(result, null, 2))
}

try {
  generatePreviewImage()
} catch (err) {
  console.log(err)
}
