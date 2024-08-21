import { useShoppingCartContext } from "../../context/ShoppingCart.context";
import { ShoppingCartItem } from "./ShoppingCartItem";

export function ShoppingCartItemsBox() {
  const { cartItems } = useShoppingCartContext();

  const renderCartItems = () => {
    return cartItems.map((item) => {
      return <ShoppingCartItem key={item.product.id} {...item} />;
    });
  };

  return (
    <>
      <div className="cart-items-box">
        {cartItems.length === 0 ? <p>Your cart is empty</p> : renderCartItems()}
      </div>
    </>
  );
}
