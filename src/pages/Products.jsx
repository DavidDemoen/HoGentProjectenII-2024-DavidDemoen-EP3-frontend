import { ProductsMainBox } from "../components/products/ProductsMainBox";
import { ProductsAPIContextProvider } from "../context/Products.API.context";
import { ManufacturersAPIContextProvider } from "../context/Manufacturers.API.context";
import { ProductPagesContextProvider } from "../context/ProductPages.context";
import { useAccountsContext } from "../context/Accounts.context";
import { useNavigate } from "react-router";
import "../../styles/products_styles.css";

export function Products() {
  const { shopCompany } = useAccountsContext();

  const navigate = useNavigate();
  const handleClickShop = () => {
    navigate("/shopselection");
  };

  if (!shopCompany) {
    return (
      <>
        <p>
          No shop selected.{" "}
          <span onClick={handleClickShop}>Choose a Shop!</span>
        </p>
      </>
    );
  }

  return (
    <>
      <ProductPagesContextProvider>
        <ProductsAPIContextProvider>
          <ManufacturersAPIContextProvider>
            <ProductsMainBox />
          </ManufacturersAPIContextProvider>
        </ProductsAPIContextProvider>
      </ProductPagesContextProvider>
    </>
  );
}
