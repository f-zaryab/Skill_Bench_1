import { Container, Title } from "@mantine/core";
import getAllCategories from "@/features/categories/server/get-categories";
import styles from "./page.module.css";

export async function generateStaticParams() {
  const categories = await getAllCategories();

  return categories.map((cat) => ({
    slug: cat.slug,
  }));
}

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  return (
    <Container
      size="responsive"
      bg="customBrown.0"
      className={styles.container}
    >
      <Title order={1} className={styles.title}>
        {slug}
      </Title>
    </Container>
  );
};

export default CategoryPage;
