import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { FormVariants } from "./components/form";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  components: {
    Form: { ...FormVariants },
  },
  config,
});

export default theme;
