import { Avatar, Box, chakra, Flex, Stack } from '@chakra-ui/react'
import { SkipNavContent, SkipNavLink } from '@chakra-ui/skip-nav'
import * as React from 'react'
import { AdBanner } from 'components/chakra-pro/ad-banner'
import EditPageLink from 'components/edit-page-button'
import Footer from 'components/footer'
import Header from 'components/header'
import PageTransition from 'components/page-transition'
import SEO from 'components/seo'
import { t } from 'utils/i18n'

interface BlogLayoutProps {
  frontmatter: any
  children: React.ReactNode
}

export default function BlogLayout(props: BlogLayoutProps) {
  const { frontmatter, children } = props
  if (!frontmatter) return <></>
  const {
    title,
    description,
    editUrl,
    publishedDate,
    authorData: data = {},
  } = frontmatter

  return (
    <>
      <SEO title={title} description={description} />
      <SkipNavLink zIndex={20}>
        {t('component.page-container.skip-to-content')}
      </SkipNavLink>
      <AdBanner />
      <Header />
      <Box as='main' className='main-content' w='full' maxW='8xl' mx='auto'>
        <Box display={{ md: 'flex' }}>
          <Box flex='1' minW='0'>
            <SkipNavContent />
            <Box id='content' px={5} mx='auto' minH='76vh'>
              <Flex>
                <Box
                  minW='0'
                  flex='auto'
                  px={{ base: '4', sm: '6', xl: '8' }}
                  pt='10'
                >
                  <PageTransition style={{ maxWidth: '48rem' }}>
                    <chakra.h1 tabIndex={-1} outline={0} apply='mdx.h1'>
                      {title}
                    </chakra.h1>
                    <time dateTime={publishedDate.iso}>
                      {publishedDate.text}
                    </time>

                    <Stack>
                      <Avatar size='sm' src={data.avatar_url} />
                      <Box>
                        <p>{data.name}</p>
                        <a href={data.url}>{data.login}</a>
                      </Box>
                    </Stack>

                    {children}
                    <Box mt='40px'>
                      <Box>{editUrl && <EditPageLink href={editUrl} />}</Box>
                    </Box>
                    <Box pb='20'>
                      <Footer />
                    </Box>
                  </PageTransition>
                </Box>
              </Flex>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}
