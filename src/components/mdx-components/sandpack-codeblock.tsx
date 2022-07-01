import { Box, Button, useDisclosure } from '@chakra-ui/react'
import {
  SandpackCodeEditor,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
  useSandpackTheme,
} from '@codesandbox/sandpack-react'
import { nightOwl } from '@codesandbox/sandpack-themes'

export const DEFAULT_INDEX_CODE = `import * as React from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";

import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <ChakraProvider>
    <App />
  </ChakraProvider>
);`

function CodeBlock(props) {
  const { theme } = useSandpackTheme()
  const { isOpen, getButtonProps } = useDisclosure()

  return (
    <Box
      as={SandpackLayout}
      sx={{
        '--sp-layout-height': 'auto',
      }}
      style={{ flexDirection: 'column' }}
    >
      <Box
        as={SandpackPreview}
        actionsChildren={
          <Button
            bg='teal.200'
            color='gray.800'
            fontWeight={'bold'}
            size='xs'
            alignSelf={'center'}
            variant={'solid'}
            _hover={{
              bg: 'teal.300',
            }}
            {...getButtonProps()}
          >
            {isOpen ? 'Hide' : 'Show'} Code
          </Button>
        }
        sx={{
          '& iframe': { flex: 'initial', flexGrow: 1 },
          '& > .sp-preview-container': {
            paddingBottom: '12',
            bg: theme.colors.surface1,
          },
        }}
        style={{ flex: 'initial' }}
      />

      <SandpackCodeEditor
        showLineNumbers
        style={{
          maxHeight: isOpen ? '500px' : '0px',
          border: !isOpen && '0',
          minWidth: '400px',
        }}
      />
    </Box>
  )
}

export default function SandpackCodeBlock(props) {
  const { children } = props.children.props

  const rawCode = children.trim()
  return (
    <SandpackProvider
      theme={nightOwl}
      template='react-ts'
      files={{ '/index.tsx': DEFAULT_INDEX_CODE, '/App.tsx': rawCode }}
      options={{
        visibleFiles: ['/App.tsx'],
      }}
      customSetup={{
        dependencies: {
          'react-icons': '3.11.0',
          '@chakra-ui/react': 'latest',
          '@chakra-ui/icons': 'latest',
          '@emotion/react': '^11.7.0',
          '@emotion/styled': '^11.6.0',
          'framer-motion': '^4.1.17',
          react: '^18.0.0',
          'react-dom': '^18.0.0',
          'react-scripts': '^4.0.0',
        },
        devDependencies: {
          '@types/react': '^18.0.0',
          '@types/react-dom': '^18.0.0',
          typescript: '^4.0.0',
        },
      }}
    >
      <CodeBlock {...props} />
    </SandpackProvider>
  )
}
