import "../../../styles/checkout_styles.css";

export function CheckoutTrackBox({ checkoutStep }) {
  return (
    <>
      <div className="checkout-track-box">
        <div className="progress-step active">
          <div className="step-circle"></div>
          <p>Personal information</p>
        </div>
        <div
          className={`progress-line ${
            checkoutStep === "payment-methods" ||
            checkoutStep === "summary" ||
            checkoutStep === "shipping"
              ? "active"
              : ""
          }`}
        ></div>
        <div
          className={`progress-step ${
            checkoutStep === "payment-methods" ||
            checkoutStep === "summary" ||
            checkoutStep === "shipping"
              ? "active"
              : ""
          }`}
        >
          <div className="step-circle"></div>
          <p>Shipping</p>
        </div>
        <div
          className={`progress-line ${
            checkoutStep === "payment-methods" || checkoutStep === "summary"
              ? "active"
              : ""
          }`}
        ></div>
        <div
          className={`progress-step ${
            checkoutStep === "payment-methods" || checkoutStep === "summary"
              ? "active"
              : ""
          }`}
        >
          <div className="step-circle"></div>
          <p>Payment methods</p>
        </div>
        <div
          className={`progress-line ${
            checkoutStep === "payment-methods" || checkoutStep === "summary"
              ? "active"
              : ""
          }`}
        ></div>
        <div
          className={`progress-step ${
            checkoutStep === "summary" ? "active" : ""
          }`}
        >
          <div className="step-circle"></div>
          <p>Summary</p>
        </div>
      </div>
    </>
  );
}
