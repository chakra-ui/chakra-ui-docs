import { useState, useCallback } from 'react'
import { Grid, GridItem, Box } from '@chakra-ui/layout'
import { TabList, Tabs, Tab, TabPanels, TabPanel } from '@chakra-ui/tabs'
import { SkipNavContent, SkipNavLink } from '@chakra-ui/skip-nav'
import SEO from 'components/seo'
import Header from 'components/header'
import ChakraNextImage from 'components/chakra-next-image'
import DiscordStrip from 'components/discord-strip'
import { AdBanner } from 'components/chakra-pro/ad-banner'
import Footer from 'components/footer'
import { t } from 'utils/i18n'
import _ from 'lodash'
import showcaseData from '../configs/showcase.json'
import type { IShowcase } from '../scripts/showcase-preview-images'

const categories = Object.keys(showcaseData as IShowcase)
const categoriesWithAll = ['all', ...categories]

const allItems = categories.reduce((acc, cur) => {
  return [...acc, ...showcaseData[cur]]
}, [])

const Showcase = () => {
  const [index, setIndex] = useState<number>(0)

  const handleTabsChange = useCallback((index: number) => {
    if (index < 0 || index >= categories.length) setIndex(0)
    setIndex(index)
  }, [])

  /*
    Set hash in the first render

    Troubleshooting
    If using hash to get key, it might happen Error: Cancel rendering route
    More Info: https://github.com/vercel/next.js/issues/2476
   */
  // useEffect(() => {
  //   const hash = window?.location?.hash
  //   if (hash) {
  //     const hashStringWithoutSign = removeHashSign(hash)
  //     const categoryIndex = getHashIndexInCategory(hashStringWithoutSign)
  //     setIndex(categoryIndex !== -1 ? categoryIndex : 0)
  //   }
  // }, [])

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

        <Box my='20' mx='auto' maxWidth={1440}>
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
              {categoriesWithAll.map((c) => {
                let items = c === 'all' ? allItems : showcaseData[c]
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
                      {items.map(({ name, description, image }, i) => {
                        const colSpan = [1, 2, 1, i % 3 === 0 ? 6 : 3]
                        const rowSpan = [1, 2, 2, i % 3 === 0 ? 2 : 1]
                        if (image == null)
                          return (
                            <GridItem
                              key={name}
                              colSpan={colSpan}
                              rowSpan={rowSpan}
                              justifySelf='center'
                              alignSelf='center'
                              borderRadius='10px'
                            >
                              <ChakraNextImage
                                height={478}
                                width={850}
                                borderRadius='5px'
                                layout='responsive'
                                src={`/og-image.png`}
                              />
                            </GridItem>
                          )
                        return (
                          <GridItem
                            key={name}
                            colSpan={colSpan}
                            rowSpan={rowSpan}
                            justifySelf='center'
                            alignSelf='center'
                            borderRadius='10px'
                          >
                            <ChakraNextImage
                              height={478}
                              width={850}
                              borderRadius='5px'
                              layout='responsive'
                              src={`/${image}`}
                            />
                          </GridItem>
                        )
                      })}
                    </Grid>
                  </TabPanel>
                )
              })}
            </TabPanels>
          </Tabs>
        </Box>
        <DiscordStrip />
        <Footer />
      </Box>
    </>
  )
}

// const removeHashSign = (hash: string) => hash.replace('#', '')
// const getHashIndexInCategory = (hash: string) => categoriesWithAll.indexOf(hash)

export default Showcase
