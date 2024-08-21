import useSWR from "swr";
import { ProductsDashboardList } from "./ProductsDashboardList";
import { useNavigate } from "react-router";
import { getAll } from "../../../api";
import { useAccountsContext } from "../../../context/Accounts.context";
import AsyncData from "../../AsyncData";
import { useAdminDashboardContext } from "../../../context/AdminDashboard.context";
import { ProductDetailsBox } from "./product_details/ProductDetailsBox";

export function ProductsDashboardBox() {
  const { loggedInAccount } = useAccountsContext();
  const { productDetailId, setProductDetailId } = useAdminDashboardContext();

  const {
    data: shopProductsDATA = { products: [] },
    error: shopProductsError,
    isLoading: shopProductsIsLoading,
  } = useSWR(
    { url: `companies/${loggedInAccount.companyId}/products` },
    getAll
  );
  const { products } = shopProductsDATA;

  const handleAddClick = () => {
    setProductDetailId("new");
  };

  if (productDetailId) {
    return (
      <ProductDetailsBox
        productId={productDetailId}
        companyId={loggedInAccount.companyId}
      />
    );
  }

  return (
    <>
      <div className="dashboard-main-container">
        <div className="pendingorders-list-title">Current Products</div>
        <button onClick={handleAddClick}>Add New Product</button>
        <AsyncData
          loading={shopProductsIsLoading}
          error={shopProductsError}
          type="Products Data"
        >
          <ProductsDashboardList
            products={products}
            companyId={loggedInAccount.companyId}
          />
        </AsyncData>
      </div>
    </>
  );
}
