import { Grid, GridItem, Box } from '@chakra-ui/layout'
import { TabList, Tabs, Tab, TabPanels, TabPanel } from '@chakra-ui/tabs'
import { SkipNavContent, SkipNavLink } from '@chakra-ui/skip-nav'
import SEO from 'components/seo'
import Header from 'components/header'
import { AdBanner } from 'components/chakra-pro/ad-banner'
import ChakraNextImage from 'components/chakra-next-image'
import { t } from 'utils/i18n'
import showcaseData from '../configs/showcase.json'

const Showcase = () => {
  const categories = Object.keys(showcaseData)

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

        <Box mx='auto' maxWidth={1200}>
          <Tabs size='md' variant='soft-rounded' colorScheme='green'>
            <TabList>
              {categories.map((c) => (
                <Tab ml='3' key={c}>
                  {c}
                </Tab>
              ))}
            </TabList>
            <TabPanels mt='10'>
              <TabPanel>
                <Grid
                  h='500px'
                  templateRows='repeat(2, 1fr)'
                  templateColumns='repeat(3, 1fr)'
                  gap={5}
                >
                  <GridItem colSpan={1} bg='papayawhip' />
                  <GridItem colSpan={2} bg='papayawhip' />
                  <GridItem colSpan={3} bg='tomato' />
                </Grid>
                {/* {showcaseData[categories[0]].map(
                  ({ name, description, url }) => {
                    return <ChakraNextImage key={name} src={url} />
                  },
                )} */}
              </TabPanel>
              <TabPanel>
                <p>two!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </>
  )
}

export default Showcase
