import { Box, Heading, SimpleGrid, Text, Tab, Tabs, TabList, TabPanel, TabPanels } from "@chakra-ui/react"
import PageContainer from "components/page-container"
import ResourceCard, { Resource } from "components/resource-card"
import Sidebar from "components/sidebar/sidebar"
import resources from "configs/resources.json"
import { getRoutes } from "layouts/mdx"
import groupBy from "lodash/groupBy"
import * as React from "react"
import { FaMicrophone, FaPenSquare, FaVideo } from "react-icons/fa"

function Resources() {
  /**
   * Re-use the docs sidebar so it's easier for a visitors
   * to reference components mentioned in the resource blog/video.
   */
  const routes = getRoutes("/docs/")
  const data = resources.data as Resource[]
  const groups = groupBy(data, "type")

  const BLOGS = "Blogs"
  const TALKS = "Talks"
  const VIDEOS = "Videos"

  return (
    <PageContainer
      sidebar={<Sidebar routes={routes} />}
      frontmatter={{
        title: "Community Resources",
        description:
          "A rich compilation of technical descriptions and detailed information of how Chakra UI works.",
      }}
    >
      <Text mt="2">
        A rich compilation of technical descriptions and detailed information of
        how Chakra UI works.
      </Text>
      <Tabs>
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
  return (
    <Box as="section">
      <Heading as="h2" size="md">
        <Box
          as={icon}
          display="inline-block"
          verticalAlign="middle"
          color="teal.500"
          mr="3"
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
