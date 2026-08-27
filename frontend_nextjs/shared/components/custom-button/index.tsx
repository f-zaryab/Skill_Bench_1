"use client";

import { Button, type ButtonProps } from "@mantine/core";
import type React from "react";
import styles from "./styles.module.css";

type CustomButtonProps = ButtonProps & {
  children: React.ReactNode;
};

const CustomButton = ({ children, ...props }: CustomButtonProps) => {
  return (
    <Button className={styles.root} {...props}>
      {children}
    </Button>
  );
};

export default CustomButton;
