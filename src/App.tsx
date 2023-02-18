import * as React from "react";
import { Box, ChakraProvider } from "@chakra-ui/react";
import { NewApplicationForm } from "./NewApplicationForm";
import theme from "./lib/theme/theme";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <NewApplicationForm />
    </Box>
  </ChakraProvider>
);
