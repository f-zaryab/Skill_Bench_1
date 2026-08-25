import { Container, SimpleGrid, Title } from "@mantine/core";
import { getCategoriesAndPackages } from "@/features/categories/server/get-categories-packages";
import styles from "./page.module.css";

const SkillUpPage = async () => {
  const categories_packages = await getCategoriesAndPackages();

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
        cols={{ base: 1, sm: 1, lg: 1 }}
        spacing={{ base: 10, sm: "xl" }}
        verticalSpacing={{ base: "md", sm: "xl" }}
      >
        {categories_packages?.map((item) => (
          <div key={item.id}>
            <Title order={2} className={styles.title}>
              {item.name}
            </Title>

            <SimpleGrid
              cols={{ base: 1, sm: 1, lg: 1 }}
              spacing={{ base: 10, sm: "xl" }}
              verticalSpacing={{ base: "md", sm: "xl" }}
            >
              {item.testPackages.map((tp) => (
                <div key={tp.id}>
                  <p>{tp.title}</p>
                </div>
              ))}
            </SimpleGrid>
          </div>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default SkillUpPage;
