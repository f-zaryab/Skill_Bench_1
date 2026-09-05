export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  createdByUserId: string;
};

export type TestPackage = {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  durationMinutes: number;
  passingPercentage: number;
  expReward: number;
  createdAt: string;
  updatedAt: string;
  categoryId: string;
  createdByUserId: string;
  slug: string;
};

export type CategoriesResponse = {
  success: boolean;
  message: string;
  data: Category[];
};

// Categories along with associated Packages
export type CategoriesAndPackagesResponse = {
  success: boolean;
  message: string;
  data: CategoryAndPackages[];
};

export type CategoryAndPackages = {
  id: string;
  name: string;
  slug: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  createdByUserId: string;
  testPackages: TestPackage[];
};

// Fetching Category By Slug
export type CategoryBySlugResponse = {
  success: boolean;
  message: string;
  data: DataCategory;
};

export interface DataCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  createdByUserId: string;
  testPackages?: TestPackage[];
}
