import "@mantine/core";
import type { DefaultMantineColor, MantineColorsTuple } from "@mantine/core";

type ExtendedCustomColors = "customBrown" | DefaultMantineColor;

declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: {
      colors: Record<ExtendedCustomColors, MantineColorsTuple>;
    };
  }
}
