"use client";

import { Checkbox, type CheckboxProps } from "@mantine/core";
import {
  Controller,
  type FieldValues,
  type Path,
  useFormContext,
} from "react-hook-form";

type FormCheckboxProps<T extends FieldValues> = Omit<
  CheckboxProps,
  "name" | "checked" | "error"
> & {
  name: Path<T>;
};

const FormCheckBox = <T extends FieldValues>({
  name,
  ...props
}: FormCheckboxProps<T>) => {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Checkbox
          {...props}
          name={field.name}
          checked={field.value}
          onChange={(event) => field.onChange(event.currentTarget.checked)}
          onBlur={field.onBlur}
          error={fieldState.error?.message}
        />
      )}
    />
  );
};

export default FormCheckBox;
