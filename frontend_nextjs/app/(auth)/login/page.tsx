import LoginForm from "@/features/auth/components/LoginForm";
import AuthPageWrapper from "@/features/auth/layout/AuthPageWrapper";

const LoginPage = () => {
  return (
    <AuthPageWrapper title="Login">
      <LoginForm />
    </AuthPageWrapper>
  );
};

export default LoginPage;
