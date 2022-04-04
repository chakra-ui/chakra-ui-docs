module.exports = {
  App: `import { Container, chakra } from '@chakra-ui/react';
import { motion, isValidMotionProp } from 'framer-motion';
  
const ChakraBox = chakra(motion.div, {
  shouldForwardProp: isValidMotionProp,
});
  
export default function App() {
  return (
    <Container h="100vh" d="flex" alignItems="center" justifyContent="center">
      <ChakraBox
        animate={{
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 0, 270, 270, 0],
          borderRadius: ["20%", "20%", "50%", "50%", "20%"],
        }}
        // @ts-ignore no problem in operation, although type error appears.
        transition={{
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
        }}
        padding="2"
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        width="12"
        height="12"
        display="flex"
      />
    </Container>
  )
}`,
  Index: `import * as React from "react";
import { render } from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
  
import App from "./App";
  
const rootElement = document.getElementById("root");
render(
  <ChakraProvider>
    <App />
  </ChakraProvider>,
  rootElement
);`,
}
