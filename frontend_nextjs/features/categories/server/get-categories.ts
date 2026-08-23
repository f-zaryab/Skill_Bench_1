"use server";

import { kyApiClient } from "@/shared/api/ky/ky-client";
import type { CategoriesResponse, Category } from "../types";

const getAllCategories = async (): Promise<Category[]> => {
  const response = await kyApiClient
    .get("categories")
    .json<CategoriesResponse>();
  return response.data;
};

export default getAllCategories;
