import { ProductCategoriesAPIContextProvider } from "../../../../context/ProductCategories.API.context";
import { AddCategoryForm } from "./AddCategoryForm";

export function AddCategoryBox() {
  return (
    <>
      <div>
        <p>Categories</p>

        <AddCategoryForm />
      </div>
    </>
  );
}
