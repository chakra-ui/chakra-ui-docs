import { useState, useCallback, useMemo } from 'react'
import { Grid, GridItem, Box, Flex, Heading, Text } from '@chakra-ui/layout'
import type { ResponsiveValue } from '@chakra-ui/react'
import { TabList, Tabs, Tab, TabPanels, TabPanel } from '@chakra-ui/tabs'
import { SkipNavContent, SkipNavLink } from '@chakra-ui/skip-nav'
import { useColorModeValue } from '@chakra-ui/color-mode'
import SEO from 'components/seo'
import Header from 'components/header'
import ChakraNextImage from 'components/chakra-next-image'
import DiscordStrip from 'components/discord-strip'
import { AdBanner } from 'components/chakra-pro/ad-banner'
import Footer from 'components/footer'
import Mask from 'components/mask'
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

  const showcaseItems = useMemo(
    () =>
      categoriesWithAll.map((c) => {
        const items: ShowcaseItem[] = c === 'all' ? allItems : showcaseData[c]
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
                      <Mask name={name} github={github} url={url} showMask />
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
  )

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
            isLazy
            index={index}
            onChange={handleTabsChange}
          >
            <TabList w='100%' maxW='calc(100% - 3rem)' flexWrap='wrap'>
              {categoriesWithAll.map((c) => (
                <Tab key={c}>{_.capitalize(c)}</Tab>
              ))}
            </TabList>
            <TabPanels mt='10'>{showcaseItems}</TabPanels>
          </Tabs>
        </Box>
        <DiscordStrip />
        <Footer />
      </Box>
    </>
  )
}

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
export default Showcase
