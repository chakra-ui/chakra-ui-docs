import {
  Badge,
  Box,
  Center,
  chakra,
  HStack,
  List,
  ListItem,
  ListProps,
} from '@chakra-ui/react'
import sortBy from 'lodash/sortBy'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { Fragment, ReactElement, ReactNode, useRef } from 'react'
import {
  FaFileAlt,
  FaPalette,
  FaTools,
  FaGlobe,
  FaCompass,
} from 'react-icons/fa'
import { BsFillGridFill } from 'react-icons/bs'
import { convertBackticksToInlineCode } from 'utils/convert-backticks-to-inline-code'
import { Routes } from 'utils/get-route-context'
import SidebarCategory from './sidebar-category'
import SidebarLink from './sidebar-link'

export type SidebarContentProps = Routes & {
  pathname?: string
  contentRef?: any
}

export function SidebarContent({
  routes,
  pathname,
  contentRef,
}: SidebarContentProps) {
  return (
    <>
      {routes.map((lvl1, idx) => {
        return (
          <Fragment key={idx}>
            {lvl1.heading && (
              <chakra.h4
                fontSize='sm'
                fontWeight='bold'
                my='4'
                textTransform='uppercase'
                letterSpacing='wider'
              >
                {lvl1.title}
              </chakra.h4>
            )}

            {lvl1.routes.map((lvl2, index) => {
              if (!lvl2.routes) {
                return (
                  <SidebarLink ml='-3' mt='2' key={lvl2.path} href={lvl2.path}>
                    {lvl2.title}
                  </SidebarLink>
                )
              }

              const selected = pathname.startsWith(lvl2.path)
              const opened = selected || lvl2.open

              const sortedRoutes = lvl2.sort
                ? sortBy(lvl2.routes, (i) => i.title)
                : lvl2.routes

              return (
                <SidebarCategory
                  contentRef={contentRef}
                  key={lvl2.path + index}
                  title={lvl2.title}
                  selected={selected}
                  opened={opened}
                >
                  {sortedRoutes.map((lvl3) => (
                    <SidebarLink key={lvl3.path} href={lvl3.path}>
                      <span>{convertBackticksToInlineCode(lvl3.title)}</span>
                      {lvl3.new && (
                        <Badge
                          ml='2'
                          lineHeight='tall'
                          fontSize='10px'
                          variant='solid'
                          colorScheme='purple'
                        >
                          New
                        </Badge>
                      )}
                    </SidebarLink>
                  ))}
                </SidebarCategory>
              )
            })}
          </Fragment>
        )
      })}
    </>
  )
}

type MainNavLinkProps = {
  href: string
  icon: ReactElement
  children: ReactNode
  label?: string
  isActive?: boolean
}

const MainNavLink = ({ href, icon, children, isActive }: MainNavLinkProps) => {
  const router = useRouter()

  const active = router.asPath.startsWith(href) || !!isActive

  return (
    <NextLink href={href} passHref>
      <HStack
        as='a'
        spacing='3'
        fontSize='sm'
        fontWeight={active ? 'semibold' : 'medium'}
        color={active ? 'accent' : 'fg-muted'}
        _hover={{ color: active ? undefined : 'fg' }}
      >
        <Center w='6' h='6' bg='accent-static' rounded='base' color='white'>
          {icon}
        </Center>
        <span>{children}</span>
      </HStack>
    </NextLink>
  )
}

export const mainNavLinks = [
  {
    icon: <FaCompass />,
    href: '/guides/first-steps',
    label: 'Getting Started',
  },
  {
    icon: <FaPalette />,
    href: '/docs/styled-system/style-props',
    label: 'Styled System',
    match: (asPath: string, href: string) =>
      href.startsWith('/docs/styled-system') &&
      asPath.startsWith('/docs/styled-system'),
  },
  {
    icon: <BsFillGridFill />,
    href: '/docs/components',
    label: 'Components',
  },
  {
    icon: <FaTools />,
    href: '/docs/hooks/use-boolean',
    label: 'Hooks',
    match: (asPath: string, href: string) =>
      href.startsWith('/docs/hooks') && asPath.startsWith('/docs/hooks'),
  },
  {
    icon: <FaGlobe />,
    href: '/community/team',
    label: 'Community',
    match: (asPath: string, href: string) =>
      href.startsWith('/community') && asPath.startsWith('/community'),
  },
  {
    icon: <FaFileAlt />,
    href: '/changelog',
    label: 'Changelog',
  },
]

export const MainNavLinkGroup = (props: ListProps) => {
  const router = useRouter()
  return (
    <List spacing='4' styleType='none' {...props}>
      {mainNavLinks.map((item) => (
        <ListItem key={item.label}>
          <MainNavLink
            icon={item.icon}
            href={item.href}
            label={item.label}
            isActive={item.match?.(router.asPath, item.href)}
          >
            {item.label}
          </MainNavLink>
        </ListItem>
      ))}
    </List>
  )
}

const Sidebar = ({ routes }) => {
  const { pathname } = useRouter()
  const ref = useRef<HTMLDivElement>(null)

  return (
    <Box
      ref={ref}
      aria-label='Main Navigation'
      as='nav'
      pos='sticky'
      overscrollBehavior='contain'
      top='6.5rem'
      w='280px'
      h='calc(100vh - 8.125rem)'
      pr='8'
      pb='6'
      pl='6'
      pt='4'
      overflowY='auto'
      className='sidebar-content'
      flexShrink={0}
      display={{ base: 'none', md: 'block' }}
    >
      <MainNavLinkGroup mb='10' />
      <SidebarContent routes={routes} pathname={pathname} contentRef={ref} />
    </Box>
  )
}

export default Sidebar
