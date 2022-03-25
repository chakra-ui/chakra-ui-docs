import dynamic from 'next/dynamic'
import * as React from 'react'
import PageContainer from 'components/page-container'

const BlogLayout = dynamic(() => import('layouts/blog'))
const MDXLayout = dynamic(() => import('layouts/mdx'))

export default function DefaultLayout({ children, frontMatter }) {
  const slug = frontMatter?.slug

  const layoutMap = {
    blog: <BlogLayout frontmatter={frontMatter}>{children}</BlogLayout>,
    guides: <MDXLayout frontmatter={frontMatter}>{children}</MDXLayout>,
    docs: <MDXLayout frontmatter={frontMatter}>{children}</MDXLayout>,
    changelog: <MDXLayout frontmatter={frontMatter}>{children}</MDXLayout>,
    faq: <MDXLayout frontmatter={frontMatter}>{children}</MDXLayout>,
    default: (
      <PageContainer frontmatter={frontMatter}>{children}</PageContainer>
    ),
  }

  const layout = Object.entries(layoutMap).find(([path]) => {
    return slug?.startsWith(`/${path}`)
  })

  if (!layout) return layoutMap.default

  return layout[1]
}
