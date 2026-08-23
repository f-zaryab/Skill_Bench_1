export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  createdByUserId: string;
};

export type CategoriesResponse = {
  success: boolean;
  message: string;
  data: Category[];
};
