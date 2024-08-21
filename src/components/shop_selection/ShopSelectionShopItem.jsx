import { useNavigate } from "react-router-dom";
import { useAccountsContext } from "../../context/Accounts.context";

export function ShopSelectionShopItem({ company }) {
  const { setShopCompany } = useAccountsContext();

  const navigate = useNavigate();

  const handleClickShop = () => {
    setShopCompany(company.id);
    navigate("/products");
  };
  return (
    <>
      <div className="shopselection-shop-item">
        <div className="shopselection-shop-item-img"></div>
        <div className="shopselection-shop-item-body">
          <p>{company.name}</p>
          <p
            className="shopselection-shop-item-selection"
            onClick={handleClickShop}
          >
            Select this shop
          </p>
        </div>
      </div>
    </>
  );
}
