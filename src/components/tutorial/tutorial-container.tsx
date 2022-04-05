import {
  AddIcon,
  ExternalLinkIcon,
  RepeatIcon,
  EditIcon,
} from '@chakra-ui/icons'
import {
  Box,
  chakra,
  Stack,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import { SkipNavContent, SkipNavLink } from '@chakra-ui/skip-nav'
import {
  SandpackCodeEditor,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
} from '@codesandbox/sandpack-react'
import { useRouter } from 'next/router'
import * as React from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import PageTransition from '../page-transition'
import EditPageLink from 'components/edit-page-button'
import Header from 'components/header'
import SEO from 'components/seo'
import { packageJson, TutorialApp } from 'configs/sandpack-contents/tutorial'
import { t } from 'utils/i18n'

function useHeadingFocusOnRouteChange() {
  const router = useRouter()

  React.useEffect(() => {
    const onRouteChange = () => {
      const [heading] = Array.from(document.getElementsByTagName('h1'))
      heading?.focus()
    }
    router.events.on('routeChangeComplete', onRouteChange)
    return () => {
      router.events.off('routeChangeComplete', onRouteChange)
    }
  }, [router.events])
}

export interface Heading {
  level: 'h2' | 'h3'
  text: string
  id: string
}

interface PageContainerProps {
  frontmatter: {
    slug?: string
    title: string
    description?: string
    editUrl?: string
    version?: string
    headings?: Heading[]
  }
  children: React.ReactNode
  sidebar?: React.ReactElement
  pagination?: React.ReactElement
}

function TutorialContainer({
  frontmatter,
  children,
  pagination,
}: PageContainerProps) {
  useHeadingFocusOnRouteChange()

  if (!frontmatter) return <></>

  const { title, description, editUrl, headings = [] } = frontmatter

  // TODO move this to a config file depending on the current tutorial page
  const files = {
    '/App.tsx': TutorialApp,
    '/package.json': packageJson,
  }

  console.log(editUrl)

  return (
    <Box minH='100vh'>
      <SEO title={title} description={description} />
      <SkipNavLink zIndex={20}>
        {t('component.page-container.skip-to-content')}
      </SkipNavLink>
      <Header maxWidth={'full'} />
      <Box as='main' w='full'>
        <SkipNavContent />
        <Box id='content'>
          <SandpackProvider customSetup={{ files }} template='react-ts'>
            <PageTransition>
              <HStack spacing={0}>
                <Box
                  overflowY={'auto'}
                  minW={{ base: '40%', xl: '35%' }}
                  h='calc(100vh - 4.5rem)'
                >
                  <HStack
                    bg='white'
                    _dark={{ bg: 'gray.800' }}
                    position='sticky'
                    top='0'
                    zIndex={'dropdown'}
                    pb='4'
                    pt='1'
                    pl='6'
                    spacing={4}
                  >
                    {/* TODO Add MenuGroup for active page and links to other
                    pages */}
                    <Menu>
                      <MenuButton
                        as={IconButton}
                        icon={<AiOutlineMenu />}
                        aria-label='Tutorial menu'
                        variant='outline'
                      />
                      <MenuList>
                        {headings.map((heading) => (
                          <MenuItem
                            as='a'
                            key={heading.id}
                            href={`#${heading.id}`}
                          >
                            {heading.text}
                          </MenuItem>
                        ))}
                      </MenuList>
                    </Menu>
                    <chakra.h1 tabIndex={-1} outline={0} apply='mdx.h1'>
                      {title}
                    </chakra.h1>
                  </HStack>
                  <Box px={'6'}>
                    {children}
                    <Box mt='40px'>
                      <Box>{editUrl && <EditPageLink href={editUrl} />}</Box>
                      {pagination || null}
                    </Box>
                  </Box>
                </Box>
                <Box minW={{ base: '60%', xl: '65%' }}>
                  <SandpackLayout
                    theme={'night-owl'}
                    style={{
                      borderRadius: 0,
                      borderTop: 'none',
                      borderBottom: 'none',
                    }}
                  >
                    <Stack h='calc(100vh - 4.5rem)' w={'full'}>
                      <SandpackCodeEditor
                        showLineNumbers
                        customStyle={{
                          height: '50%',
                        }}
                      />

                      <SandpackPreview customStyle={{ minHeight: '50%' }} />
                    </Stack>
                  </SandpackLayout>
                </Box>
              </HStack>
            </PageTransition>
          </SandpackProvider>
        </Box>
      </Box>
    </Box>
  )
}

export default TutorialContainer
