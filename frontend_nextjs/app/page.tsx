"use client";

import { useEffect } from "react";
import { kyApiClient } from "@/shared/api/ky/ky-client";
import CustomButton from "@/shared/components/custom-button";
import styles from "./page.module.css";

export default function Home() {
  useEffect(() => {
    const getCategories = async () => {
      const categories = await kyApiClient.get("categories").json();

      console.log("categories >>", categories);
    };

    getCategories();
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 style={{ marginTop: "2rem", color: "red" }}>Main Page</h1>

        <CustomButton>Sample Button</CustomButton>

        <CustomButton variant="primary">Primary-Btn</CustomButton>
        <CustomButton variant="secondary">Secondary-Btn</CustomButton>
        <CustomButton variant="tertiary">Tertiary-Btn</CustomButton>
        <CustomButton variant="plain">Plain-Btn</CustomButton>
      </main>
    </div>
  );
}
