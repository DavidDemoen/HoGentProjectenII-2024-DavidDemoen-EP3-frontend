import { useAdminDashboardContext } from "../../../../context/AdminDashboard.context";
import useSWR from "swr";
import { getById } from "../../../../api";
import { ProductDetailsForm } from "./ProductDetailsForm";
import AsyncData from "../../../AsyncData";

const emptyProduct = {
  id: null,
  name: "",
  referenceId: "",
  currentUnitPrice: "",
  currentProductDiscount: "",
  description: "",
  Manufacturer: { name: "" },
  ProductCategory: { name: "" },
  companyId: "",
  productCategoryId: "",
  manufacturerId: "",
  stock: "",
};

export function ProductDetailsBox({ productId, companyId }) {
  const { setProductDetailId, productDetailId } = useAdminDashboardContext();

  const {
    data: productDetailDATA = { product: emptyProduct },
    error: productDetailError,
    isLoading: productDetailIsLoading,
  } = useSWR(
    productId && productDetailId != "new" ? { url: `products/${productId}` } : null,
    getById
  );
  const { product } = productDetailDATA;
  console.log(product);

  const handleClickBackToProducts = () => {
    setProductDetailId(null);
  };

  return (
    <div className="dashboard-main-container">
      <AsyncData
        loading={productDetailIsLoading}
        error={productDetailError}
        type="Product Data"
      >
        <div className="dashboard-main-header">
          <div className="dashboard-main-title">
            Details Product {product.referenceId}
          </div>
          <p onClick={handleClickBackToProducts}>Back to Products</p>
        </div>
        <ProductDetailsForm {...product} companyId={companyId} />
      </AsyncData>
    </div>
  );
}
