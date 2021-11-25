import puppeteer from 'puppeteer'
import path from 'path'
import fs from 'fs'
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

export type IShowcase = Record<string, ShowcaseItem[]>

const DIR_FOR_STORING_PREVIEW_IMAGE = 'showcases'

async function generatePreviewImage() {
  // Open the browser with width 1920 and height 1080
  const browser = await puppeteer.launch({
    defaultViewport: {
      width: 1920,
      height: 1080,
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
      // Go to the url and wait for completing loading
      await page.goto(url, { waitUntil: 'networkidle2' })

      // Get a image file name
      const fileName = `${name.split(' ').join('-')}.png`
      // Get an appropriate image path
      const imagePath = path.join(localDirToPreviewImageDir, fileName)
      // Add image path into showcase object
      target[i].image = path.join(DIR_FOR_STORING_PREVIEW_IMAGE, key, fileName)
      // Take a screenshot of the page
      await page.screenshot({ path: imagePath })
    }
  }
  // Renew the whole showcase data
  writeImagePathIntoConfigFile(newData)
  await browser.close()
}

function writeImagePathIntoConfigFile(result: IShowcase) {
  fs.writeFileSync('./configs/showcase.json', JSON.stringify(result, null, 2))
}

try {
  generatePreviewImage()
} catch (err) {
  console.log(err)
}
