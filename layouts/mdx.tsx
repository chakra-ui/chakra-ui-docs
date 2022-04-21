import { ReactNode } from 'react'
import PageContainer from 'components/page-container'
import Pagination from 'components/pagination'
import Sidebar from 'components/sidebar/sidebar'
import componentsSidebar from 'configs/components-sidebar'
import guidesSidebar from 'configs/guides-sidebar.json'
import styledSystemSidebar from 'configs/styled-system-sidebar.json'
import { tutorialSidebar } from 'configs/tutorial-sidebar'
import { findRouteByPath, removeFromLast } from 'utils/find-route-by-path'
import { getRouteContext } from 'utils/get-route-context'
import { Frontmatter } from 'components/tutorial/tutorial-container'

export function getRoutes(slug: string) {
  // for home page, use docs sidebar
  if (slug === '/') return guidesSidebar.routes

  const configMap = {
    '/guides': guidesSidebar,
    '/docs/styled-system': styledSystemSidebar,
    '/docs/components': componentsSidebar,
    '/tutorial': tutorialSidebar,
  }

  const [, sidebar] =
    Object.entries(configMap).find(([path]) => slug.startsWith(path)) ?? []

  return sidebar?.routes ?? []
}

interface MDXLayoutProps {
  frontmatter: Frontmatter
  children: ReactNode
}

export default function MDXLayout(props: MDXLayoutProps) {
  const { frontmatter, children } = props

  const routes = getRoutes(frontmatter.slug)
  const route = findRouteByPath(removeFromLast(frontmatter.slug, '#'), routes)
  const routeContext = getRouteContext(route, routes)

  return (
    <PageContainer
      frontmatter={frontmatter}
      sidebar={<Sidebar routes={routes} />}
      pagination={
        <Pagination
          next={routeContext.nextRoute}
          previous={routeContext.prevRoute}
        />
      }
    >
      {children}
    </PageContainer>
  )
}
