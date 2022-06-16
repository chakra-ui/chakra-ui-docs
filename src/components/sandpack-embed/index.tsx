import { Box, BoxProps, useTheme } from '@chakra-ui/react'
import {
  Sandpack,
  SandpackProps,
  SandpackThemeProp,
} from '@codesandbox/sandpack-react'

type Props = BoxProps &
  SandpackProps & {
    dependencies?: Record<string, string>
    devDependencies?: Record<string, string>
  }

const SandpackEmbed = ({ dependencies, devDependencies, ...props }: Props) => {
  const { colors: c } = useTheme()

  const themeConfig: SandpackThemeProp = {
    colors: {
      accent: c.gray[100],
      surface1: c.gray[900],
      surface2: c.gray[700],
      surface3: c.gray[700],
      error: c.red[600],
      errorSurface: c.red[100],
      clickable: c.green[500],
      hover: c.green[100],
    },
    syntax: {
      comment: {
        color: c.gray[600],
        fontStyle: 'italic',
      },
      definition: c.teal[300],
      keyword: c.blue[400],
      plain: c.white,
      property: c.blue[400],
      punctuation: c.white,
      static: c.red[500],
      string: c.purple[400],
      tag: c.orange[300],
    },
  }

  return (
    <Box
      as={Sandpack}
      {...props}
      options={{
        ...props.options,
        showLineNumbers: true,
      }}
      theme={themeConfig}
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
    />
  )
}

export default SandpackEmbed
