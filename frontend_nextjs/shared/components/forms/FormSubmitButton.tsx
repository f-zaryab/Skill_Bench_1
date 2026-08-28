import type { ButtonProps } from "@mantine/core";
import { useFormContext } from "react-hook-form";
import CustomButton from "../custom-button";

type FormSubmitButtonProps = ButtonProps & {
  children: React.ReactNode;
};

const FormSubmitButton = ({ children, ...props }: FormSubmitButtonProps) => {
  const {
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <CustomButton
      variant="default"
      type="submit"
      loading={isSubmitting}
      {...props}
    >
      {children}
    </CustomButton>
  );
};

export default FormSubmitButton;
