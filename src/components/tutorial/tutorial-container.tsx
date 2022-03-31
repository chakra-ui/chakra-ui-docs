import { Box, chakra, Stack, HStack } from '@chakra-ui/react'
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

  const files = {
    '/App.tsx': TutorialApp,
    '/package.json': packageJson,
  }

  return (
    <Box minH='100vh'>
      <SEO title={title} description={description} />
      <SkipNavLink zIndex={20}>
        {t('component.page-container.skip-to-content')}
      </SkipNavLink>
      <Header maxWidth={'full'} />
      <Box as='main' w='full'>
        {/* <TutorialSidebar /> */}
        <SkipNavContent />
        <Box id='content'>
          <SandpackProvider customSetup={{ files }} template='react-ts'>
            <PageTransition>
              <HStack spacing={0}>
                <Box
                  overflowY={'auto'}
                  minW={{ base: '40%', xl: '35%' }}
                  h='calc(100vh - 4.5rem)'
                  pr={'6'}
                  pl={{ base: '4', sm: '6', xl: '8' }}
                >
                  <Box h='5' color='white' bg='teal'>
                    Menu
                  </Box>
                  <chakra.h1 tabIndex={-1} outline={0} apply='mdx.h1'>
                    {title}
                  </chakra.h1>
                  {children}
                  <Box mt='40px'>
                    <Box>{editUrl && <EditPageLink href={editUrl} />}</Box>
                    {pagination || null}
                  </Box>
                </Box>
                <Box minW={{ base: '60%', xl: '65%' }}>
                  <SandpackLayout theme={'night-owl'}>
                    <Stack h='calc(100vh - 4.5rem)' w={'full'}>
                      {/* <Navigator /> */}
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
