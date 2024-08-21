import AsyncData from "../../AsyncData";
import { useAdminDashboardContext } from "../../../context/AdminDashboard.context";
import useSWR from "swr";
import { getAll } from "../../../api";
import { CategoryDetailsBox } from "./category_details/CategoryDetailsBox";
import { CategoriesList } from "./CategoriesList";

export function CategoriesDashboardBox() {
  const { categoryDetailId, setCategoryDetailId } = useAdminDashboardContext();

  const {
    data: productCategoriesDATA = { categories: [] },
    error: productCategoriesError,
    isLoading: productCategoriesIsLoading,
  } = useSWR({ url: `productcategories` }, getAll);
  const { categories } = productCategoriesDATA;

  const handleAddClick = () => {
    setCategoryDetailId("new");
  };

  if (categoryDetailId) {
    return <CategoryDetailsBox />;
  }

  return (
    <>
      <AsyncData
        loading={productCategoriesIsLoading}
        error={productCategoriesError}
        type="Category data"
      >
        <div className="dashboard-main-container">
          <div className="dashboard-main-title">Product Categories</div>
          <button onClick={handleAddClick}>Add New Category</button>
          <CategoriesList categories={categories} />
        </div>
      </AsyncData>
    </>
  );
}
