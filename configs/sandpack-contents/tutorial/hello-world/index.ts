export const TutorialApp1 = `

export default function App() {
  return (
    <div>Hello World!</div>
  )
}`

export const TutorialApp2 = `import { Center, ChakraProvider, Heading } from '@chakra-ui/react'

export default function App() {
  return (
    <ChakraProvider>
      <div>Hello World!</div>
    </ChakraProvider>
  )
}`

export const TutorialApp3 = `import { Center, ChakraProvider, Heading, theme } from '@chakra-ui/react'

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <div>Hello World!</div>
    </ChakraProvider>
  )
}`

export * from './package'
