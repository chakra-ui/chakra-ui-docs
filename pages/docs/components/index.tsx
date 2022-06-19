import {
  GridItem,
  Heading,
  List,
  ListItem,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'
import { GetStaticProps } from 'next'

import { ComponentOverviewItem } from 'components/component-overview-item'
import Layout from 'layouts'
import { getGroupedComponents } from 'utils/contentlayer-utils'

type Component = {
  title: string
  url: string
  id: string
}

type Category = {
  id: string
  title: string
  components: Component[]
}

type Heading = {
  id: string
  text: string
  level: number
}

type Props = {
  categories: Category[]
  headings: Heading[]
}

export const ComponentsOverview = ({ categories, headings }: Props) => {
  return (
    <Layout
      frontMatter={{
        title: 'Components',
        slug: '/docs/components',
        headings,
      }}
    >
      <VStack w='full' mt={5} alignItems='stretch' spacing={12}>
        <Text lineHeight='tall'>
          Chakra UI provides prebuild components to help you build your projects
          faster. Here is an overview of the component categories:
        </Text>
        <List w='full' spacing={12}>
          {categories.map(({ title, components, id }) => (
            <ListItem
              key={title}
              display='flex'
              flexDirection='column'
              rowGap={6}
            >
              <Heading as='h2' size='md' id={id} scrollMarginTop={24}>
                {title}
              </Heading>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                {components.map(({ title: componentTitle, url, id }) => (
                  <GridItem key={id}>
                    <ComponentOverviewItem
                      url={url}
                      title={componentTitle}
                      slug={id}
                    />
                  </GridItem>
                ))}
              </SimpleGrid>
            </ListItem>
          ))}
          )
        </List>
      </VStack>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const group = getGroupedComponents()

  const categories = Object.entries(group).reduce((acc, item) => {
    const [title, items] = item
    if (title === 'Layout') return acc
    const category: Category = {
      id: title.toLowerCase().replace(/ /g, '-'),
      title,
      components: items.map(({ title, slug, id }) => ({
        id,
        title,
        url: slug,
      })),
    }
    return acc.concat(category)
  }, [] as Category[])

  const headings = Object.entries(group).reduce((acc, item) => {
    const [title] = item
    if (title === 'Layout') return acc
    const heading: Heading = {
      id: title.toLowerCase().replace(/ /g, '-'),
      text: title,
      level: 2,
    }
    return acc.concat(heading)
  }, [] as Heading[])

  return {
    props: {
      categories,
      headings,
    },
  }
}

export default ComponentsOverview
