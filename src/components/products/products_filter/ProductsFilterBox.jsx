import { useProductPagesContext } from "../../../context/ProductPages.context";
import { useProductsAPIContext } from "../../../context/Products.API.context";
import { useProductCategoriesAPIContext } from "../../../context/ProductCategories.API.context";
import { useManufacturersAPIContext } from "../../../context/Manufacturers.API.context";
import { GeneralFilterBox } from "../../ui_element/filter_box/GeneralFilterBox";
import { useState } from "react";
// import { ProductsFilterItem } from "./ProductsFilterItem";

export function ProductsFilterBox(productsCount) {
  const [processedCategories, setProcessedCategories] = useState([]);

  const {
    productsDATA: { products },
  } = useProductsAPIContext();
  const {
    productCategoriesDATA: { categories },
  } = useProductCategoriesAPIContext();

  const {
    manufacturersDATA: { manufacturers },
  } = useManufacturersAPIContext();

  const {
    handleProductsFilterClick,
    generateFilterOverview,
    catFilterIsOpen,
    brandFilterIsOpen,
    availabilityFilterIsOpen,
  } = useProductPagesContext();

  const processCategories = () => {
    return categories.map((category) => {
      return {
        id: category.referenceId,
        ...category,
      };
    });
  };
  const getItemsFilterOverview = () => {
    if (catFilterIsOpen) {
      return processCategories();
    }
    if (brandFilterIsOpen) {
      return manufacturers;
    }
    if (availabilityFilterIsOpen) {
      return [{ name: "To be implemented" }];
    }
    return null;
  };

  return (
    <>
      <div className="products-filter-box">
        <div className="products-filter-header-box">
          <div className="products-filter-title">
            <p>Filter products:</p>
          </div>
          <div className="products-filter-item-box">
            {/* <ProductsFilterItem name="Category" />
          <ProductsFilterItem name="Brand" /> */}
            <GeneralFilterBox
              type="category"
              name="Category"
              onClick={handleProductsFilterClick}
              category="item-filter"
              isOpen={catFilterIsOpen}
            />
            <GeneralFilterBox
              type="brand"
              name="Brand"
              onClick={handleProductsFilterClick}
              category="item-filter"
              isOpen={brandFilterIsOpen}
            />
            <GeneralFilterBox
              type="availability"
              name="Availability"
              onClick={handleProductsFilterClick}
              category="item-filter"
              isOpen={availabilityFilterIsOpen}
            />
          </div>
          <div>
            <p>{productsCount.productsCount} products</p>
          </div>
        </div>
        <div>{generateFilterOverview(getItemsFilterOverview())}</div>
      </div>
    </>
  );
}
