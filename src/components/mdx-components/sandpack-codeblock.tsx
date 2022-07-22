import { Box } from '@chakra-ui/react'
import {
  SandpackCodeEditor,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
  useActiveCode,
} from '@codesandbox/sandpack-react'
import { nightOwl } from '@codesandbox/sandpack-themes'
import CopyButton from './codeblock/copy-button'

export const DEFAULT_INDEX_CODE = `import * as React from "react";
import { createRoot } from "react-dom/client";
import { Box, ChakraProvider } from "@chakra-ui/react";

import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <ChakraProvider>
    <App />
  </ChakraProvider>
);`

function CodeBlock(props) {
  const { children, homeAppFile } = props

  const { code } = useActiveCode()

  const isHomePage = !!homeAppFile
  const isLivePreview = isHomePage || children.props.live !== 'false'

  const editorAndPreviewStyles = {
    flex: '1 1 50%',
    minWidth: '400px',
  }

  return (
    <Box
      as={SandpackLayout}
      sx={{
        '--sp-layout-height': 'auto',
        marginY: !isHomePage && 8,
      }}
      style={{
        flexDirection: isHomePage ? 'row-reverse' : 'column',
        fontWeight: 'bold',
        borderColor: 'transparent',
        borderRadius: '8px',
      }}
    >
      {isLivePreview && (
        <Box
          as={SandpackPreview}
          sx={{
            '--sp-zIndices-top': '2',
            '& iframe': { flex: 'initial', flexGrow: 1 },
            '& > .sp-preview-container': {
              padding: 4,
            },
          }}
          style={{ ...editorAndPreviewStyles }}
        />
      )}
      <Box position='relative' {...editorAndPreviewStyles}>
        <SandpackCodeEditor
          showLineNumbers
          wrapContent
          readOnly={!isLivePreview}
          showReadOnly={false}
          style={{
            // maxHeight should only be set if there is a preview
            maxHeight: isLivePreview && '500px',
          }}
        />
        {!isHomePage && <CopyButton top='14px' fontWeight='bold' code={code} />}
      </Box>
    </Box>
  )
}

export default function SandpackCodeBlock(props) {
  const isMDXCode = !!props.children

  const rawCode = isMDXCode ? props.children.props.children : props.homeAppFile

  const additionalDeps = isMDXCode && props.children.props.deps

  const parsedAddDeps =
    additionalDeps &&
    additionalDeps
      .replace('[', '')
      .replace(']', '')
      .split(',')
      .reduce((acc, dep) => {
        return { ...acc, [dep]: 'latest' }
      }, {})

  const trimmedCode = rawCode.trim()

  return (
    <SandpackProvider
      theme={nightOwl}
      template='react-ts'
      files={{ '/index.tsx': DEFAULT_INDEX_CODE, '/App.tsx': trimmedCode }}
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
          ...parsedAddDeps,
        },
      }}
    >
      <CodeBlock {...props} />
    </SandpackProvider>
  )
}
