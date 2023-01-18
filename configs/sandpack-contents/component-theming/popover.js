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
  Text,
  Icon,
  Center,
} from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";
import { FaMoon, FaSun } from "react-icons/fa";
import { FiCheck, FiX } from "react-icons/fi";

const PopoverExample = ({ name, colorMode, ...rest }) => (
  <Box>
    <Popover {...rest}>
      <PopoverTrigger>
        <Button variant="outline">{name}</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>
          <Center>
            <Text as="b">Confirm Reservation</Text>
          </Center>
        </PopoverHeader>
        <PopoverBody>
          <Flex
            direction="column"
            justify="center"
            align="center"
            gap={1}
            p={2}
          >
            <Box>
              <Flex gap={5}>
                <Box>
                  <WarningIcon
                    boxSize={5}
                    color={colorMode === "light" ? "red.500" : "red.600"}
                  />
                </Box>
                <Box>
                  <Flex direction="column" gap={3}>
                    <Text as="b">Warning</Text>
                    <Text fontSize="sm">
                      Please confirm a reservation at <b>Dorsia</b>. Otherwise,
                      it will be canceled in <b>10 minutes</b>.
                    </Text>
                  </Flex>
                </Box>
              </Flex>
            </Box>
          </Flex>
        </PopoverBody>
        <PopoverFooter>
          <Center gap={6}>
            <Button colorScheme={"red"} rightIcon={<Icon as={FiX} />}>
              Cancel
            </Button>
            <Button colorScheme={"blue"} rightIcon={<Icon as={FiCheck} />}>
              Confirm
            </Button>
          </Center>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  </Box>
);

export default function App() {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <Box pos="relative">
      <Flex
        direction="column"
        gap={3}
        align="center"
        p={8} 
        h="100vh"
        alignItems={"center"}
        justify="center"
      >
        <PopoverExample name={"Themed Popover"} colorMode={colorMode} />

        <PopoverExample
          name={"Themed XL Popover"}
          size="xl"
          colorMode={colorMode}
        />
        <PopoverExample
          name={"Themed XL Red Popover"}
          size="xl"
          variant="red"
          colorMode={colorMode}
        />
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
    boxShadow: "lg",
  },
  header: {
    borderBottomWidth: 0,
  },

  footer: {
    borderTopWidth: 0,
  },

  body: {
    m: 7,
    borderRadius: "5px",
    borderLeftWidth: 4,
    borderColor: mode("gray.300", "gray.500")(props),
    bg: mode("gray.100", "gray.600")(props),
  },
}));

const sizes = {
  xl: definePartsStyle({
    header: defineStyle({
      fontSize: "xl",
      p: 3,
    }),
    body: defineStyle({
      fontSize: "xl",
      m: 4,
    }),
  }),
};

const red = definePartsStyle((props) => ({
  body: defineStyle({
    borderColor: mode("red.300", "red.600")(props),
    bg: mode("red.100", "red.200")(props),
    textColor: mode("red.500", "red.600")(props),
  }),
}));

const variants = {
  red,
};

export const popoverTheme = defineMultiStyleConfig({
  baseStyle,
  variants,
  sizes,
});`,
}
