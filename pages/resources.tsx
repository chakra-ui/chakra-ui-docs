import {
  Box,
  Heading,
  Text,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
} from '@chakra-ui/react'
import PageContainer from 'components/page-container'
import ResourceCard, { Resource } from 'components/resource-card'
import Sidebar from 'components/sidebar/sidebar'
import resources from 'configs/resources.json'
import { getRoutes } from 'layouts/mdx'
import groupBy from 'lodash/groupBy'
import * as React from 'react'
import { FaMicrophone, FaPenSquare, FaVideo } from 'react-icons/fa'
import { useFormik } from 'formik'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { t } from 'utils/i18n'
import { filterResources } from 'utils/filter-resources'

function Resources() {
  /**
   * Re-use the docs sidebar so it's easier for a visitors
   * to reference components mentioned in the resource blog/video.
   */
  const routes = getRoutes('/docs/')
  const data = resources.data as Resource[]
  const groups = groupBy(data, 'type')

  const BLOGS = t('resources.blogs.title')
  const TALKS = t('resources.talks.title')
  const VIDEOS = t('resources.videos.title')

  return (
    <PageContainer
      sidebar={<Sidebar routes={routes} />}
      frontmatter={{
        title: t('resources.title'),
        description: t('resources.description'),
      }}
    >
      <Text mt='2'>{t('resources.message')}</Text>
      <Tabs colorScheme='teal' variant='enclosed' mt='2'>
        <TabList>
          <Tab>{TALKS}</Tab>
          <Tab>{VIDEOS}</Tab>
          <Tab>{BLOGS}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ResourceSection
              title={TALKS}
              resources={groups.talk}
              icon={FaMicrophone}
            />
          </TabPanel>
          <TabPanel>
            <ResourceSection
              title={VIDEOS}
              resources={groups.video}
              icon={FaVideo}
            />
          </TabPanel>
          <TabPanel>
            <ResourceSection
              title={BLOGS}
              resources={groups.blog}
              icon={FaPenSquare}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
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
  const filterInputId = `resources-filter-${title.toLowerCase()}`
  const formik = useFormik({
    initialValues: { [filterInputId]: '' },
    onSubmit: undefined,
  })
  const filteredResources = filterResources(formik.values[filterInputId], resources)

  return (
    <Box as='section' mt='8'>
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
      <FormControl id={filterInputId} mt='8' mb='8'>
        <FormLabel>{t('resources.searchFilter.label')}</FormLabel>
        <Input
          onChange={formik.handleChange}
          placeholder={t('resources.searchFilter.placeholder')}
          value={formik.values[filterInputId]}
        />
        <FormHelperText>{t('resources.searchFilter.helperText')}</FormHelperText>
      </FormControl>
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 580: 2 }}>
        <Masonry gutter='16px'>
          {filteredResources.map(
            (item, index) => (
              <ResourceCard key={index} data={item} />
            ),
          )}
        </Masonry>
      </ResponsiveMasonry>
    </Box>
  )
}
