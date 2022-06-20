import { Box, LinkBox, LinkOverlay, SimpleGrid, Text } from '@chakra-ui/react'
import NextImage from 'next/image'

const CourseBanner = ({
  href,
  image,
  title,
  description,
}: {
  image: string
  title: string
  description: string
  href: string
}) => {
  return (
    <LinkBox role='group' mt='10'>
      <Box mb='4' rounded='lg' overflow='hidden'>
        <NextImage
          src={image}
          alt='Egghead Logo'
          layout='responsive'
          width='400'
          height='200'
        />
      </Box>

      <LinkOverlay href={href} target='_blank'>
        <Text as='h3' fontWeight='semibold'>
          {title}
        </Text>
      </LinkOverlay>

      <Text mt='2' mb='4' fontSize='sm' color='fg-muted'>
        {description}
      </Text>
    </LinkBox>
  )
}

export const FeaturesCourses = () => {
  return (
    <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: '4', md: '8' }}>
      <CourseBanner
        image='/course-banners/egghead-course.png'
        title='Egghead Course'
        description='In this free course, you will learn the basics of Chakra UI and how to build well-designed, accessible user interfaces with speed!'
        href='https://egghead.io/courses/build-a-modern-user-interface-with-chakra-ui-fac68106'
      />
      <CourseBanner
        image='/course-banners/chakra-ui-for-beginners.png'
        title='Chakra UI for beginners'
        description='The complete course for absolute beginners to understand how Chakra UI works and get started building.'
        href='https://www.chakrauiforbeginners.com/'
      />
    </SimpleGrid>
  )
}

export default CourseBanner
