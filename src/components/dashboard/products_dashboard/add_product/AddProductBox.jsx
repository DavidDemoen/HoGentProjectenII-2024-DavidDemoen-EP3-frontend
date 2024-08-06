import AsyncData from "../../../AsyncData";
import { ManufacturersAPIContextProvider } from "../../../../context/Manufacturers.API.context";
import { ProductCategoriesAPIContextProvider } from "../../../../context/ProductCategories.API.context";
import { AddProductForm } from "./AddProductForm";
import { GenericProductForm } from "../GenericProductForm";

export function AddProductBox() {
  return (
    <>
      <AsyncData>
        <div>
          <h1>ADD_PRODUCT_PLACEHOLDER</h1>
        </div>
        <div>
          <div>
            <p>Add Product</p>
          </div>
          <div>
            <ManufacturersAPIContextProvider>
              <ProductCategoriesAPIContextProvider>
                <GenericProductForm type="add"/>
              </ProductCategoriesAPIContextProvider>
            </ManufacturersAPIContextProvider>
          </div>
        </div>
      </AsyncData>
    </>
  );
}
