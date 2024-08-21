import { useNavigate } from "react-router-dom";
import { useProductsAPIContext } from "../../../context/Products.API.context";

export function ProductItem({ name, currentUnitPrice, manufacturer, id }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/details/${id}`);
  };

  return (
    <>
      <div className="product-item-box" onClick={handleClick}>
        <div className="product-item-box-image"></div>
        <div className="product-item-box-body">
          <div className="product-item-box-title">
            <p>{name}</p>
          </div>
          <div className="product-item-content">
            <p>{manufacturer.name}</p>
            <p>€{currentUnitPrice}</p>
          </div>
        </div>
      </div>
    </>
  );
}
