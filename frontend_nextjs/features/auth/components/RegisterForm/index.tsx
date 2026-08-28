"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SimpleGrid, Stack } from "@mantine/core";
import { FormProvider, useForm } from "react-hook-form";
import FormSubmitButton from "@/shared/components/forms/FormSubmitButton";
import {
  FormPasswordField,
  FormTextField,
} from "@/shared/components/forms/fields";
import {
  type RegisterFormValues,
  registerSchema,
} from "../../schemas/register.schema";

const RegisterForm = () => {
  const methods = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    const { confirmPassword: _confirmPassword, ...payload } = values;

    console.log(payload);

    // Later:
    //
    // await kyApiClient
    //   .post("auth/register", {
    //     json: payload,
    //   })
    //   .json();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
        <Stack gap="md">
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <FormTextField<RegisterFormValues>
              name="firstName"
              label="First name"
              placeholder="John"
              autoComplete="given-name"
              withAsterisk
            />

            <FormTextField<RegisterFormValues>
              name="lastName"
              label="Last name"
              placeholder="Doe"
              autoComplete="family-name"
              withAsterisk
            />
          </SimpleGrid>

          <FormTextField<RegisterFormValues>
            name="email"
            type="email"
            label="Email"
            placeholder="you@example.com"
            autoComplete="email"
            withAsterisk
          />

          <FormPasswordField<RegisterFormValues>
            name="password"
            label="Password"
            placeholder="Create a password"
            autoComplete="new-password"
            withAsterisk
          />

          <FormPasswordField<RegisterFormValues>
            name="confirmPassword"
            label="Confirm password"
            placeholder="Confirm your password"
            autoComplete="new-password"
            withAsterisk
          />

          <FormSubmitButton fullWidth mt="sm">
            Create account
          </FormSubmitButton>
        </Stack>
      </form>
    </FormProvider>
  );
};

export default RegisterForm;
