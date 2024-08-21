import useSWR from "swr";
import { ShopItemsBox } from "./ShopItemsBox";
import { getAll } from "../../api/index";
import AsyncData from "../AsyncData";

export function ShopSelectionBox() {
  const {
    data: companiesDATA = { companies: [] },
    error: companiesWithShopError,
    isLoading: companiesWithShopIsLoading,
  } = useSWR({ url: "/companies/filter/has_shop=true" }, getAll);

  const { companies } = companiesDATA;

  console.log(companies);
  return (
    <>
      <AsyncData
        loading={companiesWithShopIsLoading}
        error={companiesWithShopError}
        type="Shop data"
      >
        <div className="shopselection-box">
          <div className="shopselection-header">
            <p>Shop Selection</p>
          </div>
          <ShopItemsBox companies={companies} />
        </div>
      </AsyncData>
    </>
  );
}
