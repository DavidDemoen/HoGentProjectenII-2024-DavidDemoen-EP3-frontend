import { useCheckoutContext } from "../../../context/Checkout.context";
import { useShoppingCartContext } from "../../../context/ShoppingCart.context";
import { CheckoutCartItem } from "./CheckoutCartItem";
import { GenericDynamicContentBox } from "../../ui_element/content_box/GenericDynamicContentBox";
import { CheckoutAddressSummary } from "./CheckoutAddressSummary";
import { useAccountsContext } from "../../../context/Accounts.context";
import useSWR from "swr";
import { getById } from "../../../api";
import AsyncData from "../../AsyncData";
import { useNavigate } from "react-router-dom";

export function CheckoutSummaryBox() {
  const {
    orderBillingAddress,
    orderShippingAddress,
    orderPackaging,
    orderPaymentMethod,
    setCheckoutStep,
    handleSetupOrder,
  } = useCheckoutContext();
  const { cartItems, shoppingCartTotal } = useShoppingCartContext();
  const { shopCompany } = useAccountsContext();

  const navigate = useNavigate();

  const {
    data: companyDATA,
    error: companyERROR,
    isLoading: companyISLOADING,
  } = useSWR({ url: `companies/${shopCompany}` }, getById);
  const { company } = companyDATA;

  const renderCartItems = () => {
    return cartItems.map((item, index) => {
      return <CheckoutCartItem key={index} {...item} />;
    });
  };
  const renderSupplierInfo = () => {
    return (
      <div className="checkout-supplier-box">
        <p>{company.name}</p>
        <p> {company.email}</p>
        <p>{company.phone}</p>
      </div>
    );
  };
  const renderDeliveryAddress = () => {
    return (
      <CheckoutAddressSummary
        address={orderShippingAddress}
        checkoutStep="shipping"
        type="shipping"
      />
    );
  };
  const renderBillingAddress = () => {
    return (
      <CheckoutAddressSummary
        address={orderBillingAddress}
        checkoutStep="personal-info"
        type="billing"
      />
    );
  };
  const renderPackaging = () => {
    return (
      <>
        <div>
          <p>Package Type: {orderPackaging.name}</p>
        </div>
      </>
    );
  };
  const renderPaymentMethod = () => {
    return (
      <>
        <div>
          <p>Payment Method: {orderPaymentMethod.name}</p>
        </div>
      </>
    );
  };

  const handleClickCoupon = () => {
    console.log("Add discount coupon - TO IMPLEMENT");
  };
  const handleClickPaymentMethods = () => {
    setCheckoutStep("payment-methods");
  };
  const handleClickTNC = () => {
    console.log("Open terms and conditions - TO IMPLEMENT");
  };
  const handleClickPlaceOrder = () => {
    handleSetupOrder(cartItems);
    setCheckoutStep("order-payment");
  };

  return (
    <>
      <div></div>
      <div className="checkout-summary-box">
        <div className="checkout-summary-data">
          <button
            className="checkout-form-button"
            onClick={handleClickPaymentMethods}
          >
            Back to Payment Methods
          </button>
          <AsyncData
            loading={companyISLOADING}
            error={companyERROR}
            type="Company Data"
          >
            <div>
              <GenericDynamicContentBox
                header="Supplier Information"
                renderFunction={renderSupplierInfo}
              />
            </div>
          </AsyncData>
          <div>
            <GenericDynamicContentBox
              header="Shipping Address"
              renderFunction={renderDeliveryAddress}
            />
          </div>

          <div>
            <GenericDynamicContentBox
              header="Billing Address"
              renderFunction={renderBillingAddress}
            />
          </div>
          <div>
            <GenericDynamicContentBox
              header="Packaging"
              renderFunction={renderPackaging}
            />
          </div>
          <div>
            <GenericDynamicContentBox
              header="Payment Method"
              renderFunction={renderPaymentMethod}
            />
          </div>
          <div className="checkout-summary-placeorder">
            <p>
              If you click 'Order and pay', you agree with the (general){" "}
              <span className="checkout-summary-tnc" onClick={handleClickTNC}>
                terms and conditions
              </span>{" "}
              applicable to your order at [SUPPLIERNAME]
            </p>
            <div className="checkout-summary-paybutton-box">
              <button
                className="checkout-summary-paybutton"
                onClick={handleClickPlaceOrder}
              >
                Order and Pay
              </button>
            </div>
          </div>
        </div>
        <div className="checkout-summary-overview">
          <div className="checkout-summary-cart">
            <GenericDynamicContentBox
              header="Order Items"
              renderFunction={renderCartItems}
            />
          </div>
          <div className="checkout-summary-coupon" onClick={handleClickCoupon}>
            <p>Add Disount Coupon</p>
          </div>
          <div className="checkout-summary-total">
            <p>To pay:</p>
            <p>EUR {shoppingCartTotal}</p>
          </div>
        </div>
      </div>
    </>
  );
}
