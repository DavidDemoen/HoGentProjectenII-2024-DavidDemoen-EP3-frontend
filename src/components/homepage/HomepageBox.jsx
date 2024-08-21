import { getAll } from "../../api";
import useSWR from "swr";
import AsyncData from "../AsyncData";
import { HomepageHeader } from "./HomepageHeader";
import { HomepageShopReel } from "./HomepageShopReel";
import { HomepageAboutReel } from "./HomepageAboutReel";

export function HomepageBox() {
  const {
    data: shopDATA = { companies: [] },
    error: shopError,
    isLoading: shopIsLoading,
  } = useSWR({ url: "companies/filter/has_shop=true" }, getAll);

  const { companies: shops } = shopDATA;
  const highlightedShop = shops.find((shop) => shop.id == 13);

  return (
    <div className="homepage-box">
      <AsyncData loading={shopIsLoading} error={shopError} type="Homepage data">
        <HomepageHeader shop={highlightedShop} />
        <HomepageShopReel shops={shops} />
        <div className="homepage-vision-box">
            <div className="homepage-vision-body">
                <p className="homepage-vision-text">B2B.io's mission is to drive sustainability in every aspect: economically, relationally, and ecologically.</p>
                <button className="homepage-vision-button">LEARN MORE</button>
            </div>
        </div>
        <HomepageAboutReel />
        <div className="homepage-newsletter-box"></div>
      </AsyncData>
    </div>
  );
}
