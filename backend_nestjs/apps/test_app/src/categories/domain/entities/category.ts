export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  createdByUserId: string;
  createdAt: Date;
  updatedAt: Date;
};
