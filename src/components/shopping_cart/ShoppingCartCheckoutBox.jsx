import { useShoppingCartContext } from "../../context/ShoppingCart.context";
import { useNavigate } from "react-router-dom";

export function ShoppingCartCheckoutBox() {
  const { shoppingCartTotal } = useShoppingCartContext();
  const navigate = useNavigate();
  const handleCheckoutClick = () => {
    navigate("/checkout");
  };

  return (
    <>
      <div className="cart-checkout-box">
        <div className="cart-checkout-account">
          <div className="cart-checkout-account-item">
            <p>Subtotal</p>
            <p>{shoppingCartTotal}</p>
          </div>
          <div className="cart-checkout-account-item">
            <p>Shipping</p>
            <p>Free</p>
          </div>
          <div className="cart-checkout-account-item cart-checkout-total">
            <p>Total</p>
            <p>{shoppingCartTotal}</p>
          </div>
        </div>
        <div className="cart-checkout-button-box">
          <button onClick={handleCheckoutClick}>Checkout</button>
        </div>
      </div>
    </>
  );
}
