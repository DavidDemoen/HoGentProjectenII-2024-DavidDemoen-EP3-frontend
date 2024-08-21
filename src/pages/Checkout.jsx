import { CheckoutBox } from "../components/checkout/CheckoutBox";
import { CheckoutContextProvider } from "../context/Checkout.context";

export function Checkout() {
  return (
    <>
      <CheckoutContextProvider>
        <CheckoutBox />
      </CheckoutContextProvider>
    </>
  );
}
