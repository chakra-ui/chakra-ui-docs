import { InferGetStaticPropsType } from 'next';
import { MDXRemote } from 'next-mdx-remote';
import shell from 'shelljs';
import fs from 'fs';
import locales from '../../i18n/locales';
import { MDXComponents } from 'components/mdx-components';
import Layout from 'layouts';
import path from 'path';
import { loadMdx } from 'utils/load-mdx';

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

  const paths = pages.flatMap((pageSlug) => {
    const slug = pageSlug
      .replace(cwd, '')
      .replace('.mdx', '')
      .slice(1) // remove the first `/`
      .split('/') // split to get an array
      .filter((item) => item !== 'pages' && item !== CONTENT_PATH); // remove the CONTENT_PATH since this isnt needed in static paths

    return locales.locales.map((locale) => ({
      params: {
        slug: slug,
      },
      locale,
    }));
  });

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params, locale }) {
  console.log(
    '=============== GETTING STATIC PROPS FOR ',
    params.slug.join('/')
  );
  const slug = ['', CONTENT_PATH, ...params.slug].join('/');

  const isDefaultLocale = locale === locales.defaultLocale;

  let filePath = slug;
  if (!isDefaultLocale) {
    filePath = path.resolve(
      process.cwd(),
      `i18n/__generated__/${slug}.${locale}.mdx`
    );
  }

  if (!fs.existsSync(filePath)) {
    filePath = path.join(process.cwd(), `pages/${slug}.mdx`);
  }

  console.log('LOADING MDX FOR ', params.slug.join('/'));
  const page = await loadMdx(filePath);

  if (!page) {
    throw new Error(`No content found for slug "${filePath}"`);
  }

  const { mdxSource, ...frontMatter } = page;

  console.log('=============== STATIC PROPS DONE FOR ', params.slug.join('/'));
  return {
    props: {
      mdxSource,
      frontMatter,
    },
  };
}
