import {
  AspectRatio,
  Box,
  Heading,
  LinkBox,
  LinkOverlay,
  Text,
  VStack,
} from '@chakra-ui/react'
import NextLink from 'next/link'

type Props = {
  url: string
  title: string
  description: string
}

const OverviewItem = ({ url, title, description }: Props) => {
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
        <AspectRatio ratio={4 / 3} w='full'>
          <Box
            bg='gray.100'
            w='full'
            h='full'
            rounded='md'
            _dark={{ bg: 'whiteAlpha.200' }}
          />
        </AspectRatio>
        <Heading as='h3' size='sm'>
          {title}
        </Heading>
        <Text fontSize='xs'>{description}</Text>
        <NextLink href={url} passHref>
          <LinkOverlay>
            <Text
              fontSize='xs'
              transition='color 0.1s ease-out'
              _groupHover={{ color: 'teal.400', textDecoration: 'underline' }}
            >
              See {title} &gt;
            </Text>
          </LinkOverlay>
        </NextLink>
      </VStack>
    </LinkBox>
  )
}

export default OverviewItem
