import { MdOutlineLocationOn } from "react-icons/md";
import { useCheckoutContext } from "../../../context/Checkout.context";

export function CheckoutAddressSummary({ address, checkoutStep, type }) {
  const { setCheckoutStep } = useCheckoutContext();
  const handleClickChange = () => {
    setCheckoutStep(checkoutStep);
  };
  return (
    <>
      <div className="checkout-address-summary-body">
        <div className="checkout-address-icon">
          <MdOutlineLocationOn size="2rem" />
        </div>
        <div>
          <p>{address.street}</p>
          <p>{address.city}</p>
          <p>{address.postalCode}</p>
          <p>{address.country}</p>
        </div>
      </div>
      <div className="checkout-address-change-link">
        <p onClick={handleClickChange}>Change {type} address</p>
      </div>
    </>
  );
}
