"use client";

import { useEffect } from "react";
import { kyApiClient } from "@/shared/api/ky/ky-client";
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
        <h1>Main Page</h1>
      </main>
    </div>
  );
}
