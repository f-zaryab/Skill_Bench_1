"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "@mantine/core";
import { FormProvider, useForm } from "react-hook-form";
import FormSubmitButton from "@/shared/components/forms/FormSubmitButton";
import {
  FormPasswordField,
  FormTextField,
} from "@/shared/components/forms/fields";
import { type LoginFormValues, loginSchema } from "../../schemas/login.schema";

const LoginForm = () => {
  const methods = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    console.log(values);

    // Later:
    //
    // await kyApiClient
    //   .post("auth/login", {
    //     json: values,
    //   })
    //   .json();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
        <Stack gap="md">
          <FormTextField<LoginFormValues>
            name="email"
            type="email"
            label="Email"
            placeholder="you@example.com"
            autoComplete="email"
            withAsterisk
          />

          <FormPasswordField<LoginFormValues>
            name="password"
            label="Password"
            placeholder="Enter your password"
            autoComplete="current-password"
            withAsterisk
          />

          <FormSubmitButton fullWidth mt="sm">
            Login
          </FormSubmitButton>
        </Stack>
      </form>
    </FormProvider>
  );
};

export default LoginForm;
