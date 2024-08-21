import { CheckoutPersonalInfoBox } from "./personal_info/CheckoutPersonalInfoBox";
import { CheckoutTrackBox } from "./CheckoutTrackBox";
import { useCheckoutContext } from "../../context/Checkout.context";
import { CheckoutShippingInfoBox } from "./shipping_info/CheckoutShippingInfoBox";
import { CheckoutPaymentMethodsBox } from "./payment-methods/CheckoutPaymentMethodsBox";
import { CheckoutCartOverviewBox } from "./CheckoutCartOverviewBox";
import { CheckoutSummaryBox } from "./summary/CheckoutSummaryBox";
import { useAccountsContext } from "../../context/Accounts.context";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/Auth.context";
import { CheckoutOrderPaymentBox } from "./order-payment/CheckoutOrderPaymentBox";

export function CheckoutBox() {
  const { checkoutStep } = useCheckoutContext();
  const { loggedInAccount } = useAccountsContext();
  const { logout } = useAuthContext();

  const navigate = useNavigate();
  const handleClickToLogin = () => {
    logout();
    navigate("/auth/login");
  };

  const renderCheckoutContent = () => {
    switch (checkoutStep) {
      case "personal-info":
        return <CheckoutPersonalInfoBox />;
      case "shipping":
        return <CheckoutShippingInfoBox />;
      case "payment-methods":
        return <CheckoutPaymentMethodsBox />;
      case "summary":
        return <CheckoutSummaryBox />;
      case "order-payment":
        return <CheckoutOrderPaymentBox />;
      default:
        return <CheckoutPersonalInfoBox />;
    }
  };
  if (!loggedInAccount || loggedInAccount.accountTypeName != "PURCHASER") {
    return (
      <div className="checkout-warning-container">
        <p>Log in with a PURCHASER account to continue to checkout</p>
        <button onClick={handleClickToLogin}>To Login</button>
      </div>
    );
  }

  return (
    <>
      <div className="checkout-box">
        {checkoutStep !== "order-payment" && (
          <CheckoutTrackBox checkoutStep={checkoutStep} />
        )}
        <div className="checkout-content-box">
          {renderCheckoutContent()}
          {checkoutStep !== "summary" && checkoutStep !== "order-payment" && (
            <CheckoutCartOverviewBox />
          )}
        </div>
      </div>
    </>
  );
}
