import { TableGeneral } from "../../ui_element/table/TableGeneral";
import { AddCategoryBox } from "./add_category/AddCategoryBox";
import { useProductCategoriesAPIContext } from "../../../context/ProductCategories.API.context";
import AsyncData from "../../AsyncData";
import { useEffect, useState } from "react";
import { useAdminDashboardContext } from "../../../context/AdminDashboard.context";
import { GenericCategoryForm } from "./GenericCategoryForm";

const tableHeader = ["Category Name", "Category ID", "Discription"];
const tableKeys = ["name", "referenceId", "description"];

export function CategoriesDashboardBox() {
  const {
    productCategoriesDATA,
    productCategoriesError,
    productCategoriesIsLoading,
    handleDeleteProductCategory,
    setSelectedProductCategoryId,
    selectedProductCategoryDATA,
    selectedProductCategoryError,
    selectedProductCategoryIsLoading,
  } = useProductCategoriesAPIContext();
  const { setCategoriesMainBox, categoriesMainBox } =
    useAdminDashboardContext();
  const [processedCategories, setProcessedCategories] = useState([]);

  const handleClickEditCategories = (referenceId) => {
    setCategoriesMainBox("edit");
    setSelectedProductCategoryId(referenceId);
  };

  const buttons = [
    {
      name: "Delete",
      onClick: handleDeleteProductCategory,
      disabled: categoriesMainBox === "edit",
    },
    {
      name: "Edit",
      onClick: handleClickEditCategories,
      disabled: categoriesMainBox === "edit",
    },
  ];
  const { category } = selectedProductCategoryDATA;

  useEffect(() => {
    if (productCategoriesDATA && productCategoriesDATA.categories) {
      const updatedCategories = productCategoriesDATA.categories.map(
        (category) => ({
          ...category,
          id: category.referenceId, // Rename referenceId to id
        })
      );
      setProcessedCategories(updatedCategories);
    }
  }, [productCategoriesDATA]);
  useEffect(() => {
    setCategoriesMainBox("add");
  }, []);

  const renderMainBox = () => {
    switch (categoriesMainBox) {
      case "add":
        return <GenericCategoryForm type="add" />;
      case "edit":
        return (
          <AsyncData
            loading={selectedProductCategoryIsLoading}
            error={selectedProductCategoryError}
            type="productcategory"
          >
            <GenericCategoryForm type="edit" category={category} />
          </AsyncData>
        );
    }
  };

  return (
    <>
      <div>
        <h1>CATEGORIES-METRICS-PLACEHOLDER</h1>
      </div>
      <div>
        {renderMainBox()}
        <AsyncData
          loading={productCategoriesIsLoading}
          error={productCategoriesError}
          type="Productcategories"
        >
          <TableGeneral
            header={tableHeader}
            data={processedCategories}
            buttons={buttons}
            tableKeys={tableKeys}
          />
        </AsyncData>
      </div>
    </>
  );
}
