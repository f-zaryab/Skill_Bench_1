import RegisterForm from "@/features/auth/components/RegisterForm";
import AuthPageWrapper from "@/features/auth/layout/AuthPageWrapper";

const RegisterPage = () => {
  return (
    <AuthPageWrapper title="Register">
      <RegisterForm />
    </AuthPageWrapper>
  );
};

export default RegisterPage;
