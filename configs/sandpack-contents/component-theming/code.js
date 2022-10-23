module.exports = {
  App: `import { Box, SimpleGrid, IconButton, Code, useColorMode } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function App() {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <Box position="relative" h="100vh">
      <SimpleGrid gap={12} p={12} columns={2}>
        <Code>
          const getCodeType = () => "default"
          <br/>
          getCodeType() // default
        </Code>
        <Code variant="custom">
          const getCodeType = () => "custom"
          <br/>
          getCodeType() // custom
        </Code>
        <Code variant="solid">
          const getCodeType = () => "solid"
          <br/>
          getCodeType() // solid
        </Code>
        <Code variant="outline">
          const getCodeType = () => "outline"
          <br/>
          getCodeType() // outline
        </Code>
      </SimpleGrid>

      <IconButton
        aria-label="toggle theme"
        rounded="full"
        size="xs"
        position="absolute"
        bottom={4}
        left={4}
        onClick={toggleColorMode} icon={colorMode === "dark" ? <FaSun /> : <FaMoon />}
      />
    </Box>
  );
}`,
  Index: `import * as React from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import App from "./App";
import { codeTheme } from "./theme/components/Code";

const theme = extendTheme({
  components: {
    Code: codeTheme,
  }
});

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
);`,
  CodeTheme: `import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system"

const baseStyle = defineStyle({
  borderRadius: 0, // remove border radius
  padding: 2, // add padding
  fontSize: "xs", // change font size to xs
  fontWeight: "semibold", // change the font weight to normal
  fontFamily: "mono", // change the font family to monospaced
})


// Defining a custom variant
const customVariant = defineStyle((props) => {
  const { colorScheme: c } = props
  return {
    fontFamily: "sans-serif",
    bg: \`\${c}.500\`,
    fontWeight: "semibold",
    color: 'white',
    borderRadius: '3xl',
    transition: 'transform 0.15s ease-out, background 0.15s ease-out',
    _dark: {
      bg: \`\${c}.200\`,
      color: 'gray.800',
    },

    _hover: {
      transform: "scale(1.05, 1.05)",
      bg: \`\${c}.600\`,

      _dark: {
        bg: \`\${c}.300\`,
      },
    },

    _active: {
      bg: \`\${c}.700\`,
      transform: "scale(1, 1)",

      _dark: {
        bg: \`\${c}.400\`,
      }
    },
  }
})

export const codeTheme = defineStyleConfig({
  baseStyle,
  variants: {
    custom: customVariant,
  },
  defaultProps: {
    colorScheme: "purple", // set the default color scheme to purple
  },
})`,
}
