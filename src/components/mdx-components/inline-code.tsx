import { chakra, useColorModeValue, useDimensions } from '@chakra-ui/react'
import React, { useRef } from 'react'

export const InlineCode = (props: any) => {
  const codeRef = useRef(null)
  const dimensions = useDimensions(codeRef)

  /**
   * Value (in pixels) comes from the minimum width of
   * the `li` parent element in the changelog page
   * before the layout shifts to mobile.
   */
  const MIN_CONTENT_WIDTH = 363
  return (
    <chakra.code
      apply='mdx.code'
      color={useColorModeValue('purple.500', 'purple.200')}
      ref={codeRef}
      whiteSpace={
        dimensions?.borderBox.width <= MIN_CONTENT_WIDTH ? 'nowrap' : ''
      }
      {...props}
    />
  )
}
