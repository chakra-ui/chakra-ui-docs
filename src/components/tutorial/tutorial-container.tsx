import { Box, chakra, Stack, HStack, Flex } from '@chakra-ui/react'
import { SkipNavContent, SkipNavLink } from '@chakra-ui/skip-nav'
import {
  SandpackCodeEditor,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
} from '@codesandbox/sandpack-react'
import { useRouter } from 'next/router'
import * as React from 'react'
import PageTransition from '../page-transition'
import EditPageLink from 'components/edit-page-button'
import Header from 'components/header'
import SEO from 'components/seo'
import mainPackageJson from 'package.json'
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
  files: {
    [x: string]: string
  }
}

function TutorialContainer({
  frontmatter,
  children,
  pagination,
  sidebar,
  files,
}: PageContainerProps) {
  useHeadingFocusOnRouteChange()

  if (!frontmatter) return <></>

  const { title, description, editUrl } = frontmatter

  const dependenciesNames = [
    '@chakra-ui/react',
    'typescript',
    '@emotion/react',
    '@emotion/styled',
    'framer-motion',
  ]

  const dependencies = dependenciesNames.reduce((prev, cur) => {
    return { ...prev, [cur]: mainPackageJson.dependencies[cur] }
  }, {})

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
          <SandpackProvider
            customSetup={{
              files,
              dependencies,
            }}
            template='react-ts'
          >
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
                    {sidebar}
                    <chakra.h1 tabIndex={-1} outline={0} apply='mdx.h1'>
                      {title}
                    </chakra.h1>
                  </HStack>
                  <Flex px={'6'} direction='column' height='95%'>
                    <Box flex='1'>{children}</Box>
                    <Box mt='40px'>
                      <Box>{editUrl && <EditPageLink href={editUrl} />}</Box>
                      {pagination || null}
                    </Box>
                  </Flex>
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
