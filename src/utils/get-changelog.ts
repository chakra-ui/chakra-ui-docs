import { Octokit } from '@octokit/rest';

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export async function getChangelog() {
  const res = await octokit.repos.getContent({
    owner: 'chakra-ui',
    repo: 'chakra-ui',
    path: 'CHANGELOG.md',
  });

  const content = Buffer.from((res.data as any).content, 'base64').toString(
    'utf-8',
  );

  return content.replace('<!-- CHANGELOG:INSERT -->', '');
}
