import { Octokit } from '@octokit/rest'
import fs from 'fs'
import path from 'path'

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

export async function main() {
  const res = await octokit.repos.getContent({
    owner: 'chakra-ui',
    repo: 'chakra-ui',
    path: 'CHANGELOG.md',
  })

  let content = Buffer.from((res.data as any).content, 'base64').toString(
    'utf-8',
  )

  content = content.replace('<!-- CHANGELOG:INSERT -->', '')

  fs.writeFileSync(
    path.join(process.cwd(), 'pages', 'changelog', 'content.mdx'),
    content,
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
