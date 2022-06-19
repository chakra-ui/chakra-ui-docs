import { Box, BoxProps } from '@chakra-ui/react'
import {
  CodeEditorProps,
  PreviewProps,
  SandpackCodeEditor,
  SandpackLayout,
  SandpackLayoutProps,
  SandpackPreview,
  SandpackProvider,
} from '@codesandbox/sandpack-react'
import { nightOwl } from '@codesandbox/sandpack-themes'

type Props = BoxProps & {
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
  layoutOptions?: BoxProps & SandpackLayoutProps
  editorOptions?: CodeEditorProps
  previewOptions?: PreviewProps
  files: {
    [x: string]: string
  }
}

const SandpackEmbed = ({
  dependencies,
  devDependencies,
  layoutOptions,
  editorOptions,
  previewOptions,
  files,
}: Props) => {
  return (
    <SandpackProvider
      files={files}
      theme={nightOwl}
      template='react-ts'
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
          ...dependencies,
        },
        devDependencies: {
          '@types/react': '^18.0.0',
          '@types/react-dom': '^18.0.0',
          typescript: '^4.0.0',
          ...devDependencies,
        },
      }}
    >
      <Box
        as={SandpackLayout}
        sx={{ '& > *': { height: '600px !important' } }}
        {...layoutOptions}
      >
        <SandpackCodeEditor
          showLineNumbers
          style={{ flexBasis: '20%' }}
          {...editorOptions}
        />
        <SandpackPreview
          style={{ width: '100%', zIndex: 0 }}
          {...previewOptions}
        />
      </Box>
    </SandpackProvider>
  )
}

export default SandpackEmbed
