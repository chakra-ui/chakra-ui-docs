import { MDXComponents } from 'components/mdx-components'
import Layout from 'layouts'
import { bundleMDX } from 'mdx-bundler'
import { getMDXComponent } from 'mdx-bundler/client'
import { GetStaticProps } from 'next'
import React from 'react'
import remarkEmoji from 'remark-emoji'
import remarkGfm from 'remark-gfm'
import remarkSlug from 'remark-slug'
import { getChangelog } from 'utils/get-changelog'
import { rehypeMdxCodeMeta } from 'utils/rehype-code-meta'

export default function Page({ frontMatter, code }) {
  const Component = React.useMemo(() => getMDXComponent(code), [code])
  return (
    <Layout frontMatter={frontMatter}>
      <Component components={MDXComponents as any} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const mdxString = await getChangelog()
  const mdx = await bundleMDX(mdxString, {
    cwd: process.cwd(),
    xdmOptions(options) {
      options.rehypePlugins ||= []
      options.rehypePlugins?.push(rehypeMdxCodeMeta)
      options.remarkPlugins ||= []
      options.remarkPlugins?.push(remarkSlug, remarkGfm, remarkEmoji)
      return options
    },
  })
  mdx.frontmatter.slug = '/changelog'

  return {
    props: { frontMatter: mdx.frontmatter, code: mdx.code },
    revalidate: 10,
  }
}
