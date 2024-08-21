import { removeSpaces } from "../../utils/Formatter";
import { useAccountsContext } from "../../context/Accounts.context";
import { useNavigate } from "react-router-dom";

export function HomepageReelItem({ item }) {
  const formattedName = removeSpaces(item.name);
  const image = `/assets/imgs/homepage/${formattedName}Img.png`;

  const { setShopCompany } = useAccountsContext();

  const navigate = useNavigate();

  const handleClickItem = () => {
    setShopCompany(item.id);
    navigate("/products");
  };

  return (
    <>
      <div className="homepage-reelitem-container" onClick={handleClickItem}>
        <div className="homepage-reelitem-image-container">
          <img src={image} alt="" className="homepage-reelitem-img" />
        </div>
        <div className="homepage-reelitem-info-container">
          <p className="homepage-reelitem-title">{item.name}</p>
          <p className="homepage-reelitem-tagline">{item.tagline}</p>
        </div>
      </div>
    </>
  );
}
