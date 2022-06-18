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

import OverviewItem from 'components/overview/item'
import Layout from 'layouts'
import { getGroupedComponents } from 'utils/contentlayer-utils'

type Component = {
  title: string
  description: string
  url: string
}

type Category = {
  title: string
  components: Component[]
}

type Props = {
  categories: Category[]
  headings: { id: string; text: string; level: number }[]
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
        <Text lineHeight={1.7}>
          Chakra UI provides prebuild components to help you build your projects
          faster. Here is an overview of the component categories:
        </Text>
        <List w='full' spacing={12}>
          {categories.map(({ title, components }) => {
            const slug = title.toLowerCase().replace(/ /g, '-')
            return (
              <ListItem
                key={title}
                display='flex'
                flexDirection='column'
                rowGap={6}
              >
                <Heading as='h2' size='md' id={slug} scrollMarginTop={24}>
                  {title}
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                  {components.map(
                    ({ title: componentTitle, description, url }) => {
                      const componentSlug = componentTitle
                        .toLowerCase()
                        .replace(/ /g, '-')
                      return (
                        <GridItem key={componentSlug}>
                          <OverviewItem
                            url={url}
                            title={componentTitle}
                            description={description}
                            slug={componentSlug}
                          />
                        </GridItem>
                      )
                    },
                  )}
                </SimpleGrid>
              </ListItem>
            )
          })}
        </List>
      </VStack>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const group = getGroupedComponents()

  const categories = Object.entries(group).reduce((acc, item) => {
    const [key, items] = item
    if (key === 'Layout') return acc
    const category = {
      title: key,
      components: items.map(({ title, description, slug }) => ({
        title,
        description,
        url: slug,
      })),
    }
    return acc.concat(category)
  }, [] as any[])

  const headings = Object.entries(group).reduce((acc, item) => {
    const [key] = item
    if (key === 'Layout') return acc
    const heading = {
      id: key.toLowerCase().replace(/ /g, '-'),
      text: key,
      level: 2,
    }
    return acc.concat(heading)
  }, [] as any[])

  return {
    props: {
      categories,
      headings,
    },
  }
}

export default ComponentsOverview
