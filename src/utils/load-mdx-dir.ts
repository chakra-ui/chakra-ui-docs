import path from 'path';
import shell from 'shelljs';
import { loadMdx } from 'utils/load-mdx';

async function loadMdxDir(mdxDir: string) {
  const dir = path.join(process.cwd(), `pages/${mdxDir}`);
  const filenames = shell.ls('-R', `${dir}/**/*.mdx`) as string[];

  const pagesPromise = filenames.map(async (filename) => loadMdx(filename));

  const pages = await Promise.all(pagesPromise);

  return pages;
}

export async function loadMdxFile(filepath: string) {
  const dir = path.join(process.cwd(), `pages/${filepath}.mdx`);

  const page = await loadMdx(dir);

  return page;
}

export default loadMdxDir;
