import { Box, Flex, chakra, Stack, HStack } from '@chakra-ui/react'
import { SkipNavContent, SkipNavLink } from '@chakra-ui/skip-nav'
import {
  SandpackCodeEditor,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
  Navigator,
} from '@codesandbox/sandpack-react'
import { useRouter } from 'next/router'
import * as React from 'react'
import PageTransition from '../page-transition'
import { TutorialSidebar } from './tutorial-sidebar'
import EditPageLink from 'components/edit-page-button'
import Footer from 'components/footer'
import Header from 'components/header'
import SEO from 'components/seo'
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

  const files = {}

  return (
    <>
      <SEO title={title} description={description} />
      <SkipNavLink zIndex={20}>
        {t('component.page-container.skip-to-content')}
      </SkipNavLink>
      <Header />
      <Box as='main' className='main-content' w='full' maxW='8xl' mx='auto'>
        <Box display={{ md: 'flex' }}>
          <TutorialSidebar />
          <Box flex='1' minW='0'>
            <SkipNavContent />
            <Box id='content' px={5} mx='auto' minH='76vh'>
              <SandpackProvider customSetup={{ files }} template='react'>
                {/* <ScrollContainer h='100vh' w='53vw'> */}
                <Box
                  minW='0'
                  flex='auto'
                  px={{ base: '4', sm: '6', xl: '8' }}
                  pt='10'
                >
                  <PageTransition style={{ maxWidth: '48rem' }}>
                    <HStack>
                      <chakra.h1 tabIndex={-1} outline={0} apply='mdx.h1'>
                        {title}
                      </chakra.h1>
                      {children}
                      <Box mt='40px'>
                        <Box>{editUrl && <EditPageLink href={editUrl} />}</Box>
                        {pagination || null}
                      </Box>

                      {/* </ScrollContainer> */}
                      <Box>
                        <SandpackLayout theme={'night-owl'}>
                          <Stack spacing={0} h='100vh' w='100%'>
                            <Navigator />
                            <SandpackCodeEditor
                              showLineNumbers
                              customStyle={{
                                height: '50%',
                                fontFamily: 'poppins',
                              }}
                            />
                            <SandpackPreview
                              customStyle={{ height: 'calc(50% - 40px)' }}
                            />
                          </Stack>
                        </SandpackLayout>
                      </Box>
                    </HStack>
                    <Box pb='20'>
                      <Footer />
                    </Box>
                  </PageTransition>
                </Box>
              </SandpackProvider>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default TutorialContainer
