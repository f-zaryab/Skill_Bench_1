"use client";

import { PasswordInput, type PasswordInputProps } from "@mantine/core";
import {
  Controller,
  type FieldValues,
  type Path,
  useFormContext,
} from "react-hook-form";

type FormPasswordFieldProps<T extends FieldValues> = Omit<
  PasswordInputProps,
  "name" | "error"
> & {
  name: Path<T>;
};

const FormPasswordField = <T extends FieldValues>({
  name,
  ...props
}: FormPasswordFieldProps<T>) => {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <PasswordInput
          {...field}
          {...props}
          error={fieldState.error?.message}
        />
      )}
    />
  );
};

export default FormPasswordField;
