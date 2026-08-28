import { SimpleGrid, Title } from "@mantine/core";

type AuthPageWrapperProps = {
  children: React.ReactNode;
  title: string;
};

const AuthPageWrapper = ({ children, title }: AuthPageWrapperProps) => {
  return (
    <SimpleGrid
      cols={{ base: 1, sm: 1, lg: 1 }}
      spacing={{ base: 10, sm: "md" }}
      verticalSpacing={{ base: "md", sm: "lg" }}
    >
      <div>
        <Title order={1}>{title}</Title>
      </div>
      <div>{children}</div>
    </SimpleGrid>
  );
};

export default AuthPageWrapper;
