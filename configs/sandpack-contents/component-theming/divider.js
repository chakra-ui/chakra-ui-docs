module.exports = {
  App: `import { Box, SimpleGrid, Center, IconButton, Divider, useColorMode } from "@chakra-ui/react";
  import { FaMoon, FaSun } from "react-icons/fa";
  
  export default function App() {
    const { toggleColorMode, colorMode } = useColorMode();
    return (
      <Box position="relative" h="100vh">
        <SimpleGrid gap={12} p={12} columns={2}>
            <Divider />
            <Divider variant="dashed" />
            <Center height="50px">
            <Divider orientation="vertical" />
            </Center>
            <Center height="50px">
            <Divider orientation="vertical" variant="dashed" />
            </Center>
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
  import { dividerTheme } from "./theme/components/Divider.ts";
  
  const theme = extendTheme({
    components: {
      Button: dividerTheme,
    }
  });
  
  const container = document.getElementById("root");
  const root = createRoot(container!);
  root.render(
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  );`,
  DividerTheme: `import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system"
  
  const baseStyle = defineStyle({
    borderRadius: 0, // disable the border radius
    fontWeight: "normal", // change the font weight to normal
    fontFamily: "mono", // change the font family to monospaced
  })
  
  const sizes = {
    md: defineStyle({
      fontSize: "sm", // Change font size to sm (14px)
    }),
  }
  
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
  
  export const dividerTheme = defineStyleConfig({
    baseStyle,
    sizes,
    variants: {
      custom: customVariant,
    },
    defaultProps: {
      colorScheme: "purple", // set the default color scheme to purple
    },
  })`,
}
