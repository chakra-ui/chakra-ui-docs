module.exports = {
  App: `import {
    Text,
    Box,
    Flex,
    Skeleton,
    Button,
    IconButton,
    useColorMode,
  } from "@chakra-ui/react";
  import { FaMoon, FaSun } from "react-icons/fa";
  import { useState } from "react";
  
  export default function App() {
    const [loading, setLoading] = useState(true);
    const { toggleColorMode, colorMode } = useColorMode();
  
    return (
      <Box pos="relative">
        <Flex textAlign="center" gap={3} mt={3} direction="column">
          <Box>
            <Text>Default Skeleton</Text>
            <Skeleton isLoaded={!loading} bg="orange" fadeDuration={1}>
              <Text>Hidden Text</Text>
            </Skeleton>
          </Box>
  
          <Box>
            <Text>With xl size</Text>
            <Skeleton isLoaded={!loading} bg="orange" fadeDuration={1} size="xl">
              <Text>Hidden Text</Text>
            </Skeleton>
          </Box>
  
          <Box>
            <Text>With red variant</Text>
            <Skeleton
              isLoaded={!loading}
              bg="orange"
              fadeDuration={1}
              variant="red"
            >
              <Text>Hidden Text</Text>
            </Skeleton>
          </Box>
  
          <Box>
            <Button colorScheme={"blue"} onClick={() => setLoading(!loading)}>
              Toggle
            </Button>
  
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
        </Flex>
      </Box>
    );
  }`,
  Index: `import * as React from "react";
  import { createRoot } from "react-dom/client";
  import { ChakraProvider, extendTheme } from "@chakra-ui/react";
  
  import App from "./App";
  import { skeletonTheme } from "./theme/components/Skeleton";
  
  const theme = extendTheme({
    components: {
      Skeleton: skeletonTheme,
    }
  });
  
  const container = document.getElementById("root");
  const root = createRoot(container!);
  root.render(
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  );`,
  SkeletonTheme: `import {
    cssVar,
    defineStyle,
    defineStyleConfig,
  } from "@chakra-ui/styled-system";
  
  const $startColor = cssVar("skeleton-start-color");
  const $endColor = cssVar("skeleton-end-color");
  
  const red = defineStyle({
    [$startColor.variable]: "colors.red.100", //changing start color to red.100
    [$endColor.variable]: "colors.red.400", // changing end color to red.400
  });
  
  const xl = defineStyle({
    h: 9,
    borderRadius: "lg",
  });
  
  export const skeletonTheme = defineStyleConfig({
    variants: { red },
    sizes: { xl },
  });
  `,
}
