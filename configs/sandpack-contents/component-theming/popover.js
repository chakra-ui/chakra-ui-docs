module.exports = {
  App: `import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  Flex,
  Box,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function App() {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <Box height="100vh">
      <Flex
        direction="column"
        gap={3}
        align="center"
        p={8}
        h="100vh"
        alignItems={"center"}
        justify="center"
      >
        <Box>
          <Popover>
            <PopoverTrigger>
              <Button variant="outline">Default Popover</Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Header</PopoverHeader>
              <PopoverBody>Body</PopoverBody>
              <PopoverFooter>Footer</PopoverFooter>
            </PopoverContent>
          </Popover>
        </Box>

        <Box>
          <Popover size={"xl"}>
            <PopoverTrigger>
              <Button variant="outline">With xl size</Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Header</PopoverHeader>
              <PopoverBody>Body</PopoverBody>
              <PopoverFooter>Footer</PopoverFooter>
            </PopoverContent>
          </Popover>
        </Box>

        <Box>
          <Popover variant="squared">
            <PopoverTrigger>
              <Button variant="outline">With squared variant</Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Header</PopoverHeader>
              <PopoverBody>Body</PopoverBody>
              <PopoverFooter>Footer</PopoverFooter>
            </PopoverContent>
          </Popover>
        </Box>
      </Flex>
      <IconButton
        aria-label="toggle theme"
        rounded="full"
        size="xs"
        position="absolute"
        bottom={4}
        left={4}
        onClick={toggleColorMode}
        icon={colorMode === "dark" ? <FaSun /> : <FaMoon />}
      />
    </Box>
  );
}`,
  Index: `import { ChakraProvider } from "@chakra-ui/react";
import * as React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { extendTheme } from "@chakra-ui/react";
import { popoverTheme } from "./theme/components/Popover";
export const theme = extendTheme({
  components: { Popover: popoverTheme }
});
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);`,
  PopoverTheme: `import { popoverAnatomy as parts } from "@chakra-ui/anatomy";
  import {
    createMultiStyleConfigHelpers,
    defineStyle,
  } from "@chakra-ui/styled-system";
  import { mode } from "@chakra-ui/theme-tools";
  
  const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(parts.keys);
  
  const baseStyle = definePartsStyle((props) => ({
    content: {
      p: 3,
    },
    header: {
      fontSize: "2xl",
    },
    body: {
      borderColor: mode("gray.600", "gray.200")(props),
      borderWidth: "1px",
    },
    footer: {
      fontSize: "xs",
    },
    popper: {
      borderColor: mode("cyan.600", "cyan.200")(props),
    },
    arrow: {
      p: 2,
    },
  
    closeButton: {
      color: mode("blue.600", "blue.200")(props),
    },
  }));
  
  const sizes = {
    xl: definePartsStyle({
      header: defineStyle({
        padding: 9,
      }),
      content: defineStyle({
        fontSize: "2xl",
        marginLeft: 6,
      }),
    }),
  };
  
  const squared = definePartsStyle({
    content: defineStyle({
      rounded: "none",
    }),
  });
  
  const variants = {
    squared,
  };
  
  export const popoverTheme = defineMultiStyleConfig({
    baseStyle,
    variants,
    sizes,
  });`,
}
