import { useAdminDashboardContext } from "../../../../context/AdminDashboard.context";
import useSWR from "swr";
import { getById } from "../../../../api";
import AsyncData from "../../../AsyncData";
import { CategoryDetailsForm } from "./CategoryDetailsForm";

const emptyCategory = {
  referenceId: "",
  name: "",
  description: "",
};

export function CategoryDetailsBox() {
  const { setCategoryDetailId, categoryDetailId } = useAdminDashboardContext();

  const {
    data: categoryDATA = { category: emptyCategory },
    error: categoryError,
    isLoading: categoryIsLoading,
  } = useSWR(
    categoryDetailId != "new"
      ? { url: `productcategories/${categoryDetailId}` }
      : null,
    getById
  );
  const { category } = categoryDATA;

  const handleClickBackToCategories = () => {
    setCategoryDetailId(null);
  };

  return (
    <>
      <div className="dashboard-main-container">
        <AsyncData
          loading={categoryIsLoading}
          error={categoryError}
          type="Category data"
        >
          <div className="dashboard-main-header">
            <div className="dashboard-main-title">
              {categoryDetailId != "new" ? (
                <>Details Category {category.referenceId}</>
              ) : (
                <>Add Category</>
              )}
            </div>
            <p onClick={handleClickBackToCategories}>Back to Categories</p>
          </div>
          <CategoryDetailsForm {...category} />
        </AsyncData>
      </div>
    </>
  );
}
