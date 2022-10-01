import {
  SimpleGrid,
  Stack,
  Text,
  AspectRatio,
  VStack,
  LinkBox,
  LinkOverlay,
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
            <LinkBox
              w='full'
              borderWidth='1px'
              transform='auto'
              _dark={{ bg: 'whiteAlpha.50' }}
              _hover={{ boxShadow: 'md', translateY: '-2px' }}
              rounded='md'
              overflow='hidden'
              transition='all 0.1s ease-out'
            >
              <AspectRatio ratio={16 / 9} w='full'>
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
              </AspectRatio>
              <LinkOverlay href={url} isExternal>
                <Text
                  px={4}
                  py={3}
                  fontWeight='semibold'
                  textAlign='start'
                  fontSize={{ base: 'sm', md: 'md' }}
                >
                  {name}
                </Text>
              </LinkOverlay>
            </LinkBox>
          </VStack>
        ))}
      </SimpleGrid>
    </MDXLayout>
  )
}

export default Showcase
