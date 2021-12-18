import { Box, BoxProps } from '@chakra-ui/react'
import { Sandpack, SandpackProps } from '@codesandbox/sandpack-react'
import '@codesandbox/sandpack-react/dist/index.css'

const SandpackEmbed = (props: BoxProps & SandpackProps) => {
  return (
    <Box
      as={Sandpack}
      {...props}
      options={{
        ...props.options,
        showLineNumbers: true,
      }}
      theme='dark'
      template='react-ts'
      customSetup={{
        dependencies: {
          react: '17.0.2',
          'react-dom': '17.0.2',
          'react-scripts': '4.0.0',
          'react-icons': '3.11.0',
          '@chakra-ui/react': '1.7.3',
          '@chakra-ui/icons': '^1.1.1',
          '@emotion/react': '^11.7.0',
          '@emotion/styled': '^11.6.0',
          'framer-motion': '^4.1.17',
        },
      }}
    />
  )
}

export default SandpackEmbed
