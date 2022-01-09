import {
  Box,
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
      <Tabs colorScheme='teal' variant='enclosed' mt='6'>
        <TabList>
          <Tab>
            <ResourcesTabContent icon={FaMicrophone} text={TALKS} />
          </Tab>
          <Tab>
            <ResourcesTabContent icon={FaVideo} text={VIDEOS} />
          </Tab>
          <Tab>
            <ResourcesTabContent icon={FaPenSquare} text={BLOGS} />
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ResourceSection title={TALKS} resources={groups.talk} />
          </TabPanel>
          <TabPanel>
            <ResourceSection title={VIDEOS} resources={groups.video} />
          </TabPanel>
          <TabPanel>
            <ResourceSection title={BLOGS} resources={groups.blog} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </PageContainer>
  )
}

export default Resources

interface ResourceSectionProps {
  title: string
  resources: Resource[]
}

function ResourceSection(props: ResourceSectionProps) {
  const { title, resources } = props
  const filterInputId = `resources-filter-${title.toLowerCase()}`
  const formik = useFormik({
    initialValues: { [filterInputId]: '' },
    onSubmit: undefined,
  })
  const filteredResources = filterResources(
    formik.values[filterInputId],
    resources,
  )
  /**
   * Notice, that the breakpoints don't follow conventional numbers (e.g. 768, 991).
   * The reason for that is that the number (e.g. 767) actually represents target
   * number - 1 (e.g. 768 - 1), where at target number (e.g. 768) is the point at
   * which the grid should switch.  This might be a bug with the library.
   */
  const masonryGridBreakpoints = { 350: 1, 580: 2, 767: 1, 990: 2 }

  return (
    <Box as='section' mt='8'>
      <FormControl id={filterInputId} mt='8' mb='8'>
        <FormLabel>{t('resources.searchFilter.label')}</FormLabel>
        <Input
          name={filterInputId}
          onChange={formik.handleChange}
          placeholder={t('resources.searchFilter.placeholder')}
          value={formik.values[filterInputId]}
        />
        <FormHelperText>
          {t('resources.searchFilter.helperText')}
        </FormHelperText>
      </FormControl>
      <ResponsiveMasonry columnsCountBreakPoints={masonryGridBreakpoints}>
        <Masonry gutter='16px'>
          {filteredResources.map((item, index) => (
            <ResourceCard key={index} data={item} />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </Box>
  )
}

interface ResourcesTabContentProps {
  icon: React.ElementType
  text: string
}

function ResourcesTabContent({ icon, text }: ResourcesTabContentProps) {
  return (
    <>
      <Box
        as={icon}
        display='inline-block'
        verticalAlign='middle'
        color='teal.500'
        mr='2'
      />
      <span>{text}</span>
    </>
  )
}
