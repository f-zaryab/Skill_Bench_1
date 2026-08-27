import { createTheme } from "@mantine/core";
import { customColors } from "./colors";
import { ButtonTheme } from "./components/button/button.theme";

const theme = createTheme({
  /** Your theme override here */

  fontFamily: "var(--font-commissioner), sans-serif",

  colors: customColors,

  // Custom Variants for UI Elements
  components: {
    Button: ButtonTheme,
    // Keep adding more
  },

  headings: {
    fontFamily: "var(--font-commissioner), sans-serif",
    sizes: {
      h1: { fontSize: "36px" },
    },
  },
});

export default theme;
