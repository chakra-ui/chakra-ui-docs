module.exports = {
  App: `import {
  ChakraProvider,
  Box,
  Radio,
  Heading,
  Center,
} from '@chakra-ui/react';
import theme from './theme';
import { ColorModeSwitcher } from './ColorModeSwitcher';

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box position="relative" h="100vh" p={12}>
        <Center>
          <Radio>Choose me</Radio>
        </Center>
        <ColorModeSwitcher aria-label="toggle theme" position="absolute" bottom={4} left={4} />
      </Box>
    </ChakraProvider>
  );
}`,
  Index: `import * as ReactDOM from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container!);

root.render(<App />);`,
  Theme: `import { extendTheme } from '@chakra-ui/react';
import { radioTheme } from './components/Radio';

const theme = extendTheme({
  components: {
    Radio: radioTheme,
  },
});

export default theme;`,
  Radio: `import { radioAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(radioAnatomy.keys);

// define the base component styles
const baseStyle = definePartsStyle({
  // define the part you're going to style
  control: {
    borderRadius: "md", // change the border radius
    borderColor: "blue.500" // change the border color
  }
});

const sizes = {
  // define custom styles for xl size
  xl: definePartsStyle({
    control: { w: "6", h: "6" },
    label: { fontSize: "xl" }
  })
};


// define custom variant
const variants = {
  groove: definePartsStyle({
    control: {
      borderRadius: "0",
      _checked: {
        border: "2px solid purple",
        background: "purple.200",
        _hover: {
          bg: "purple.600",
          border: "2px solid purple"
        }
      },
      _dark:{
        borderColor: "purple.200",
        background: "purple.400",
      }
    }
  })
};

// export the component theme
export const radioTheme = defineMultiStyleConfig({
  baseStyle,
  sizes,
  variants,
  defaultProps: {
    // define which size and variant is applied by default
    size: "xl",
    variant: "groove"
  },
});`,
  ColorModeSwitcher: `import { useColorMode, useColorModeValue, IconButton, IconButtonProps } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

export const ColorModeSwitcher = (props: IconButtonProps) => {
  const { toggleColorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <IconButton
      size="xs"
      rounded="full"
      fontSize="lg"
      variant="ghost"
      color="current"
      marginLeft="2"
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      {...props}
    />
  );
};`,
}
