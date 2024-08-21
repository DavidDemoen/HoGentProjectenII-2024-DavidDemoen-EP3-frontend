export function CheckoutCartItem({ product, quantity }) {
  console.log(product);
  return (
    <>
      <div className="checkout-cart-item">
        <div className="checkout-cart-img"></div>
        <div className="checkout-cart-body">
            <p>{product.name}</p>
            <p>{product.currentUnitPrice}</p>
            <p>{quantity}</p>
            <p>{product.currentUnitPrice * quantity}</p>
        </div>
      </div>
    </>
  );
}
