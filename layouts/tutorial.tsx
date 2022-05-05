import {
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { getRoutes } from './mdx'
import Pagination from 'components/pagination'
import TutorialContainer, {
  Frontmatter,
} from 'components/tutorial/tutorial-container'
import { findRouteByPath, removeFromLast } from 'utils/find-route-by-path'
import { getRouteContext, RouteItem } from 'utils/get-route-context'
import * as HelloWorldTutorial from 'configs/sandpack-contents/tutorial/hello-world'
import * as BasicsTutorial from 'configs/sandpack-contents/tutorial/basics'
import { Heading } from 'components/page-container'

interface MDXTutorialLayoutProps {
  frontmatter: Frontmatter
  children: ReactNode
}

const TutorialMenu = ({
  headings,
  routes,
}: {
  headings: Heading[]
  routes: RouteItem[]
}) => {
  const { asPath } = useRouter()

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        icon={<AiOutlineMenu />}
        aria-label='Tutorial menu'
        variant='outline'
      />
      <MenuList>
        {routes.map((route) => {
          if (route.path === asPath) {
            return (
              <>
                <MenuDivider key={'1'} />
                <MenuGroup
                  key={route.path}
                  title={route.title}
                  color='teal.500'
                >
                  {headings.map((heading) => (
                    <MenuItem
                      as='a'
                      key={heading.id}
                      href={`#${heading.id}`}
                      fontSize='sm'
                    >
                      {heading.text}
                    </MenuItem>
                  ))}
                </MenuGroup>
                <MenuDivider key={'2'} />
              </>
            )
          }
          return (
            <Link key={route.path} href={route.path} passHref>
              <MenuItem fontSize='sm' fontWeight='semibold' color='teal.500'>
                {route.title}
              </MenuItem>
            </Link>
          )
        })}
      </MenuList>
    </Menu>
  )
}

const getFiles = (slug: string) => {
  switch (true) {
    case slug.includes('/hello-world'):
      return {
        '/App.tsx': HelloWorldTutorial.TutorialApp1,
        '/package.json': HelloWorldTutorial.packageJson,
      }
    case slug.includes('basics'):
      return {
        '/App.tsx': HelloWorldTutorial.TutorialApp2,
      }
    default:
      return {
        '/App.tsx': HelloWorldTutorial.TutorialApp1,
        '/package.json': HelloWorldTutorial.packageJson,
      }
  }
}

export default function MDXTutorialLayout({
  frontmatter,
  children,
}: MDXTutorialLayoutProps) {
  const routes = getRoutes(frontmatter.slug)
  const route = findRouteByPath(removeFromLast(frontmatter.slug, '#'), routes)
  const routeContext = getRouteContext(route, routes)

  const files = getFiles(frontmatter.slug)

  return (
    <TutorialContainer
      frontmatter={frontmatter}
      pagination={
        <Pagination
          next={routeContext.nextRoute}
          previous={routeContext.prevRoute}
        />
      }
      sidebar={
        <TutorialMenu
          headings={frontmatter.headings}
          routes={routes[0].routes}
        />
      }
      files={files}
    >
      {children}
    </TutorialContainer>
  )
}
