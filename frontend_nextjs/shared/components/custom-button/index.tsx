"use client";

import { Button, type ButtonProps } from "@mantine/core";
import styles from "./styles.module.css";

type CustomButtonProps = ButtonProps & {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
};

const CustomButton = ({ children, ...props }: CustomButtonProps) => {
  return (
    <Button className={styles.root} {...props}>
      {children}
    </Button>
  );
};

export default CustomButton;
