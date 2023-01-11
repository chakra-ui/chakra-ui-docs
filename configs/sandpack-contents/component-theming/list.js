module.exports = {
  App: `import {
    Text,
    Box,
    Flex,
    List,
    ListItem,
    ListIcon,
    OrderedList,
    UnorderedList,
    Divider,
    IconButton,
    useColorMode,
  } from "@chakra-ui/react";
  import { FaMoon, FaSun } from "react-icons/fa";
  import { MdCheckCircle, MdSettings } from "react-icons/md";
  
  export default function App() {
    const { toggleColorMode, colorMode } = useColorMode();
  
    return (
      <Box pos="relative" height="100vh">
        <Flex wrap="wrap" textAlign="start" justify="center" gap={10} p={8}>
          <Box flexBasis="100%">
            <Text textAlign={"center"} fontSize={"2xl"}>
              Themed List
            </Text>
          </Box>
          <Box>
            <Text textAlign={"center"} fontSize={"xl"} p={3}>
              Ordered List
            </Text>
            <OrderedList>
              <ListItem>Lorem ipsum dolor sit amet</ListItem>
              <ListItem>Consectetur adipiscing elit</ListItem>
              <ListItem>Integer molestie lorem at massa</ListItem>
              <ListItem>Facilisis in pretium nisl aliquet</ListItem>
            </OrderedList>
          </Box>
          <Box>
            <Text textAlign={"center"} fontSize={"xl"} p={3}>
              Unordered List
            </Text>
            <UnorderedList>
              <ListItem>Lorem ipsum dolor sit amet</ListItem>
              <ListItem>Consectetur adipiscing elit</ListItem>
              <ListItem>Integer molestie lorem at massa</ListItem>
              <ListItem>Facilisis in pretium nisl aliquet</ListItem>
            </UnorderedList>
          </Box>
          <Box>
            <Text textAlign={"center"} fontSize={"xl"} p={3}>
              Unstyled List with icon
            </Text>
            <List>
              <ListItem>
                <ListIcon as={MdCheckCircle} />
                Lorem ipsum dolor sit amet
              </ListItem>
              <ListItem>
                <ListIcon as={MdCheckCircle} />
                Consectetur adipiscing elit
              </ListItem>
              <ListItem>
                <ListIcon as={MdCheckCircle} />
                Integer molestie lorem at massa
              </ListItem>
              <ListItem>
                <ListIcon as={MdSettings} />
                Facilisis in pretium nisl aliquet
              </ListItem>
            </List>
          </Box>
          <Divider />
          <Box>
            <Text textAlign={"center"} fontSize={"xl"} p={3}>
              Themed XL List
            </Text>
            <List size="xl">
              <ListItem>
                <ListIcon as={MdCheckCircle} />
                Lorem ipsum dolor sit amet
              </ListItem>
              <ListItem>
                <ListIcon as={MdCheckCircle} />
                Consectetur adipiscing elit
              </ListItem>
              <ListItem>
                <ListIcon as={MdCheckCircle} />
                Integer molestie lorem at massa
              </ListItem>
              <ListItem>
                <ListIcon as={MdSettings} />
                Facilisis in pretium nisl aliquet
              </ListItem>
            </List>
          </Box>
  
          <Box>
            <Text textAlign={"center"} fontSize={"xl"} p={3}>
              Themed XL Custom List
            </Text>
            <UnorderedList size="xl" variant="custom">
              <ListItem>Lorem ipsum dolor sit amet</ListItem>
              <ListItem>Consectetur adipiscing elit</ListItem>
              <ListItem>Integer molestie lorem at massa</ListItem>
              <ListItem>Facilisis in pretium nisl aliquet</ListItem>
            </UnorderedList>
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
  import { listTheme } from "./theme/components/List";
  export const theme = extendTheme({
    components: { List: listTheme }
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
  ListTheme: `import {
    defineStyle,
    createMultiStyleConfigHelpers,
  } from "@chakra-ui/styled-system";
  import { listAnatomy as parts } from "@chakra-ui/anatomy";
  import { mode } from "@chakra-ui/theme-tools";
  
  const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(parts.keys);
  
  const baseStyle = definePartsStyle((props) => ({
    container: {
      listStylePos: "inside",
      boxShadow: "md",
    },
  
    item: {
      p: 2,
      "&::marker": {
        color: mode("green.500", "green.200")(props),
      },
    },
  
    icon: {
      color: mode("blue.500", "blue.200"),
    },
  }));
  
  const sizes = {
    xl: definePartsStyle({
      container: defineStyle({
        fontSize: "xl",
        p: 6,
      }),
      icon: defineStyle({
        boxSize: 6,
        mr: 5,
      }),
    }),
  };
  
  const variants = {
    custom: definePartsStyle((props) => ({
      container: {
        bg: mode("white", "gray.700")(props),
      },
      item: {
        borderBottom: "1px solid",
        "&::marker": {
          color: mode("cyan.500", "cyan.200")(props),
        },
      },
    })),
  };
  
  export const listTheme = defineMultiStyleConfig({
    variants,
    sizes,
    baseStyle,
  });`,
}
