import { useCheckoutContext } from "../../../context/Checkout.context";
import { CheckoutShippingInfoForm } from "./CheckoutShippingInfoForm";
import AsyncData from "../../AsyncData";
import useSWR from "swr";
import { getAll } from "../../../api";

export function CheckoutShippingInfoBox() {
  const {
    data: orderPackagingsDATA = { orderPackaging: [] },
    error: allOrderPackagingsError,
    isLoading: allOrderPackagingsIsLoading,
  } = useSWR({ url: `orderPackagings` }, getAll);
  const { orderPackagings } = orderPackagingsDATA;

  

  return (
    <>
      <div className="checkout-form-container">
       
        <AsyncData
          loading={allOrderPackagingsIsLoading}
          error={allOrderPackagingsError}
          type="Shipping data"
        >
          <CheckoutShippingInfoForm orderPackagings={orderPackagings} />

        </AsyncData>
      </div>
    </>
  );
}
