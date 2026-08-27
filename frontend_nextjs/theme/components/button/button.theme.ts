"use client";

import { Button } from "@mantine/core";
import classes from "./styles.module.css";

export const ButtonTheme = Button.extend({
  classNames: {
    root: classes.root,
  },
});
