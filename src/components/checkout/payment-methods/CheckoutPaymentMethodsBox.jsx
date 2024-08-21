import { useCheckoutContext } from "../../../context/Checkout.context";
import { CheckoutPaymentMethodsForm } from "./CheckoutPaymentMethodsForm";
import AsyncData from "../../AsyncData";
import useSWR from "swr";
import { getAll } from "../../../api";

export function CheckoutPaymentMethodsBox() {
  const { setCheckoutStep } = useCheckoutContext();
  const {
    data: paymentMethodsDATA = { paymentMethods: [] },
    error: allPaymentMethodsError,
    isLoading: allPaymentMethodsIsLoading,
  } = useSWR({ url: `paymentMethods` }, getAll);
  const { paymentMethods } = paymentMethodsDATA;

  return (
    <>
      <div className="checkout-form-container">
        <AsyncData
          loading={allPaymentMethodsIsLoading}
          error={allPaymentMethodsError}
          type="Payment data"
        >
          <CheckoutPaymentMethodsForm paymentMethods={paymentMethods} />
        </AsyncData>
      </div>
    </>
  );
}
