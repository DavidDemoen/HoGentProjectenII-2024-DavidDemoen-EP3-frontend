import { GenericDynamicContentBox } from "../ui_element/content_box/GenericDynamicContentBox";
import { useShoppingCartContext } from "../../context/ShoppingCart.context";
import { CheckoutCartItem } from "./summary/CheckoutCartItem";

export function CheckoutCartOverviewBox() {
  const { cartItems, shoppingCartTotal } = useShoppingCartContext();


  const renderCartItems = () => {
    return cartItems.map((item, index) => {
      return <CheckoutCartItem key={index} {...item} />;
    });
  };

  return (
    <>
      <div className="checkout-summary-overview">
        <div className="checkout-summary-cart">
          <GenericDynamicContentBox
            header="Order Items"
            renderFunction={renderCartItems}
          />
        </div>
        <div className="checkout-summary-total">
          <p>To pay:</p>
          <p>EUR {shoppingCartTotal}</p>
        </div>
      </div>
    </>
  );
}
