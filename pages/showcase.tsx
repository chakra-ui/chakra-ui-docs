import { Button } from '@chakra-ui/button'
import { useColorModeValue } from '@chakra-ui/color-mode'
import { Box, Grid, Heading, Link, Text, VStack } from '@chakra-ui/layout'
import { SkipNavContent, SkipNavLink } from '@chakra-ui/skip-nav'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs'
import _ from 'lodash'
import { useCallback, useMemo, useState } from 'react'
import showcaseData from '../configs/showcase.json'
import type { IShowcase, ShowcaseItem } from '../scripts/get-showcase-data'
import ChakraNextImage from 'components/chakra-next-image'
import { AdBanner } from 'components/chakra-pro/ad-banner'
import DiscordStrip from 'components/discord-strip'
import Footer from 'components/footer'
import Header from 'components/header'
import SEO from 'components/seo'
import Mask from 'components/showcase/mask'
import ShowcaseGridItem from 'components/showcase/showcase-grid-item'
import { t } from 'utils/i18n'

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
              {items.map(({ name, image, url }, i) => {
                const colSpan = [1, 2, 1, i % 3 === 0 ? 6 : 3]
                const rowSpan = [1, 2, 2, i % 3 === 0 ? 2 : 1]

                if (image === null)
                  return (
                    <ShowcaseGridItem
                      key={name}
                      colSpan={colSpan}
                      rowSpan={rowSpan}
                    >
                      <Mask name={name} url={url} showMask />
                      <ChakraNextImage
                        height={478}
                        width={850}
                        rounded='md'
                        layout='responsive'
                        src={`/og-image.png`}
                      />
                    </ShowcaseGridItem>
                  )
                return (
                  <ShowcaseGridItem
                    key={name}
                    colSpan={colSpan}
                    rowSpan={rowSpan}
                  >
                    <Mask name={name} url={url} />
                    <ChakraNextImage
                      height={478}
                      width={850}
                      rounded='md'
                      layout='responsive'
                      src={/^(https|http)/.test(image) ? image : `/${image}`}
                    />
                  </ShowcaseGridItem>
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
        <VStack mx='auto' spacing='3' alignItems='center'>
          <Heading fontSize={{ base: '2xl', lg: '4xl' }} lineHeight='1.2'>
            {t('showcase.title')}
          </Heading>
          <Text
            maxW='560px'
            mx='auto'
            color={useColorModeValue('gray.500', 'gray.400')}
            fontSize={{ base: 'lg', lg: 'xl' }}
          >
            {t('showcase.message')}
          </Text>
          <Link
            isExternal
            href='https://github.com/chakra-ui/awesome-chakra-ui'
          >
            <Button
              fontSize={{ base: 'lg', lg: 'xl' }}
              variant='link'
              colorScheme='teal'
            >
              {t('showcase.submit-project-button-title')}
            </Button>
          </Link>
        </VStack>
        <Box mt='10' mb='20' mx='auto' maxWidth={1440}>
          <Tabs
            size='md'
            variant='soft-rounded'
            colorScheme='teal'
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

export default Showcase
