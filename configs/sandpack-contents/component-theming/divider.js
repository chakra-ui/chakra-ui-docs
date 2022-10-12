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
    Divider: dividerTheme,
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
    _dark: {
        color: 'white',
        bg: 'white',
        height: '15px',
        width: '10px'
      },
  })
  
  // Defining a custom variant
  const customVariant = defineStyle((props) => {
    return {
      color: 'blue.500',
      _dark: {
        color: 'white',
        bg: 'white',
        height: '15px',
        width: '10px'
      },
    }
  })
  
  export const dividerTheme = defineStyleConfig({
    baseStyle,
    variants: {
      custom: customVariant,
    },
    defaultProps: {
      variant: "solid",
      orientation: "horizontal"
    },
  })`,
}
