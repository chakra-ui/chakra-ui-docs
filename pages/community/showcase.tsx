import {
  Box,
  Button,
  Link,
  SimpleGrid,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react'
import ChakraNextImage from 'components/chakra-next-image'

import Layout from 'layouts'
import { useCallback, useMemo, useState } from 'react'
import { t } from 'utils/i18n'
import { capitalize } from 'utils/js-utils'
import showcaseData from 'configs/showcase.json'
import type { IShowcase } from 'scripts/get-showcase-data'

const categories = Object.keys(showcaseData as IShowcase)

const Showcase = () => {
  const [index, setIndex] = useState(0)

  const handleTabsChange = useCallback((index: number) => {
    if (index < 0 || index >= categories.length) setIndex(0)
    setIndex(index)
  }, [])

  const showcaseItems = useMemo(
    () =>
      categories.map((category) => {
        const items = showcaseData[category]
        return (
          <TabPanel key={category} padding='0'>
            <SimpleGrid
              columns={{ base: 1, sm: 2, lg: 3 }}
              spacing={{ base: '3', md: '10' }}
            >
              {items.map(({ name, image, url }) => {
                return (
                  <Box
                    as='a'
                    href={url}
                    key={url}
                    borderWidth='1px'
                    transform='auto'
                    _dark={{ bg: 'whiteAlpha.50' }}
                    _hover={{ boxShadow: 'md', translateY: '-2px' }}
                    rounded='md'
                    overflow='hidden'
                    transition='all 0.1s ease-out'
                  >
                    <ChakraNextImage
                      alt={name}
                      height={478}
                      width={850}
                      layout='responsive'
                      src={
                        image
                          ? /^(https|http)/.test(image)
                            ? image
                            : `/${image}`
                          : '/og-image.png'
                      }
                    />
                    <Box px='4' py='3'>
                      <Text
                        fontWeight='semibold'
                        textAlign='start'
                        fontSize={{ base: 'sm', md: 'md' }}
                      >
                        {name}
                      </Text>
                    </Box>
                  </Box>
                )
              })}
            </SimpleGrid>
          </TabPanel>
        )
      }),
    [],
  )

  return (
    <Layout
      hideToc
      maxWidth='unset'
      frontMatter={{
        title: t('showcase.seo.title'),
        description: t('showcase.seo.description'),
        slug: '/community/showcase',
      }}
    >
      <Stack align='flex-start' mt='5' spacing='8'>
        <Text color='fg-subtle' fontSize={{ base: 'lg', lg: 'xl' }}>
          {t('showcase.message')}
        </Text>
        <Button
          as={Link}
          isExternal
          href='https://github.com/chakra-ui/awesome-chakra-ui'
          variant='outline'
          color='accent'
        >
          {t('showcase.submit-project-button-title')}
        </Button>
      </Stack>

      <Tabs
        mt='10'
        mb='20'
        variant='line'
        colorScheme='teal'
        isLazy
        index={index}
        onChange={handleTabsChange}
      >
        <TabList>
          {categories.map((c) => (
            <Tab key={c}>{capitalize(c)}</Tab>
          ))}
        </TabList>
        <TabPanels mt='10'>{showcaseItems}</TabPanels>
      </Tabs>
    </Layout>
  )
}

export default Showcase
