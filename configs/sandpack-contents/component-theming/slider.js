module.exports = {
  App: `import {
        Slider,
        SliderTrack,
        SliderFilledTrack,
        SliderThumb,
        Text,
        Box,
        Flex,
      } from "@chakra-ui/react";
        
        export default function App() {
          return (
            <>
            <Flex textAlign="center" gap={3} mt={3} direction="column">
            <Box>
              <Text>Default</Text>
              <Slider aria-label="slider-ex-1">
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </Box>
    
            <Box>
              <Text>With xl size</Text>
              <Slider aria-label="slider-ex-1" size="xl">
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </Box>
    
            <Box>
              <Text>With square variant</Text>
              <Slider aria-label="slider-ex-1" variant="square">
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
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
  import { sliderTheme } from "./theme/components/Slider";
  export const theme = extendTheme({
    components: { Slider: sliderTheme }
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
  SliderTheme: `import { sliderAnatomy as parts } from "@chakra-ui/anatomy";
  import {
    createMultiStyleConfigHelpers,
    defineStyle,
  } from "@chakra-ui/styled-system";
  
  const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(parts.keys);
  
  const baseStyle = definePartsStyle({
    filledTrack: {
      bg: "blue.600",
    },
    thumb: {
      bg: "orange.400",
    },
  });
  
  const sizes = {
    xl: definePartsStyle({
      track: defineStyle({
        h: 7,
      }),
      thumb: defineStyle({
        boxSize: 7,
      }),
    }),
  };
  
  const square = definePartsStyle({
    thumb: defineStyle({
      rounded: "none",
    }),
  });
  
  export const sliderTheme = defineMultiStyleConfig({
    baseStyle,
    variants: { square },
    sizes,
  });  
    `,
}
