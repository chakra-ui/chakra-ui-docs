module.exports = {
    App: `import { Box, SimpleGrid, IconButton, Center, Divider, useColorMode } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";
export default function App() {
    const { toggleColorMode, colorMode } = useColorMode();
    return (
        <Box position="relative" h="100vh">
            <SimpleGrid gap={12} p={12} columns={2}>
              <Divider variant="thicc" />
              <Center height="50px">
                <Divider orientation="vertical" variant="thicc" />
              </Center>
              <Divider variant="brand" />
              <Center height="50px">
                <Divider orientation="vertical" variant="brand" />
              </Center>
              <Divider size="xl" />
              <Center height="50px">
                <Divider orientation="vertical" size="xl" />
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

const brandPrimary = defineStyle({
    border: '3px dashed',
    borderColor: 'orange.500',

    // let's also provide dark mode alternatives
    _dark: {
        border: '3px dashed',
        borderColor: 'orange.300',
    }
})

const xl = defineStyle({
    border: "10px solid",
    borderRadius: 20,
})

const thicc = defineStyle({
    border: '5px solid', // change the appearance of the border
    borderRadius: 10, // set border radius to 10
    borderColor: "orange.500",
    _dark: {
      border: '5px solid', // change the appearance of the border
      borderRadius: 10, // set border radius to 10
      borderColor: "orange.300",
    }
})

export const dividerTheme = defineStyleConfig({
    thicc,
    sizes: {
        "xl": xl
    },
    variants: {
        brand: brandPrimary,
        "thicc": thicc
    },
})`,
}