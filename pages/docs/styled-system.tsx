import { Text, VStack } from '@chakra-ui/react'

import { FeaturesOverview } from 'components/features-overview'
import Layout from 'layouts'

const ComponentsOverview = () => {
  return (
    <Layout
      frontMatter={{
        title: 'Styled System',
        description: 'Understanding the Chakra UI styled system',
        slug: '/docs/styled-system',
      }}
    >
      <VStack w='full' mt={5} alignItems='stretch' spacing={12}>
        <Text lineHeight='tall'>
          The Chakra UI styled system is a great collection of different
          features and utilities. Go and check them out!
        </Text>
        <FeaturesOverview />
      </VStack>
    </Layout>
  )
}

export default ComponentsOverview
