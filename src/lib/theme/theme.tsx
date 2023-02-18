import { extendTheme } from "@chakra-ui/react";
import { FormVariants } from "./components/form";

const theme = extendTheme({
  components: {
    Form: { ...FormVariants },
  },
});

export default theme;
