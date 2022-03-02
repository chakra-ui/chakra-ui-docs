import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import { MDXComponents } from 'components/mdx-components'
import { allChangelogs } from '.contentlayer/data'
import Layout from 'layouts'

export default function TestPage({ source, frontMatter }) {
  return (
    <Layout frontMatter={frontMatter}>
      <MDXRemote {...source} components={MDXComponents as any} lazy />
    </Layout>
  )
}

export async function getStaticProps() {
  // MDX text - can be from a local file, database, anywhere
  const source = 'Some **mdx** text, with a component no'
  const mdxSource = await serialize(allChangelogs[0].body.raw)

  return { props: { source: mdxSource, frontMatter: allChangelogs[0].frontMatter } }
}