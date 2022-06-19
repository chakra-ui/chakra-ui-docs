import {
  Box,
  Heading,
  LinkBox,
  LinkOverlay,
  Text,
  VStack,
} from '@chakra-ui/react'
import NextImage from 'next/image'
import NextLink from 'next/link'

type Props = {
  url: string
  title: string
  description: string
  slug: string
}

export function ComponentOverviewItem(props: Props) {
  const { url, title, description, slug } = props
  const imageUrl = `/components/${slug}.svg`
  return (
    <LinkBox
      as='article'
      height='full'
      p={4}
      rounded='md'
      transition='border-color 0.1s ease-out'
      role='group'
      borderWidth={1}
      borderColor='gray.100'
      _dark={{
        borderColor: 'gray.600',
        bg: 'whiteAlpha.50',
      }}
      _hover={{
        borderColor: 'teal.400',
      }}
    >
      <VStack alignItems='flex-start' spacing={4}>
        <Box
          w='full'
          rounded='md'
          overflow='hidden'
          transition='all 200ms ease-out'
          _groupHover={{ transform: 'scale(1.05, 1.05)' }}
        >
          <NextImage src={imageUrl} width={400} height={300} />
        </Box>
        <NextLink href={url} passHref>
          <LinkOverlay>
            <Heading as='h3' size='sm'>
              {title}
            </Heading>
          </LinkOverlay>
        </NextLink>
        <Text fontSize='sm' noOfLines={3}>
          {description}
        </Text>
      </VStack>
    </LinkBox>
  )
}
