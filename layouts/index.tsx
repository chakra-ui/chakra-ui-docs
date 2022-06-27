import dynamic from 'next/dynamic'
import * as React from 'react'

import PageContainer from 'components/page-container'

const BlogLayout = dynamic(() => import('./blog'))
export const MDXLayout = dynamic(() => import('./mdx'))
const TutorialLayout = dynamic(() => import('./tutorial'))
const ComponentLayout = dynamic(() => import('./component'))

export default function Layout(props: {
  children: React.ReactNode
  frontMatter: any
  hideToc?: boolean
  maxWidth?: string
}) {
  const { frontMatter, ...rest } = props
  const slug = frontMatter?.slug

  const layoutMap = {
    blog: <BlogLayout frontmatter={frontMatter} {...rest} />,
    'getting-started': <MDXLayout frontmatter={frontMatter} {...rest} />,
    'docs/components': <ComponentLayout frontmatter={frontMatter} {...rest} />,
    docs: <MDXLayout frontmatter={frontMatter} {...rest} />,
    changelog: <MDXLayout frontmatter={frontMatter} {...rest} />,
    community: <MDXLayout frontmatter={frontMatter} {...rest} />,
    tutorial: <TutorialLayout frontmatter={frontMatter} {...rest} />,
    default: <PageContainer frontmatter={frontMatter} {...rest} />,
  }

  if (slug === '/docs/components' || slug === '/blog') return layoutMap.docs

  const layout = Object.entries(layoutMap).find(([path]) => {
    return slug?.startsWith(`/${path}`)
  })

  if (!layout) return layoutMap.default

  return layout[1]
}
