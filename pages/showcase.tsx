import { useState, useCallback } from 'react'
// import { useRouter } from 'next/router'
import { Grid, GridItem, Box } from '@chakra-ui/layout'
import { TabList, Tabs, Tab, TabPanels, TabPanel } from '@chakra-ui/tabs'
import { SkipNavContent, SkipNavLink } from '@chakra-ui/skip-nav'
import SEO from 'components/seo'
import Header from 'components/header'
import ChakraNextImage from 'components/chakra-next-image'
import { AdBanner } from 'components/chakra-pro/ad-banner'
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
  // const { push, pathname } = useRouter()

  const handleTabsChange = useCallback((index: number) => {
    if (index < 0 || index >= categories.length) {
      setIndex(0)
      //push({ pathname }, undefined, { shallow: true })
    }

    const key = categories[index - 1]
    // push({ pathname, hash: key }), undefined, { shallow: true }
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
      <Box mt={20}>
        <SkipNavContent />

        <Box mx='auto' maxWidth={1440}>
          <Tabs
            size='md'
            variant='soft-rounded'
            colorScheme='green'
            index={index}
            onChange={handleTabsChange}
          >
            <TabList>
              {categoriesWithAll.map((c) => (
                <Tab ml='3' key={c}>
                  {_.capitalize(c)}
                </Tab>
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
                      templateColumns='repeat(12, 1fr)'
                      templateRows='repeat(2, 1fr)'
                      rowGap={12}
                      columnGap={8}
                    >
                      {items.map(({ name, description, image }, i) => {
                        if (image == null)
                          return (
                            <GridItem
                              key={name}
                              colSpan={i % 3 === 0 ? 6 : 3}
                              rowSpan={i % 3 === 0 ? 2 : 1}
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
                            colSpan={i % 3 === 0 ? 6 : 3}
                            rowSpan={i % 3 === 0 ? 2 : 1}
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
      </Box>
    </>
  )
}

// const removeHashSign = (hash: string) => hash.replace('#', '')
// const getHashIndexInCategory = (hash: string) => categoriesWithAll.indexOf(hash)

export default Showcase
