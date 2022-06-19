import { Avatar, Box, chakra, Flex, HStack, Text } from '@chakra-ui/react'
import { SkipNavContent, SkipNavLink } from '@chakra-ui/skip-nav'
import * as React from 'react'
import { AdBanner } from 'components/chakra-pro/ad-banner'
import EditPageLink from 'components/edit-page-button'
import Footer from 'components/footer'
import Header from 'components/header'
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
                  <Box maxW='48rem'>
                    <chakra.h1
                      tabIndex={-1}
                      outline={0}
                      apply='mdx.h1'
                      style={{ fontSize: '2.5rem' }}
                    >
                      {title}
                    </chakra.h1>

                    <HStack mt='8' mb='4'>
                      <Avatar size='md' src={data.avatar_url} />
                      <Box>
                        <Text fontWeight='bold' fontSize='sm'>
                          {data.name}
                        </Text>
                        <Text fontSize='xs'>
                          <a href={data.url}>{data.login}</a>
                        </Text>
                      </Box>
                    </HStack>
                    <Box
                      as='time'
                      dateTime={publishedDate.iso}
                      color='gray.500'
                      fontSize='sm'
                      display='block'
                      mb='16'
                    >
                      {publishedDate.text}
                    </Box>

                    {children}
                    <Box mt='40px'>
                      <Box>{editUrl && <EditPageLink href={editUrl} />}</Box>
                    </Box>
                    <Box pb='20'>
                      <Footer />
                    </Box>
                  </Box>
                </Box>
              </Flex>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}
