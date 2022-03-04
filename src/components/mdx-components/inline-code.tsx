import { chakra, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const InlineCode = (props: any) => (
  <chakra.code
    apply='mdx.code'
    color={useColorModeValue('purple.500', 'purple.200')}
    {...props}
  />
)
