"use server";

import { kyApiClient } from "@/shared/api/ky/ky-client";
import type { CategoryBySlugResponse, DataCategory } from "../types";

type CategoryInclude = "testPackages";

type GetCategoryBySlugOptions = {
  include?: CategoryInclude;
};

const getCategoryBySlug = async (
  slug: string,
  options: GetCategoryBySlugOptions = {},
): Promise<DataCategory> => {
  const response = await kyApiClient
    .get(`categories/slug/${slug}`, {
      searchParams: options.include ? { include: options.include } : undefined,
    })
    .json<CategoryBySlugResponse>();

  return response.data;
};

export default getCategoryBySlug;
