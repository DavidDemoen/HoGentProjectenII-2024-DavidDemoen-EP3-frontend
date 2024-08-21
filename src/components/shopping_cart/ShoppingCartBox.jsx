import { ShoppingCartCheckoutBox } from "./ShoppingCartCheckoutBox";
import { ShoppingCartItemsBox } from "./ShoppingCartItemsBox";

export function ShoppingCartBox() {
  return (
    <>
      <div className="cart-main-box">
        <div className="cart-main-title">
          <p>Your Cart</p>
        </div>
        <div className="cart-main-body">
          <p>The following products are in your shopping cart:</p>
          <div className="cart-main-body-content">
            <ShoppingCartItemsBox />
            <ShoppingCartCheckoutBox />
          </div>
        </div>
      </div>
    </>
  );
}
