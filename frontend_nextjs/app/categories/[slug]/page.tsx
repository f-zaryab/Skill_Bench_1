import { Container, SimpleGrid, Title } from "@mantine/core";
import getAllCategories from "@/features/categories/server/get-categories";
import getCategoryBySlug from "@/features/categories/server/get-category-by-slug";
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

  const category = await getCategoryBySlug(slug, {
    include: "testPackages",
  });

  return (
    <Container
      size="responsive"
      bg="customBrown.0"
      className={styles.container}
    >
      <Title order={1} className={styles.title}>
        {category.name}
      </Title>

      <SimpleGrid
        cols={{ base: 1, sm: 2, lg: 3 }}
        spacing={{ base: 10, sm: "xl" }}
        verticalSpacing={{ base: "md", sm: "xl" }}
      >
        {category.testPackages?.map((item) => (
          <div key={item.id}>
            <h1>{item.title}</h1>
            <p>{item.description}</p>
          </div>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default CategoryPage;
