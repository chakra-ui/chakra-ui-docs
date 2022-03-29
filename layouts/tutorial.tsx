import { ReactNode } from 'react'
import { getRoutes } from './mdx'
import Pagination from 'components/pagination'
import TutorialContainer from 'components/tutorial/tutorial-container'
import { findRouteByPath, removeFromLast } from 'utils/find-route-by-path'
import { getRouteContext } from 'utils/get-route-context'

interface MDXTutorialLayoutProps {
  frontmatter: any
  children: ReactNode
}

export default function MDXTutorialLayout({
  frontmatter,
  children,
}: MDXTutorialLayoutProps) {
  const routes = getRoutes(frontmatter.slug)

  const route = findRouteByPath(removeFromLast(frontmatter.slug, '#'), routes)
  const routeContext = getRouteContext(route, routes)

  return (
    <TutorialContainer
      frontmatter={frontmatter}
      pagination={
        <Pagination
          next={routeContext.nextRoute}
          previous={routeContext.prevRoute}
        />
      }
    >
      {children}
    </TutorialContainer>
  )
}
