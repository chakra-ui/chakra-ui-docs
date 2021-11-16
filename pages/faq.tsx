import React from 'react';
import { MDXRemote } from 'next-mdx-remote';
import { MDXComponents } from 'components/mdx-components';
import { InferGetStaticPropsType } from 'next';
import Layout from 'layouts';
import { loadMdx } from 'utils/load-mdx';
import path from 'path';

function Faq({
  mdxSource,
  frontMatter,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout frontMatter={frontMatter}>
      <MDXRemote {...mdxSource} components={MDXComponents} />
    </Layout>
  );
}

export async function getStaticProps() {
  const faqPath = path.join(process.cwd(), `pages/faq.mdx`);
  const page = await loadMdx(faqPath);

  const { mdxSource: processedMdxSource, ...processedFrontmatter } = page;

  return {
    props: {
      mdxSource: processedMdxSource,
      frontMatter: processedFrontmatter,
    },
  };
}

export default Faq;
