import { kyApiClient } from "@/shared/api/ky/ky-client";
import type { CategoriesAndPackagesResponse } from "../types";

export const getCategoriesAndPackages = async () => {
  const response = await kyApiClient
    .get("categories?include=testPackages")
    .json<CategoriesAndPackagesResponse>();

  return response.data;
};
