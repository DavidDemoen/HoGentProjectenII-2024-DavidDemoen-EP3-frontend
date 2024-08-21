import { useNavbarContext } from "../../context/Navbar.context";
import { useNavigate } from "react-router-dom";
import { useShoppingCartContext } from "../../context/ShoppingCart.context";
import { ShoppingcartSideBoxCartItem } from "./ShoppingcartSideBoxCartItem";

export function ShoppingcartSideBox() {
  const { setShoppingcartSideBoxIsOpen } = useNavbarContext();
  const { cartItems, amountOfItems } = useShoppingCartContext();

  const navigate = useNavigate();

  const handleClickProducts = () => {
    setShoppingcartSideBoxIsOpen(false);
    navigate("/products");
  };

  const handleCartClick = () => {
    setShoppingcartSideBoxIsOpen(false);
    navigate("/shopping-cart");
  };
  const handleClickCheckout = () => {
    setShoppingcartSideBoxIsOpen(false);
    navigate("/checkout");
  };

  if (cartItems.length === 0) {
    return (
      <>
        <div className="sidebox-title">
          <p>Your Shopping Cart is empty for the moment.</p>
        </div>
        <div className="sidebox-buttons-box">
          <button className="sidebox-button" onClick={handleClickProducts}>
            TO PRODUCTS
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="sidebox-title">
        <p>
          {amountOfItems} {amountOfItems === 1 ? "Item" : "Items"} in your
          Shopping Cart
        </p>
      </div>
      <div className="sidebox-body">
        {cartItems.map((item, index) => (
          <ShoppingcartSideBoxCartItem key={index} {...item} />
        ))}
      </div>
      <div className="sidebox-buttons-box">
        <button className="sidebox-button" onClick={handleClickCheckout}>
          TO CHECKOUT
        </button>
        <button className="sidebox-button" onClick={handleCartClick}>
          TO SHOPPING CART
        </button>
      </div>
    </>
  );
}
