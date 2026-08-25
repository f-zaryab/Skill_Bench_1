import { createTheme } from "@mantine/core";
import { customColors } from "./colors";

const theme = createTheme({
  /** Your theme override here */

  fontFamily: "var(--font-commissioner), sans-serif",

  colors: customColors,

  headings: {
    fontFamily: "var(--font-commissioner), sans-serif",
    sizes: {
      h1: { fontSize: "36px" },
    },
  },
});

export default theme;
