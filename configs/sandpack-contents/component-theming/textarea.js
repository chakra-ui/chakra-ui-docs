module.exports = {
  App: `import { Box, SimpleGrid, IconButton, Textarea, useColorMode } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function App() {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <Box position="relative" h="100vh">
      <SimpleGrid gap={12} p={12} columns={2}>
        <Textarea placeholder='Themed outline textarea' />
        <Textarea variant="flushed" placeholder='Themed flushed textarea' />
        <Textarea variant="filled" placeholder='Themed filled textarea' />
        <Textarea variant="unstyled" placeholder='Themed unstyled textarea' />
      </SimpleGrid>

      <IconButton
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
import { textareaTheme } from "./theme/components/Textarea.ts";

const theme = extendTheme({
  components: {
    Textarea: textareaTheme,
  }
});

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
);`,

  TextareaTheme: `import { inputAnatomy as parts } from "@chakra-ui/anatomy"
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from "@chakra-ui/styled-system"
import { getColor } from "@chakra-ui/theme-tools"

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

// default base style from the Input theme
const baseStyle = definePartsStyle({
  field: {
    width: "100%",
    minWidth: 0,
    outline: 0,
    position: "relative",
    appearance: "none",
    transitionProperty: "common",
    transitionDuration: "normal",
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed",
    },
  },
})

const variantOutline = definePartsStyle((props) => {
  const { theme } = props

  return {
    field: {
      fontFamily: "mono", // change font family to mono
    }
  }
})

const variantFilled = definePartsStyle((props) => {
  const { theme } = props

  return {
    field: {
      fontWeight: "semibold", // change font weight to semibold
    },
  }
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
const variants = {
  outline: variantOutline,
  filled: variantFilled,
}

const size = {
  md: defineStyle({
    fontSize: "sm",
    px: "4",
    h: "10",
    borderRadius: "none",
  }),
}

const sizes = {
  md: definePartsStyle({
    field: size.md,
    addon: size.md,
  }),
}

export const textareaTheme = defineMultiStyleConfig({
  baseStyle,
  variants,
  sizes,
  defaultProps: {
    size: "md",
    variant: "outline",
  },
})`,
}
