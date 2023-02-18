import * as React from "react";
import { Box, ChakraProvider } from "@chakra-ui/react";
import Form from "./NewApplicationForm/Form";
import theme from "./lib/theme/theme";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <Form />
    </Box>
  </ChakraProvider>
);
