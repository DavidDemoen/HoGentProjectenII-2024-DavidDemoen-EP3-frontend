import useSWR from "swr";
import { getAll } from "./index.jsx";

const getAllPaymentMethods = () => {
  const {
    data: allPaymentMethods = { paymentMethods: [] },
    error: allPaymentMethodsError,
    isLoading: allPaymentMethodsIsLoading,
  } = useSWR({ url: `paymentMethods` }, getAll);
  return {
    allPaymentMethods,
    allPaymentMethodsError,
    allPaymentMethodsIsLoading,
  };
};

export { getAllPaymentMethods };
