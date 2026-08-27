import { Container, SimpleGrid, Title } from "@mantine/core";
import Link from "next/link";
import { getCategoriesAndPackages } from "@/features/categories/server/get-categories-packages";
import TestCards from "@/features/test-packages/components";
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
        cols={{ base: 1, sm: 1, lg: 2 }}
        spacing={{ base: 10, sm: "xl" }}
        verticalSpacing={{ base: "md", sm: "xl" }}
      >
        {categories_packages?.map((item) => (
          <div key={item.id}>
            <Title order={2} className={styles.title}>
              {item.name}
            </Title>

            <div>
              <SimpleGrid
                cols={{ base: 1, sm: 2, lg: 2 }}
                spacing={{ base: 10, sm: "xs" }}
                verticalSpacing={{ base: "xs", sm: "xs" }}
              >
                {item.testPackages.slice(0, 3).map((tp) => (
                  <TestCards
                    key={tp.id}
                    title={tp.title}
                    shortDescription={tp.shortDescription}
                    slug={tp.slug}
                    id={""}
                    testDuratiion={tp.durationMinutes}
                    passingPercentage={tp.passingPercentage}
                    expAwardPoint={tp.expReward}
                  />
                ))}
              </SimpleGrid>
            </div>

            <div>
              <Link href={`/tests/${item.slug}`}>More tests</Link>
            </div>
          </div>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default SkillUpPage;
