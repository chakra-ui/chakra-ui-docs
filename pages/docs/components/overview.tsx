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

import componentsSidebar from 'configs/components-sidebar.json'
import Layout from 'layouts'

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
}

const ComponentsOverview = ({ categories }: Props) => {
  return (
    <Layout
      frontMatter={{
        title: 'Components',
        slug: '/docs/components/overview',
      }}
    >
      <VStack w='full' mt={5} alignItems='stretch' spacing={12}>
        <Text lineHeight={1.7}>
          Chakra UI provides prebuild components to help you build your projects
          faster. Here is an overview of the component categories:
        </Text>
        <List w='full' spacing={12}>
          {categories.map(({ title, components }) => (
            <ListItem
              key={title}
              display='flex'
              flexDirection='column'
              rowGap={6}
            >
              <Heading as='h2' size='md'>
                {title}
              </Heading>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }}>
                {components.map(({ title }) => (
                  <GridItem key={title}>{title}</GridItem>
                ))}
              </SimpleGrid>
            </ListItem>
          ))}
        </List>
      </VStack>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const data = componentsSidebar.routes[0].routes.splice(1)
  const categories: Category[] = await Promise.all(
    data.map(async ({ title, routes }) => {
      const components = await Promise.all(
        routes.map(async ({ title, path }) => {
          const component: Component = {
            title,
            url: path,
            description: 'Bla bla',
          }

          return component
        }),
      )

      const category: Category = {
        title,
        components,
      }

      return category
    }),
  )

  return {
    props: {
      categories,
    },
  }
}

export default ComponentsOverview
