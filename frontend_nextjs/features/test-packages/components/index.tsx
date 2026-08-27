import { Card, Divider, Flex, Text, Title } from "@mantine/core";
import Link from "next/link";
import styles from "./styles.module.css";

type TestCardProps = {
  id: string;
  title: string;
  description?: string;
  shortDescription: string;
  slug: string;
  testDuratiion: number;
  passingPercentage: number;
  expAwardPoint: number;
};

const TestCards = ({
  title,
  slug,
  testDuratiion,
  expAwardPoint,
  passingPercentage,
  shortDescription,
}: TestCardProps) => {
  return (
    <Link href={`/tests-packages/${slug}`} className={styles.card_anchor}>
      <Card
        shadow="lg"
        padding="lg"
        withBorder
        className={styles.card_container}
      >
        <Title order={2}>{title}</Title>
        <Divider my="md" />
        <Text>{shortDescription}</Text>
        <Divider my="md" />
        <Flex
          mih={50}
          gap="md"
          justify="flex-start"
          align="flex-start"
          direction="row"
          wrap="wrap"
        >
          <Text>{testDuratiion} min</Text>
          <Text>{expAwardPoint} points</Text>
          <Text>{passingPercentage}%</Text>
        </Flex>
      </Card>
    </Link>
  );
};

export default TestCards;
