"use client";

import { TextInput, type TextInputProps } from "@mantine/core";
import {
  Controller,
  type FieldValues,
  type Path,
  useFormContext,
} from "react-hook-form";

type FormTextFieldProps<T extends FieldValues> = Omit<
  TextInputProps,
  "name" | "error"
> & {
  name: Path<T>;
};

const FormTextField = <T extends FieldValues>({
  name,
  ...props
}: FormTextFieldProps<T>) => {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextInput {...field} {...props} error={fieldState.error?.message} />
      )}
    />
  );
};

export default FormTextField;

/* 
USAGE:

<FormTextField name="firstName" />
<FormTextField name="lastName" />
<FormTextField name="email" type="email" />

*/
