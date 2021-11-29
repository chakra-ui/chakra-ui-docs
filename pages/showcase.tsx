import { useState, useCallback, useMemo } from 'react'
import {
  Grid,
  GridItem,
  Box,
  Flex,
  Heading,
  Text,
  Link,
  HStack,
} from '@chakra-ui/layout'
import type { ResponsiveValue } from '@chakra-ui/react'
import { TabList, Tabs, Tab, TabPanels, TabPanel } from '@chakra-ui/tabs'
import { SkipNavContent, SkipNavLink } from '@chakra-ui/skip-nav'
import { useColorModeValue } from '@chakra-ui/color-mode'
import { LinkIcon, Icon } from '@chakra-ui/icons'
import SEO from 'components/seo'
import Header from 'components/header'
import ChakraNextImage from 'components/chakra-next-image'
import DiscordStrip from 'components/discord-strip'
import { AdBanner } from 'components/chakra-pro/ad-banner'
import Footer from 'components/footer'
import { t } from 'utils/i18n'
import _ from 'lodash'
import showcaseData from '../configs/showcase.json'
import type { IShowcase, ShowcaseItem } from '../scripts/get-showcase-data'

const categories = Object.keys(showcaseData as IShowcase)
const categoriesWithAll = ['all', ...categories]

const allItems: ShowcaseItem[] = categories.reduce((acc, cur) => {
  return [...acc, ...showcaseData[cur]]
}, [])

const Showcase = () => {
  const [index, setIndex] = useState<number>(0)

  const handleTabsChange = useCallback((index: number) => {
    if (index < 0 || index >= categories.length) setIndex(0)
    setIndex(index)
  }, [])

  return (
    <>
      <SEO
        title={t('showcase.seo.title')}
        description={t('showcase.seo.description')}
      />
      <SkipNavLink zIndex={20}>Skip to Content</SkipNavLink>
      <AdBanner />
      <Header />
      <Box mt={20} mb={10}>
        <SkipNavContent />
        <Flex mx='auto' flexDir='column' alignItems='center'>
          <Heading fontSize={{ base: '2xl', lg: '4xl' }} lineHeight='1.2'>
            {t('showcase.title')}
          </Heading>
          <Text
            maxW='560px'
            mx='auto'
            color={useColorModeValue('gray.500', 'gray.400')}
            fontSize={{ base: 'lg', lg: 'xl' }}
            mt='3'
          >
            {t('showcase.message')}
          </Text>
        </Flex>
        <Box mt='10' mb='20' mx='auto' maxWidth={1440}>
          <Tabs
            size='md'
            variant='soft-rounded'
            colorScheme='green'
            align={'center'}
            isLazy={true}
            index={index}
            onChange={handleTabsChange}
          >
            <TabList w='100%' maxW='calc(100% - 3rem)' flexWrap='wrap'>
              {categoriesWithAll.map((c) => (
                <Tab key={c}>{_.capitalize(c)}</Tab>
              ))}
            </TabList>
            <TabPanels mt='10'>
              {useMemo(
                () =>
                  categoriesWithAll.map((c) => {
                    const items: ShowcaseItem[] =
                      c === 'all' ? allItems : showcaseData[c]
                    return (
                      <TabPanel key={c}>
                        <Grid
                          marginX='auto'
                          paddingX='1rem'
                          templateColumns={[
                            'repeat(1, 1fr)',
                            'repeat(1, 1fr)',
                            'repeat(2, 1fr)',
                            'repeat(12, 1fr)',
                          ]}
                          templateRows={[
                            'repeat(1, 1fr)',
                            'repeat(1, 1fr)',
                            'repeat(2, 1fr)',
                          ]}
                          rowGap={12}
                          columnGap={8}
                        >
                          {items.map(({ name, image, url, github }, i) => {
                            const colSpan = [1, 2, 1, i % 3 === 0 ? 6 : 3]
                            const rowSpan = [1, 2, 2, i % 3 === 0 ? 2 : 1]

                            if (image === null)
                              return (
                                <ShowcaseContainerGridItem
                                  key={name}
                                  colSpan={colSpan}
                                  rowSpan={rowSpan}
                                >
                                  <Mask
                                    name={name}
                                    github={github}
                                    url={url}
                                    showMask={true}
                                  />
                                  <ChakraNextImage
                                    height={478}
                                    width={850}
                                    rounded='md'
                                    layout='responsive'
                                    src={`/og-image.png`}
                                  />
                                </ShowcaseContainerGridItem>
                              )
                            return (
                              <ShowcaseContainerGridItem
                                key={name}
                                colSpan={colSpan}
                                rowSpan={rowSpan}
                              >
                                <Mask name={name} github={github} url={url} />
                                <ChakraNextImage
                                  height={478}
                                  width={850}
                                  rounded='md'
                                  layout='responsive'
                                  src={`/${image}`}
                                />
                              </ShowcaseContainerGridItem>
                            )
                          })}
                        </Grid>
                      </TabPanel>
                    )
                  }),
                [],
              )}
            </TabPanels>
          </Tabs>
        </Box>
        <DiscordStrip />
        <Footer />
      </Box>
    </>
  )
}

const GithubIcon = (props: React.ComponentProps<'svg'>) => (
  <svg viewBox='0 0 20 20' {...props}>
    <path
      fill='currentColor'
      d='M10 0a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69a3.6 3.6 0 0 1 .1-2.64s.84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.37.2 2.4.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85l-.01 2.75c0 .26.18.58.69.48A10 10 0 0 0 10 0'
    />
  </svg>
)

interface ShowcaseContainerGridItem {
  colSpan: ResponsiveValue<number | 'auto'>
  rowSpan: ResponsiveValue<number | 'auto'>
}

const ShowcaseContainerGridItem: React.FC<ShowcaseContainerGridItem> = ({
  children,
  colSpan,
  rowSpan,
}) => {
  return (
    <GridItem
      colSpan={colSpan}
      rowSpan={rowSpan}
      justifySelf='center'
      alignSelf='center'
      rounded='lg'
      position='relative'
      role='group'
      boxShadow='md'
    >
      {children}
    </GridItem>
  )
}

interface MaskProps {
  name: string
  url?: string
  github?: string
  showMask?: boolean
}

const Mask: React.FC<MaskProps> = ({ name, url, github, showMask }) => (
  <Flex
    w='full'
    h='full'
    position='absolute'
    rounded='md'
    bg='blackAlpha.400'
    opacity={showMask ? 1 : 0}
    justifyContent='center'
    alignItems='flex-end'
    zIndex={showMask ? 2 : -1}
    _groupHover={{
      zIndex: 2,
      opacity: 1,
    }}
    transition='.5s opacity ease-out'
  >
    <Box
      w='full'
      borderBottomRadius='md'
      bgColor='blackAlpha.700'
      opacity='1'
      py='2.5'
    >
      <Box as='span' color='white' mx='auto'>
        <Text
          px='10px'
          fontSize={{ lg: 'lg', base: 'md' }}
          fontWeight='700'
          letterSpacing='1.2px'
        >
          {name}
        </Text>
        <HStack mt='1' alignItems='center' justifyContent='center' spacing='3'>
          {url && (
            <Link
              isExternal
              aria-label={`Go to ${name} website`}
              href={url}
              w={!github ? 'full' : 'auto'}
              px={4}
            >
              {!github && <Text isTruncated>{url}</Text>}
              {github && (
                <Icon
                  as={LinkIcon}
                  display='block'
                  transition='color 0.2s'
                  w='5'
                  h='5'
                  _hover={{ color: 'gray.600' }}
                />
              )}
            </Link>
          )}
          {github && (
            <Link
              isExternal
              aria-label={`Go to ${name} GitHub page`}
              href={github}
              w={!url ? 'full' : 'auto'}
              px={4}
            >
              {!url && <Text isTruncated>{github}</Text>}
              {url && (
                <Icon
                  as={GithubIcon}
                  display='block'
                  transition='color 0.2s'
                  w='5'
                  h='5'
                  _hover={{ color: 'gray.600' }}
                />
              )}
            </Link>
          )}
        </HStack>
      </Box>
    </Box>
  </Flex>
)

export default Showcase
