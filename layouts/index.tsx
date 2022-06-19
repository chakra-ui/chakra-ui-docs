import dynamic from 'next/dynamic'
import * as React from 'react'

import PageContainer from 'components/page-container'

const BlogLayout = dynamic(() => import('./blog'))
export const MDXLayout = dynamic(() => import('./mdx'))
const TutorialLayout = dynamic(() => import('./tutorial'))
const ComponentLayout = dynamic(() => import('./component'))

export default function DefaultLayout({ children, frontMatter }) {
  const slug = frontMatter?.slug

  const layoutMap = {
    blog: <BlogLayout frontmatter={frontMatter}>{children}</BlogLayout>,
    guides: <MDXLayout frontmatter={frontMatter}>{children}</MDXLayout>,
    'docs/components': (
      <ComponentLayout frontmatter={frontMatter}>{children}</ComponentLayout>
    ),
    docs: <MDXLayout frontmatter={frontMatter}>{children}</MDXLayout>,
    changelog: <MDXLayout frontmatter={frontMatter}>{children}</MDXLayout>,
    faq: <MDXLayout frontmatter={frontMatter}>{children}</MDXLayout>,
    team: <MDXLayout frontmatter={frontMatter}>{children}</MDXLayout>,
    tutorial: (
      <TutorialLayout frontmatter={frontMatter}>{children}</TutorialLayout>
    ),
    default: (
      <PageContainer frontmatter={frontMatter}>{children}</PageContainer>
    ),
  }

  if (slug === '/docs/components') return layoutMap.docs

  const layout = Object.entries(layoutMap).find(([path]) => {
    return slug?.startsWith(`/${path}`)
  })

  if (!layout) return layoutMap.default

  return layout[1]
}
