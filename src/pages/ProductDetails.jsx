import { useParams } from "react-router-dom";
import { useProductsAPIContext } from "../context/Products.API.context";
import { useEffect } from "react";
import AsyncData from "../components/AsyncData";
import { ProductDetailsBox } from "../components/products/product_details/ProductDetailsBox";
import "../../styles/productDetails_styles.css";

export function ProductDetails() {
  const { id } = useParams();
  const {
    setSelectedProductId,
    selectedProductDATA: { product },
    selectedProductError,
    selectedProductIsLoading,
  } = useProductsAPIContext();

  useEffect(() => {
    setSelectedProductId(id);
  }, [id, setSelectedProductId]);

  console.log(product);

  return (
    <>
      <AsyncData
        loading={selectedProductIsLoading}
        error={selectedProductError}
        type="Product details"
      >
        <ProductDetailsBox product={product} />
      </AsyncData>
    </>
  );
}
