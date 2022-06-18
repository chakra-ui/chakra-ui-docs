import fs from 'fs'
import path from 'path'
import prettier from 'prettier'

const id = 'other'
const basePath = path.join('content', 'docs', 'components', id)

const files = fs.readdirSync(basePath)
const baseNames = files.map((file) => path.basename(file, '.mdx'))
const format = (code: string) => prettier.format(code, { parser: 'markdown' })

const template = (id: string, scope: string, content?: string) =>
  format(`
---
id: ${id}
scope: ${scope}
---

${content ?? ''}
`)

for (const name of baseNames) {
  const content = fs.readFileSync(path.join(basePath, `${name}.mdx`), 'utf8')
  // cut the contents from where "## Props" starts to the end of the file
  const [mainContent, propsContent] = content.split('## Props')

  // create a new directory
  fs.mkdirSync(path.join(basePath, name))

  // create usage mdx file
  fs.writeFileSync(
    path.join(basePath, name, `usage.mdx`),
    mainContent.replace('---', `---\nid: ${name}\ncategory: ${id}`),
  )

  // create a `props.mdx` file in the new directory
  fs.writeFileSync(
    path.join(basePath, name, `props.mdx`),
    template(name, 'props', `## Props\n\n${propsContent}`),
  )
  // create a `theming.mdx` file in the new directory
  fs.writeFileSync(
    path.join(basePath, name, `theming.mdx`),
    template(name, 'theming'),
  )

  // remove the original file
  fs.rmSync(path.join(basePath, `${name}.mdx`))
}
