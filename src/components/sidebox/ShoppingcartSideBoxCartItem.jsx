export function ShoppingcartSideBoxCartItem({ quantity, product }) {
  console.log(quantity, product);

  const total = quantity * product.currentUnitPrice * (1 - product.currentProductDiscount);
  return <>
  <div className="sidebox-cart-item-box">
    <div className="sidebox-cart-item-img"></div>
    <div className="sidebox-cart-item-body">
        <div className="sidebox-cart-item-title">
            <p>{product.name}</p>
        </div>
        <div className="sidebox-cart-item-data">
            <div className="sidebox-cart-item-amount">
                <p>Amount</p>
                <p>{quantity}</p>
            </div>
            <div className="sidebox-cart-item-total">
                <p>Total</p>
                <p>€ {total}</p>
            </div>
        </div>
    </div>
  </div>
  </>;
}
