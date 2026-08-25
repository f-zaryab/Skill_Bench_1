import { Card, Divider, Text, Title } from "@mantine/core";
import Link from "next/link";
import styles from "./styles.module.css";

type CategoriesCardProps = {
  title: string;
  description: string;
  slug: string;
};

const CategoriesCard = ({ title, description, slug }: CategoriesCardProps) => {
  return (
    <Link href={`/categories/${slug}`} className={styles.card_anchor}>
      <Card
        shadow="lg"
        padding="lg"
        withBorder
        className={styles.card_container}
      >
        <Title order={2}>{title}</Title>
        <Divider my="md" />
        <Text>{description}</Text>
      </Card>
    </Link>
  );
};

export default CategoriesCard;
