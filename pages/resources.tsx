import { Box, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import PageContainer from 'components/page-container'
import ResourceCard, { Resource } from 'components/resource-card'
import Sidebar from 'components/sidebar/sidebar'
import resources from 'configs/resources.json'
import { getRoutes } from 'layouts/mdx'
import groupBy from 'lodash/groupBy'
import * as React from 'react'
import { t } from 'utils/i18n'
import { FaMicrophone, FaPenSquare, FaVideo } from 'react-icons/fa'

function Resources() {
  /**
   * Re-use the docs sidebar so it's easier for a visitors
   * to reference components mentioned in the resource blog/video.
   */
  const routes = getRoutes('/docs/')
  const data = resources.data as Resource[]
  const groups = groupBy(data, 'type')

  return (
    <PageContainer
      sidebar={<Sidebar routes={routes} />}
      frontmatter={{
        title: t('resources.title'),
        description: t('resources.description'),
      }}
    >
      <Text mt='2'>{t('resources.message')}</Text>

      <Stack spacing='12'>
        <ResourceSection
          title={t('resources.talks.title')}
          resources={groups.talk}
          icon={FaMicrophone}
        />
        <ResourceSection
          title={t('resources.videos.title')}
          resources={groups.video}
          icon={FaVideo}
        />
        <ResourceSection
          title={t('resources.blogs.title')}
          resources={groups.blog}
          icon={FaPenSquare}
        />
      </Stack>
    </PageContainer>
  )
}

export default Resources

interface ResourceSectionProps {
  title: string
  icon: React.ElementType
  resources: Resource[]
}

function ResourceSection(props: ResourceSectionProps) {
  const { icon, title, resources } = props
  return (
    <Box as='section' mt='12'>
      <Heading as='h2' size='md'>
        <Box
          as={icon}
          display='inline-block'
          verticalAlign='middle'
          color='teal.500'
          mr='3'
        />
        <span>{title}</span>
      </Heading>
      <SimpleGrid mt={8} columns={[1, 2]} spacing={8}>
        {resources.map((item, index) => (
          <ResourceCard key={index} data={item} />
        ))}
      </SimpleGrid>
    </Box>
  )
}
