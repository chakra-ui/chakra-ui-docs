module.exports = {
    App: `import { Box, SimpleGrid, IconButton, Center, Heading, useColorMode } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";
export default function App() {
    const { toggleColorMode, colorMode } = useColorMode();
    return (
        <Box position="relative" h="100vh">
            <SimpleGrid gap={12} p={12} columns={2}>
              <Heading>Default heading</Heading>
              <Heading variant="custom">Themed heading</Heading>
              <Heading variant="brand">Another themed heading</Heading>
              <Heading variant="thicc">Hover me(in dark mode)</Heading>
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
import { headingTheme } from "./theme/components/Heading.ts";
const theme = extendTheme({
    components: {
        Heading: headingTheme,
    }
});
const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
    <ChakraProvider theme={theme}>
        <App />
    </ChakraProvider>
);`,
    HeadingTheme: `import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system"
const brandPrimary = defineStyle({
    color: "blue.500",
    border: "0px",
    // let's also provide dark mode alternatives
    _dark: {
        color: 'blue.300',
    }
})

const custom = defineStyle({
    color: "yellow.500",
    border: "0px",
    // let's also provide dark mode alternatives
    _dark: {
        color: 'yellow.300',
    }
})

const thicc = defineStyle({
    color: "orange.500",
    border: "0px",
    bg: "blue.200",
    p: "3",
    borderRadius: "10",
    transition: 'transform 0.15s ease-in-out, background 0.15s ease-in-out',
    // let's also provide dark mode alternatives
    _dark: {
        color: 'orange.400',
        bg: "blue.200"
    },
    _hover: {
      bg: "blue.100",
      color: "purple.300",
      transform: "scale(1, 1)",
      _dark: {
        bg: "blue.100",
        color: "purple.300",
        transform: "scale(3, 3)",
      }
    }
})

export const headingTheme = defineStyleConfig({
    variants: {
        brand: brandPrimary,
        "custom": custom,
        "thicc": thicc
    },
})`,
}