import { PiTrashLight } from "react-icons/pi";
import { useShoppingCartContext } from "../../context/ShoppingCart.context";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { AmountSetter } from "../ui_element/amount_setter/AmountSetter";

export function ShoppingCartItem({ product, quantity }) {
  console.log(product);
  const { deleteProductFromCart, addProductQuantity, removeProductQuantity } =
    useShoppingCartContext();

  const handleClickDeleteProduct = () => {
    console.log("delete product");
    deleteProductFromCart(product);
  };
  const handleAddClick = () => {
    console.log("add product");
    addProductQuantity(product);
  };
  const handleRemoveClick = () => {
    console.log("remove product");
    removeProductQuantity(product);
  };

  return (
    <>
      <div className="cart-item">
        <div className="cart-item-image"></div>
        <div className="cart-item-details">
          <div className="cart-item-name">{product.name}</div>
          <div className="cart-item-subdetails">
            <div>{product.Manufacturer.name}</div>
            <div className="cart-item-delete">
              <PiTrashLight onClick={handleClickDeleteProduct} />
            </div>
          </div>
          <div className="cart-item-admins">

            <AmountSetter
              amount={quantity}
              addFunction={handleAddClick}
              removeFunction={handleRemoveClick}
              title="Quantity"
            />
            <div className="cart-item-account">
              <div className="cart-item-price">
                Item price: EUR {product.currentUnitPrice}
              </div>
              <div className="cart-item-account-total">
                Total: EUR {product.currentUnitPrice * quantity}
              </div>
            </div>
          </div>
          <div className="cart-item-terms">
            <div>
              <AiOutlineExclamationCircle />
            </div>
            <p>
              Please note that we do not accept returns of individually
              configured products. Of course, this exclusion does not apply in
              the event of a production error.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
