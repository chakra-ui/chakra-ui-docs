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

import * as Illustrations from './illustrations'

const componentIllustrations = {
  button: <Illustrations.ButtonIllustration />,
  checkbox: <Illustrations.CheckboxIllustration />,
  editable: <Illustrations.EditableIllustration />,
  'form-control': <Illustrations.FormControlIllustration />,
  'icon-button': <Illustrations.IconButtonIllustration />,
  input: <Illustrations.InputIllustration />,
  'number-input': <Illustrations.NumberInputIllustration />,
  'pin-input': <Illustrations.PinInputIllustration />,
  radio: <Illustrations.RadioIllustration />,
  'range-slider': <Illustrations.RangeSliderIllustration />,
}

type Props = {
  url: string
  title: string
  description: string
  slug: string
}

const OverviewItem = ({ url, title, description, slug }: Props) => {
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
        <AspectRatio
          ratio={4 / 3}
          w='full'
          rounded='md'
          overflow='hidden'
          transition='all 200ms ease-out'
          _groupHover={{ transform: 'scale(1.05, 1.05)' }}
        >
          {componentIllustrations[slug] ?? (
            <Box
              bg='gray.100'
              w='full'
              h='full'
              rounded='md'
              _dark={{ bg: 'whiteAlpha.200' }}
            />
          )}
        </AspectRatio>
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

export default OverviewItem
