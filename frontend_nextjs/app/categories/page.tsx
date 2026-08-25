import { Container, SimpleGrid, Title } from "@mantine/core";
import CategoriesCard from "@/features/categories/components/categories-card";
import getAllCategories from "@/features/categories/server/get-categories";
import styles from "./page.module.css";

const CategoriesPage = async () => {
  const categories = await getAllCategories();

  return (
    <Container
      size="responsive"
      bg="customBrown.0"
      className={styles.container}
    >
      <Title order={1} className={styles.title}>
        Categories
      </Title>

      <SimpleGrid
        cols={{ base: 1, sm: 2, lg: 3 }}
        spacing={{ base: 10, sm: "xl" }}
        verticalSpacing={{ base: "md", sm: "xl" }}
      >
        {categories?.map((item) => (
          <CategoriesCard
            key={item.id}
            title={item.name}
            description={item.description}
            slug={item.slug}
          />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default CategoriesPage;
