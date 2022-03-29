import {
  Button,
  Flex,
  Stack,
  Tag,
  Box,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  Portal,
  Tooltip,
  Text,
} from '@chakra-ui/react'
import { lineNumbers } from '@codemirror/gutter'
import { EditorState } from '@codemirror/state'
import { EditorView } from '@codemirror/view'
import {
  SandpackThemeProvider,
  useSandpack,
  useSandpackTheme,
} from '@codesandbox/sandpack-react'
import * as React from 'react'
import { RiFileEditLine } from 'react-icons/ri'
import {
  formatFilePath,
  SandpackLanguageSupport,
  getCodeMirrorLanguage,
  getEditorTheme,
  getSyntaxHighlight,
} from './utils'

interface CodeBlockProps {
  path: string
  code: string
  language: SandpackLanguageSupport
  showLineNumbers?: boolean
}

const CodeBlock = ({
  path,
  code,
  language = 'typescript',
  showLineNumbers = false,
}: CodeBlockProps) => {
  const { theme } = useSandpackTheme()
  const { sandpack } = useSandpack()
  const editor = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const currentEditor = editor.current as HTMLDivElement

    const extensions = [
      getCodeMirrorLanguage(language),
      getEditorTheme(theme),
      getSyntaxHighlight(theme),
      EditorState.readOnly.of(true),
      EditorView.editable.of(false),
    ]

    if (showLineNumbers) {
      extensions.push(lineNumbers())
    }

    const state = EditorState.create({
      doc: code,
      extensions,
    })
    const view = new EditorView({ state, parent: currentEditor })

    return () => view.destroy()
  }, [code, language, showLineNumbers, theme])

  return (
    <Stack
      bg={theme.palette.defaultBackground}
      rounded='md'
      spacing={-2}
      w='100%'
      my={8}
    >
      {path && (
        <Flex p={2} justifyContent='space-between' position={'relative'}>
          <Tag
            size='md'
            bg='none'
            color='purple.300'
            opacity={0.8}
            cursor='pointer'
            _hover={{
              opacity: 1,
            }}
            rounded='lg'
            onClick={() => {
              sandpack.openFile(path)
            }}
          >
            {formatFilePath(path)}
          </Tag>
          <Button
            size='sm'
            position='absolute'
            textTransform='uppercase'
            colorScheme='teal'
            fontSize='xs'
            height='24px'
            top='3'
            zIndex='1'
            right='1.25em'
            leftIcon={<Icon as={RiFileEditLine} />}
            onClick={() => {
              sandpack.openFile(path)
              sandpack.updateFile(path, code || '')
            }}
          >
            Copy to Sandbox
          </Button>
        </Flex>
      )}
      <Box
        p={4}
        px={1}
        bg={theme.palette.defaultBackground}
        rounded='lg'
        overflow='hidden'
        tabIndex={-1}
        ref={editor}
      />
    </Stack>
  )
}

const CodeBlockWrapper = (props: CodeBlockProps) => {
  return (
    <SandpackThemeProvider theme='night-owl'>
      <CodeBlock {...props} />
    </SandpackThemeProvider>
  )
}

export default CodeBlockWrapper
