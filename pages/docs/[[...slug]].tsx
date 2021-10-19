import { InferGetStaticPropsType } from 'next';
import { MDXRemote } from 'next-mdx-remote';
import shell from 'shelljs';
import { loadMdxFile } from 'utils/load-mdx-dir';
import { MDXComponents } from 'components/mdx-components';
import Layout from 'layouts';
import path from 'path';

const CONTENT_PATH = 'docs';

export default function Page({
  mdxSource,
  frontMatter,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout frontMatter={frontMatter}>
      <MDXRemote {...mdxSource} components={MDXComponents} />
    </Layout>
  );
}

export async function getStaticPaths() {
  const cwd = process.cwd();
  const dir = path.join(cwd, `pages/${CONTENT_PATH}`);
  const pages = shell.ls('-R', `${dir}/**/*.mdx`) as string[];

  const paths = pages.map((slug) => {
    return {
      params: {
        slug: slug
          .replace(cwd, '')
          .replace('.mdx', '')
          .slice(1) // remove the first `/`
          .split('/') // split to get an array
          .filter((item) => item !== 'pages' && item !== 'docs'), // remove the CONTENT_PATH since this isnt needed in static paths
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const slug = ['/docs', ...params.slug].join('/');

  const page = await loadMdxFile(slug);

  if (!page) {
    throw new Error(`No content found for slug "${slug}"`);
  }

  const { mdxSource, ...frontMatter } = page;

  return {
    props: {
      mdxSource,
      frontMatter,
    },
  };
}
