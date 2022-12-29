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
        Box
      } from "@chakra-ui/react";
      
      export default function App() {
        return (
          <>
            <Flex direction="column" gap={3} align="center" p={4}>
              <Box>
                <Popover>
                  <PopoverTrigger>
                    <Button colorScheme="blue">Default Popover</Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>This is header</PopoverHeader>
                    <PopoverBody>This is body</PopoverBody>
                    <PopoverFooter>This is footer</PopoverFooter>
                  </PopoverContent>
                </Popover>
              </Box>
      
              <Box>
                <Popover size={"xl"}>
                  <PopoverTrigger>
                    <Button colorScheme="blue">With xl size</Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>This is header</PopoverHeader>
                    <PopoverBody>This is body</PopoverBody>
                    <PopoverFooter>This is footer</PopoverFooter>
                  </PopoverContent>
                </Popover>
              </Box>
      
              <Box>
                <Popover variant={"custom"}>
                  <PopoverTrigger>
                    <Button colorScheme="blue">With custom variant</Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>This is header</PopoverHeader>
                    <PopoverBody>This is body</PopoverBody>
                    <PopoverFooter>This is footer</PopoverFooter>
                  </PopoverContent>
                </Popover>
              </Box>
            </Flex>
          </>
        );
      }
    `,
  Index: `import { ChakraProvider } from "@chakra-ui/react";
import * as React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";
import { extendTheme } from "@chakra-ui/react";
import { popoverTheme } from "./theme/components/popover.ts";
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
);
 `,
  PopoverTheme: `import { popoverAnatomy as parts } from "@chakra-ui/anatomy";
  import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/react";
  
  const {
    definePartsStyle,
    defineMultiStyleConfig
  } = createMultiStyleConfigHelpers(parts.keys);
  
  const baseStyle = definePartsStyle({
    // define the part you're going to style
    body: {
      bg: "gray.200" // change the background of the body to gray.800
    },
    content: {
      padding: 3 // change the padding of the content
    }
  });
  
  const sizes = {
    xl: definePartsStyle({
      header: defineStyle({
        padding: 14
      }),
      content: defineStyle({
        fontSize: "2xl",
        marginLeft: 6
      })
    })
  };
  
  const variantCustom = definePartsStyle({
    content: defineStyle({
      padding: 7,
      bg: "gray.300"
    }),
    footer: defineStyle({
      fontSize: "xl"
    })
  });
  
  const variants = {
    custom: variantCustom
  };
  
  export const popoverTheme = defineMultiStyleConfig({
    baseStyle,
    variants,
    sizes
  });  
  `,
}