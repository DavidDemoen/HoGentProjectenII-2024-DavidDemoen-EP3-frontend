import image from "../../assets/homepage/HarmonicRiftImg.png";
import { useAccountsContext } from "../../context/Accounts.context";
import { useNavigate } from "react-router-dom";

export function HomepageHeader({ shop }) {
  const { setShopCompany } = useAccountsContext();

  const navigate = useNavigate();

  const handleClickDiscover = () => {
    setShopCompany(shop.id);
    navigate("/products");
  };
  return (
    <>
      <div className="homepage-header-container">
        <img
          src={image}
          alt="homepage-header-img"
          className="homepage-header-img"
        />
        <h1 className="homepage-header-title">{shop.name}</h1>
        <div className="homepage-header-overlay">
          <p className="homepage-header-description">{shop.tagline}</p>
          <button
            className="homepage-header-button-discover"
            onClick={handleClickDiscover}
          >
            Discover
          </button>
        </div>
      </div>
    </>
  );
}
