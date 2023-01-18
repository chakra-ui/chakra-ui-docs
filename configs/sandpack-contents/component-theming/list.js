module.exports = {
  App: `
import {
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
import { MdCheckCircle, MdSettings, MdOutlineSell } from "react-icons/md";

export default function App() {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <Box pos="relative">
      <Flex
        maxHeight={"inherit"}
        boxSizing="border-box"
        wrap="wrap"
        textAlign="start"
        justify="center"
        gap={3}
        p={2}
      >
        <Box flexBasis="100%">
          <Text textAlign={"center"} fontSize={"2xl"}>
            Themed List
          </Text>
        </Box>
        <Box>
          <Text textAlign={"center"} fontSize={"xl"}>
            Ordered List
          </Text>
          <OrderedList>
            <ListItem>Lorem ipsum dolor sit</ListItem>
            <ListItem>Consectetur adipiscing</ListItem>
            <ListItem>Integer molestie lorem</ListItem>
          </OrderedList>
        </Box>
        <Box>
          <Text textAlign={"center"} fontSize={"xl"}>
            Unordered List
          </Text>
          <UnorderedList>
            <ListItem>Lorem ipsum dolor sit</ListItem>
            <ListItem>Consectetur adipiscing</ListItem>
            <ListItem>Integer molestie lorem</ListItem>
          </UnorderedList>
        </Box>
        <Box>
          <Text textAlign={"center"} fontSize={"xl"}>
            With Icons
          </Text>
          <List>
            <ListItem>
              <ListIcon as={MdCheckCircle} />
              Lorem ipsum dolor sit
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckCircle} />
              Consectetur adipiscing
            </ListItem>
            <ListItem>
              <ListIcon as={MdSettings} />
              Integer molestie lorem
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
              Lorem ipsum dolor sit
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckCircle} />
              Consectetur adipiscing
            </ListItem>
            <ListItem>
              <ListIcon as={MdSettings} />
              Integer molestie lorem
            </ListItem>
          </List>
        </Box>

        <Box>
          <Text textAlign={"center"} fontSize={"xl"} p={3}>
            Themed XL Custom List
          </Text>
          <List size="xl" variant="custom" spacing={3}>
            <Flex align={"center"}>
              <ListIcon as={MdOutlineSell} />
              <ListItem>Lorem ipsum dolor sit</ListItem>
            </Flex>
            <Flex align={"center"}>
              <ListIcon as={MdOutlineSell} />
              <ListItem>Consectetur adipiscing</ListItem>
            </Flex>
            <Flex align={"center"}>
              <ListIcon as={MdOutlineSell} />
              <ListItem>Integer molestie lorem</ListItem>
            </Flex>
          </List>
        </Box>
      </Flex>
      <Box>
        <IconButton
          aria-label="toggle theme"
          rounded="full"
          size="xs"
          position="fixed"
          bottom={4}
          left={4}
          onClick={toggleColorMode}
          icon={colorMode === "dark" ? <FaSun /> : <FaMoon />}
        />
      </Box>
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
    margin: "0px !important",
    boxShadow: "md",
  },

  item: {
    p: 1,
    "&::marker": {
      color: mode("green.500", "green.200")(props),
    },
  },

  icon: {
    color: mode("blue.500", "blue.200")(props),
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
    item: {
      bg: mode("orange.100", "orange.400")(props),
      borderRadius: "30px",
      w: "full",
      p: 2,
    },
    icon: {
      color: mode("orange.200", "orange.400")(props),
    },
  })),
};

export const listTheme = defineMultiStyleConfig({
  variants,
  sizes,
  baseStyle,
});`,
}
