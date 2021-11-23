import puppeteer from 'puppeteer'
import path from 'path'
import fs from 'fs'
import showcaseData from '../configs/showcase.json'

async function generatePreviewImage() {
  const browser = await puppeteer.launch({
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
  })
  const page = await browser.newPage()
  const keys = Object.keys(showcaseData)

  for (let key of keys) {
    const dir = path.join(__dirname, '..', 'public', 'showcases', key)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    }
    const target = showcaseData[key]

    for (let i = 0; i < target.length; i++) {
      const { url, name } = target[i]
      if (!url) continue
      await page.goto(url, { waitUntil: 'networkidle2' })
      const imagePath = path.join(dir, `${name.split(' ').join('-')}.png`)
      await page.screenshot({ path: imagePath })
    }
  }

  await browser.close()
}

try {
  generatePreviewImage()
} catch (err) {
  console.log(err)
}
