import {
  chakra,
  HTMLChakraProps,
  useColorModeValue,
  useDimensions,
} from '@chakra-ui/react'
import React, { useRef } from 'react'

export const InlineCode = (props: HTMLChakraProps<'code'>) => {
  const codeRef = useRef(null)
  const dimensions = useDimensions(codeRef)

  /**
   * Value (in pixels) comes from the minimum width of
   * the `li` parent element in the changelog page
   * before the layout shifts to mobile.
   */
  const MIN_CONTENT_WIDTH = 363
  const shouldWrap = dimensions?.borderBox.width > MIN_CONTENT_WIDTH

  return (
    <chakra.code
      apply='mdx.code'
      color={useColorModeValue('purple.500', 'purple.200')}
      ref={codeRef}
      whiteSpace={shouldWrap ? undefined : 'nowrap'}
      {...props}
    />
  )
}
