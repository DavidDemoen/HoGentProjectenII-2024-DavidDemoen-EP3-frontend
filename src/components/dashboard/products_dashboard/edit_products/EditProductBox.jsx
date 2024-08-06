import { useParams } from "react-router";
import { useProductsAPIContext } from "../../../../context/Products.API.context";
import AsyncData from "../../../AsyncData";
import { EditProductForm } from "./EditProductForm";
import { useEffect } from "react";
import { ManufacturersAPIContextProvider } from "../../../../context/Manufacturers.API.context";
import { ProductCategoriesAPIContextProvider } from "../../../../context/ProductCategories.API.context";

export function EditProductBox() {
  const {
    selectedProductDATA,
    selectedProductError,
    selectedProductIsLoading,
    selectedProductId,
    setSelectedProductId,
  } = useProductsAPIContext();

  //console.log(selectedProductDATA);

  const { id } = useParams();
  useEffect(() => {
    setSelectedProductId(id);
  }, [id]);

  const { product } = selectedProductDATA;

  return (
    <>
      <AsyncData
        loading={selectedProductIsLoading}
        error={selectedProductError}
        type={"product"}
      >
        <div>
          <h1>{`EDIT_PRODUCT_${selectedProductId}_PLACEHOLDER`}</h1>
        </div>
        <div className="edit-product-box">
          <div className="edit-product-box-header">
            <p>Edit product</p>
          </div>
          <div className="edit-product-form">
            <ManufacturersAPIContextProvider>
              <ProductCategoriesAPIContextProvider>
                {/* <EditProductForm product={product} /> */}
                <EditProductForm type={"edit"} product={product} />
              </ProductCategoriesAPIContextProvider>
            </ManufacturersAPIContextProvider>
          </div>
        </div>
      </AsyncData>
    </>
  );
}
