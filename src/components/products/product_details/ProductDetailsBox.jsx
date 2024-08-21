import { useShoppingCartContext } from "../../../context/ShoppingCart.context";

export function ProductDetailsBox({ product }) {
  const { addProductToCart } = useShoppingCartContext();
  const { Manufacturer } = product;
  const handleClick = () => {
    console.log("add to cart");
    addProductToCart(product);
  };

  return (
    <>
      <div className="product-details-box">
        <div className="product-details-box-img">placeholder</div>
        <div className="product-details-box-info">
          <div className="product-details-box-info-title">{product.name}</div>
          <p className="product-details-box-info-manufacturer">
            {Manufacturer.name}
          </p>
          <p className="product-details-box-info-description">
            {product.description}
          </p>
          <div className="product-details-box-footer">
            <p className="product-details-box-price">
              EUR {product.currentUnitPrice}
            </p>
            <button
              className="product-details-box-button"
              onClick={handleClick}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
