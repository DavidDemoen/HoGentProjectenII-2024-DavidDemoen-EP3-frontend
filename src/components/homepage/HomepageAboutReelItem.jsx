import { useNavigate } from "react-router-dom";

export function HomepageAboutReelItem({
  title,
  description,
  imageName,
  navigateURL,
}) {
  const image = `/assets/imgs/homepage/${imageName}Img.png`;

  const navigate = useNavigate();

  const handleClickItem = () => {
    navigate(navigateURL);
  };

  return (
    <>
      <div className="homepage-reelitem-container" onClick={handleClickItem}>
        <div className="homepage-reelitem-image-container">
          <img src={image} alt="" className="homepage-reelitem-img" />
        </div>
        <div className="homepage-reelitem-info-container">
          <p className="homepage-reelitem-title">{title}</p>
          <p className="homepage-reelitem-tagline">{description}</p>
        </div>
      </div>
    </>
  );
}
