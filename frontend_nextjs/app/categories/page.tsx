import getAllCategories from "@/features/categories/server/get-categories";

const CategoriesPage = async () => {
  const categories = await getAllCategories();

  return (
    <div>
      <h1>All Categories Page</h1>

      <div>
        {categories?.map((item) => (
          <div key={item.id}>
            <p>{item.name}</p>
            <p>{item.slug}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
