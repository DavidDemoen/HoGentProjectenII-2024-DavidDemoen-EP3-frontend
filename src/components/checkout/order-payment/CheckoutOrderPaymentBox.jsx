import { useCheckoutContext } from "../../../context/Checkout.context";
import { useState } from "react";
import AsyncData from "../../AsyncData";
import { useNavigate } from "react-router-dom";
import { useShoppingCartContext } from "../../../context/ShoppingCart.context";

export function CheckoutOrderPaymentBox() {
  const [exitScreen, setExitScreen] = useState(false);
  const {
    createOrderError,
    createOrderIsLoading,
    handleSubmitOrder,
    resetOrder,
  } = useCheckoutContext();
  const { resetCart } = useShoppingCartContext();

  const navigate = useNavigate();

  const renderExitScreen = () => {
    setExitScreen(true);
  };

  const handlePayNow = async () => {
    const order = await handleSubmitOrder(true);
    console.log(order);
    renderExitScreen();
  };
  const handlePayLater = async () => {
    const order = await handleSubmitOrder(false);
    console.log(order);
    renderExitScreen();
  };
  const handleReturnToShop = () => {
    resetOrder();
    resetCart();
    navigate("/");
  };
  if (exitScreen) {
    return (
      <>
        <AsyncData
          loading={createOrderIsLoading}
          error={createOrderError}
          type="Placing Order"
        >
          <div className="checkout-header">
            <div className="checkout-header-title">Order Placed</div>
          </div>
          <div className="checkout-payment-body">
            <div className="checkout-payment-paynow">
              Thank you for your order!
            </div>
            <div
              onClick={handleReturnToShop}
              className="checkout-payment-paylater"
            >
              Click here to return to the shop.
            </div>
          </div>
        </AsyncData>
      </>
    );
  }
  return (
    <>
      <div className="checkout-header">
        <div className="checkout-header-title">Order Payment</div>
      </div>
      <div className="checkout-payment-body">
        <div className="checkout-payment-qr">
          <img
            onClick={handlePayNow}
            src="https://www.qr-code-generator.com/wp-content/themes/qr/new_structure/markets/basic_market/generator/dist/generator/assets/images/websiteQRCode_noFrame.png"
            alt="QR code"
          />
        </div>
        <div className="checkout-payment-paynow">
          Click the QR code to pay now
        </div>
        <div onClick={handlePayLater} className="checkout-payment-paylater">
          Click here to pay later via selected payment method
        </div>
      </div>
    </>
  );
}
