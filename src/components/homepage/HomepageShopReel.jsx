import { HomepageReelItem } from "./HomepageReelItem";

export function HomepageShopReel({ shops }) {
  return (
    <>
      <div className="homepage-shop-reel-container">
        {
            shops.map((shop, index) => (
                <HomepageReelItem  key={index} item={shop}/>
            ))
        }
      </div>
    </>
  );
}
