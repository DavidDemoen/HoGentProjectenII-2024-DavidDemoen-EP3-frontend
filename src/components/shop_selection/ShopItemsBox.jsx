import { ShopSelectionShopItem } from "./ShopSelectionShopItem";

export function ShopItemsBox({ companies }) {
  return (
    <>
      <div className="shopselection-items-box">
        {companies.map((company) => (
          <ShopSelectionShopItem key={company.id} company={company} />
        ))}
      </div>
    </>
  );
}
