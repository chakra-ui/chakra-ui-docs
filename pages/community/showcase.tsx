import {
  Link,
  SimpleGrid,
  Stack,
  Text,
  Box,
  AspectRatio,
  VStack,
  Heading,
} from '@chakra-ui/react'
import { ChakraNextUnwrappedImage } from 'components/chakra-next-image'

import { t } from 'utils/i18n'
import showcaseData from 'configs/showcase.json'
import MDXLayout from 'layouts/mdx'

const Showcase = () => {
  return (
    <MDXLayout
      hideToc
      maxWidth='unset'
      frontmatter={{
        title: t('showcase.seo.title'),
        description: t('showcase.seo.description'),
        slug: '/community/showcase',
      }}
    >
      <Stack align='flex-start' mt='5' spacing='8'>
        <Text color='fg-subtle' fontSize={{ base: 'lg', lg: 'xl' }}>
          {t('showcase.message')}
        </Text>
      </Stack>

      <SimpleGrid columns={{ base: 1, xl: 2 }} gap={8} mt={10}>
        {showcaseData.map(({ name, image, url }) => (
          <VStack key={url} alignItems='flex-start' spacing={3}>
            <AspectRatio ratio={16 / 9} w='full'>
              <Box
                as={Link}
                isExternal
                href={url}
                borderWidth='1px'
                transform='auto'
                _dark={{ bg: 'whiteAlpha.50' }}
                _hover={{ boxShadow: 'md', translateY: '-2px' }}
                rounded='md'
                overflow='hidden'
                transition='all 0.1s ease-out'
              >
                <ChakraNextUnwrappedImage
                  alt={name}
                  layout='fill'
                  objectFit='cover'
                  src={
                    image
                      ? /^(https|http)/.test(image)
                        ? image
                        : `/${image}`
                      : '/og-image.png'
                  }
                />
              </Box>
            </AspectRatio>
            <Heading
              fontSize='md'
              _groupHover={{ color: 'teal.500' }}
              _groupFocus={{ color: 'teal.500' }}
              transition='0.25s color ease-out'
            >
              {name}
            </Heading>
          </VStack>
        ))}
      </SimpleGrid>
    </MDXLayout>
  )
}

export default Showcase
