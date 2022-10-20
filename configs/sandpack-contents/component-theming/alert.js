module.exports = {
  App: `import {
  Box,
  useColorMode,
  IconButton,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function App() {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <Box pt={12} position="relative" h="100vh">
      <Alert size="md" status="error">
        <AlertIcon />
        <AlertTitle>Your browser is outdated!</AlertTitle>
        <AlertDescription>
          Your Chakra experience may be degraded.
        </AlertDescription>
      </Alert>

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
}
`,
  Index: `import * as React from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import App from "./App";
import { alertTheme } from "./theme/components/Alert";

const theme = extendTheme({
  components: {
    Alert: alertTheme,
  }
});

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
);`,
  AlertTheme: `import { alertAnatomy as parts } from "@chakra-ui/anatomy";
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from "@chakra-ui/styled-system";
import { extendTheme } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  // define the part you're going to style
  title: {
    color: "teal.500", // change the color of the title text of the alert
  },
});

// Defining a custom variant called mono
const mono = definePartsStyle((props) => {
  const { colorScheme: c } = props;
  return {
    container: {
      border: "1px solid",
      borderColor: "gray.100",
    },
    title: { fontFamily: "mono" },
    description: {
      fontFamily: "mono",
    },
  };
});

const variants = {
  mono,
};

const size = {
  md: defineStyle({
    w: 5,
    h: 5,
  }),
};

const sizes = {
  md: definePartsStyle({
    icon: size.md,
  }),
};

export const alertTheme = defineMultiStyleConfig({
  baseStyle,
  variants,
  sizes,
  defaultProps: {
    variant: "mono",
    colorScheme: "blue",
  },
});
`,
}
