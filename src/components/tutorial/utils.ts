import { HighlightStyle, tags } from '@codemirror/highlight'
import { css } from '@codemirror/lang-css'
import { html } from '@codemirror/lang-html'
import { javascript } from '@codemirror/lang-javascript'
import type { LanguageSupport } from '@codemirror/language'
import type { Extension } from '@codemirror/state'
import { EditorView } from '@codemirror/view'
import { getSyntaxStyle, SandpackTheme } from '@codesandbox/sandpack-react'

export const hexToRGB = (
  hex: string,
): { red: number; green: number; blue: number } => {
  let r = '0'
  let g = '0'
  let b = '0'

  if (hex.length === 4) {
    r = '0x' + hex[1] + hex[1]
    g = '0x' + hex[2] + hex[2]
    b = '0x' + hex[3] + hex[3]
  } else if (hex.length === 7) {
    r = '0x' + hex[1] + hex[2]
    g = '0x' + hex[3] + hex[4]
    b = '0x' + hex[5] + hex[6]
  }

  return {
    red: +r,
    green: +g,
    blue: +b,
  }
}

export const hexToCSSRGBa = (hex: string, alpha: number): string => {
  if (hex.startsWith('#') && (hex.length === 4 || hex.length === 7)) {
    const { red, green, blue } = hexToRGB(hex)
    return `rgba(${red}, ${green}, ${blue}, ${alpha})`
  }

  return hex
}

export const getEditorTheme = (theme: SandpackTheme): Extension =>
  EditorView.theme({
    '&': {
      backgroundColor: theme.palette.defaultBackground,
      color:
        getSyntaxStyle(theme.syntax.plain).color || theme.palette.activeText,
      height: '100%',
    },

    '&.cm-editor.cm-focused': {
      outline: 'none',
    },

    '.cm-activeLine': {
      backgroundColor: hexToCSSRGBa(theme.palette.activeBackground, 0.5),
    },

    '.cm-errorLine': {
      backgroundColor: hexToCSSRGBa(theme.palette.errorBackground, 0.2),
    },

    '.cm-matchingBracket, .cm-nonmatchingBracket': {
      color: 'inherit',
      background: theme.palette.activeBackground,
    },

    '.cm-content': {
      padding: 0,
      caretColor: theme.palette.activeText,
    },

    '.cm-scroller': {
      fontFamily: theme.typography.monoFont,
      lineHeight: theme.typography.lineHeight,
    },

    '.cm-gutters': {
      backgroundColor: theme.palette.defaultBackground,
      color: theme.palette.defaultText,
      border: 'none',
    },

    '.cm-gutter.cm-lineNumbers': {
      paddingLeft: 'var(--sp-space-1)',
      paddingRight: 'var(--sp-space-1)',
    },

    '.cm-lineNumbers .cm-gutterElement': {
      padding: 0,
    },

    '.cm-line': {
      padding: '0 var(--sp-space-3)',
    },
  })

export const getSyntaxHighlight = (theme: SandpackTheme): HighlightStyle =>
  HighlightStyle.define([
    { tag: tags.link, textDecoration: 'underline' },
    { tag: tags.emphasis, fontStyle: 'italic' },
    { tag: tags.strong, fontWeight: 'bold' },

    {
      tag: tags.keyword,
      ...getSyntaxStyle(theme.syntax.keyword),
    },
    {
      tag: [tags.atom, tags.number, tags.bool],
      ...getSyntaxStyle(theme.syntax.static),
    },
    {
      tag: tags.tagName,
      ...getSyntaxStyle(theme.syntax.tag),
    },
    { tag: tags.variableName, ...getSyntaxStyle(theme.syntax.plain) },
    {
      // Highlight function call
      tag: tags.function(tags.variableName),
      ...getSyntaxStyle(theme.syntax.definition),
    },
    {
      // Highlight function definition differently (eg: functional component def in React)
      tag: tags.definition(tags.function(tags.variableName)),
      ...getSyntaxStyle(theme.syntax.definition),
    },
    {
      tag: tags.propertyName,
      ...getSyntaxStyle(theme.syntax.property),
    },
    {
      tag: [tags.literal, tags.inserted],
      ...getSyntaxStyle(theme.syntax.string ?? theme.syntax.static),
    },
    { tag: tags.punctuation, ...getSyntaxStyle(theme.syntax.punctuation) },
    { tag: tags.comment, ...getSyntaxStyle(theme.syntax.comment) },
  ])

export type SandpackLanguageSupport =
  | 'jsx'
  | 'tsx'
  | 'javascript'
  | 'typescript'
  | 'html'
  | 'css'

export const getCodeMirrorLanguage = (
  extension: SandpackLanguageSupport,
): LanguageSupport => {
  const options: Record<SandpackLanguageSupport, LanguageSupport> = {
    jsx: javascript({ jsx: true, typescript: false }),
    javascript: javascript({ jsx: true, typescript: false }),
    typescript: javascript({ jsx: true, typescript: true }),
    tsx: javascript({ jsx: true, typescript: true }),
    html: html(),
    css: css(),
  }

  return options[extension]
}

export const formatFilePath = (path: string) => {
  if (path.startsWith('/')) {
    return path.substring(1)
  }
  return path
}

export const getAppWithCustomStiffness = (bounceStiffness: number): string => {
  return `import { Center, ChakraProvider, List, ListItem } from "@chakra-ui/react";
import { Reorder } from "framer-motion";
import { useState } from "react";
import User from "./User";

export default function App() {
  const [usernames, setUsernames] = useState([
    "malerba118",
    "compulves",
    "dan_abramov"
  ]);
  return (
    <ChakraProvider>
      <Center h="100vh">
        <List
          as={Reorder.Group}
          axis="y"
          values={usernames}
          onReorder={setUsernames}
          spacing={2}
        >
          {usernames.map((item) => (
            <ListItem
              as={Reorder.Item}
              key={item}
              value={item}
              p={2}
              bg="gray.100"
              rounded="xl"
              dragTransition={{ bounceStiffness: ${bounceStiffness} }}
            >
              <User username={item} />
            </ListItem>
          ))}
        </List>
      </Center>
    </ChakraProvider>
  );
}`
}
