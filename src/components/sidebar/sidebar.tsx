import {
  Badge,
  Box,
  Center,
  Flex,
  List,
  ListItem,
  ListProps,
  Stack,
  chakra,
  useColorModeValue,
} from '@chakra-ui/react'
import sortBy from 'lodash/sortBy'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import * as React from 'react'
import { Fragment, useRef, ReactElement, ReactNode } from 'react'
import { FaFileAlt, FaQuestionCircle, FaTools } from 'react-icons/fa'
import SidebarCategory from './sidebar-category'
import { DocsIcon, GuidesIcon, TeamIcon, ResourcesIcon } from './sidebar-icons'
import SidebarLink from './sidebar-link'
import { convertBackticksToInlineCode } from 'utils/convert-backticks-to-inline-code'
import { Routes } from 'utils/get-route-context'

export type SidebarContentProps = Routes & {
  pathname?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contentRef?: any
}

type MainNavLinkProps = {
  href: string
  icon: ReactElement
  children: ReactNode
  label?: string
}

export function SidebarContent({
  routes,
  pathname,
  contentRef,
}: SidebarContentProps) {
  const color = useColorModeValue('gray.700', 'inherit')
  return (
    <>
      {routes.map((lvl1, idx) => {
        return (
          <Fragment key={idx}>
            {lvl1.heading && (
              <chakra.h4
                fontSize='sm'
                fontWeight='bold'
                my='1.25rem'
                textTransform='uppercase'
                letterSpacing='wider'
                color={color}
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
                  <Stack as='ul'>
                    {sortedRoutes.map((lvl3) => (
                      <SidebarLink as='li' key={lvl3.path} href={lvl3.path}>
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
                  </Stack>
                </SidebarCategory>
              )
            })}
          </Fragment>
        )
      })}
    </>
  )
}

export const isMainNavLinkActive = (href: string, path: string) => {
  const [, group, category] = href.split('/')

  return path.includes(
    href.split('/').length > 3 ? `${group}/${category}` : group,
  )
}

const MainNavLink = ({ href, icon, children }: MainNavLinkProps) => {
  const { asPath } = useRouter()
  const active = isMainNavLinkActive(href, asPath)
  const linkColor = useColorModeValue('gray.900', 'whiteAlpha.900')

  return (
    <NextLink href={href} passHref>
      <Flex
        as='a'
        align='center'
        fontSize='sm'
        fontWeight='semibold'
        transitionProperty='colors'
        transitionDuration='200ms'
        color={active ? linkColor : 'gray.500'}
        _hover={{ color: linkColor }}
      >
        <Center w='6' h='6' bg='teal.400' rounded='base' mr='3'>
          {icon}
        </Center>
        {children}
      </Flex>
    </NextLink>
  )
}

export const mainNavLinks = [
  {
    icon: <GuidesIcon />,
    href: '/guides/first-steps',
    label: 'Getting Started',
  },
  {
    icon: <FaTools color='white' />,
    href: '/docs/styled-system/overview',
    label: 'Styled System',
  },
  {
    icon: <DocsIcon />,
    href: '/docs/components/overview',
    label: 'Components',
  },
  {
    icon: <ResourcesIcon />,
    href: '/resources',
    label: 'Resources',
  },
  {
    icon: <FaQuestionCircle color='white' />,
    href: '/faq',
    label: 'FAQ',
  },
  {
    icon: <FaFileAlt color='white' />,
    href: '/changelog',
    label: 'Changelog',
  },
  {
    icon: <TeamIcon />,
    href: '/team',
    label: 'Team',
  },
]

const MainNavLinkGroup = (props: ListProps) => {
  return (
    <List spacing='4' styleType='none' {...props}>
      {mainNavLinks.map((item) => (
        <ListItem key={item.label}>
          <MainNavLink icon={item.icon} href={item.href} label={item.label}>
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
      as='nav'
      aria-label='Main Navigation'
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
