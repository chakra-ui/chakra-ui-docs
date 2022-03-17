import { ReactNode } from 'react'
import Pagination from 'components/pagination'
import TutorialContainer from 'components/tutorial/tutorial-container'
import componentsSidebar from 'configs/components-sidebar.json'
import guidesSidebar from 'configs/guides-sidebar.json'
import styledSystemSidebar from 'configs/styled-system-sidebar.json'
import { findRouteByPath, removeFromLast } from 'utils/find-route-by-path'
import { getRouteContext } from 'utils/get-route-context'

export function getRoutes(slug: string) {
  // for home page, use docs sidebar
  if (slug === '/') return guidesSidebar.routes

  const configMap = {
    '/guides': guidesSidebar,
    '/docs/styled-system': styledSystemSidebar,
    '/docs/components': componentsSidebar,
  }

  const [, sidebar] =
    Object.entries(configMap).find(([path]) => slug.startsWith(path)) ?? []

  return sidebar?.routes ?? []
}

interface MDXTutorialLayoutProps {
  frontmatter: any
  children: ReactNode
}

export default function MDXTutorialLayout({ frontmatter, children }: MDXTutorialLayoutProps) {
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
