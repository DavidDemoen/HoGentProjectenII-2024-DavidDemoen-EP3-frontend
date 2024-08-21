import { createContext, useContext, useEffect, useState, useMemo } from "react";
import useSWRMutation from "swr/mutation";
import { create } from "../api/index";

const CheckoutContext = createContext();

const mainCompany = import.meta.env.VITE_DEV_MAIN_COMPANY;

const testShippingAddress = {
  street: "Teststraat",
  number: "1",
  city: "TestCity",
  postalCode: "1234",
  country: "TestCountry",
};
const testBillingAddress = {
  street: "TestBillingStraat",
  number: "1",
  city: "TestBillingCity",
  postalCode: "1234",
  country: "TestBillingCountry",
};
const testPackaging = {
  referenceId: "B2B-OP-0001",
  name: "BOX",
  description: "A box.",
};
const testPaymentMethod = {
  referenceId: "B2B-PM-0001",
  name: "CREDIT_CARD",
  description: "Pay with your credit card.",
};

export function useCheckoutContext() {
  return useContext(CheckoutContext);
}

export function CheckoutContextProvider({ children }) {
  const [checkoutStep, setCheckoutStep] = useState();

  //   () => {
  //   const storedCheckoutStep = localStorage.getItem("checkoutStep");
  //   return storedCheckoutStep
  //     ? JSON.parse(storedCheckoutStep)
  //     : "personal-info";
  // });

  const [orderBillingAddress, setOrderBillingAddress] =
    useState(testBillingAddress);
  const [orderShippingAddress, setOrderShippingAddress] =
    useState(testShippingAddress);
  const [orderPackaging, setOrderPackaging] = useState(testPackaging);
  const [orderPaymentMethod, setOrderPaymentMethod] =
    useState(testPaymentMethod);
  const [orderDiscount, setOrderDiscount] = useState(0);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  console.log(orderBillingAddress);
  console.log(orderShippingAddress);
  console.log(orderPackaging);
  console.log(orderPaymentMethod);

  const {
    trigger: createOrder,
    error: createOrderError,
    isLoading: createOrderIsLoading,
  } = useSWRMutation(`orders`, create);

  useEffect(() => {
    localStorage.setItem("checkoutStep", JSON.stringify(checkoutStep));
  }, [checkoutStep]);

  const handleSetupOrder = async (cartItems) => {
    const order = {
      referenceId: "B2B-Order-1",
      orderDiscount: orderDiscount,
      sellerCompanyId: mainCompany,
      buyerAccountId: "12",
      shippingAddress: orderShippingAddress,
      billingAddress: orderBillingAddress,
      orderStatusName: "PENDING",
      paymentStatusName: "PENDING",
      paymentMethodName: orderPaymentMethod.name,
      orderPackagingName: orderPackaging.name,
      cartItems: cartItems,
      date: new Date(),
    };
    setConfirmedOrder(order);
  };

  const handleSubmitOrder = async (isPaid) => {
    if (isPaid) {
      confirmedOrder.paymentStatusName = "PAID";
      confirmedOrder.orderStatusName = "PROCESSING";
      confirmedOrder.paymentMethodName = "QR_CODE";
    } else {
      confirmedOrder.paymentStatusName = "PENDING";
      confirmedOrder.orderStatusName = "PROCESSING";
    }

    const received = await createOrder(confirmedOrder);
    return received;
  };

  const resetOrder = () => {
    setConfirmedOrder(null);
    setCheckoutStep("");
    setOrderBillingAddress(null);
    setOrderShippingAddress(null);
    setOrderPackaging(null);
    setOrderPaymentMethod(null);
  };

  const value = useMemo(() => {
    return {
      checkoutStep,
      orderBillingAddress,
      orderShippingAddress,
      orderPackaging,
      orderPaymentMethod,
      createOrderError,
      createOrderIsLoading,
      setCheckoutStep,
      setOrderBillingAddress,
      setOrderShippingAddress,
      setOrderPackaging,
      setOrderPaymentMethod,
      handleSubmitOrder,
      handleSetupOrder,
      resetOrder,
    };
  }, [
    checkoutStep,
    orderBillingAddress,
    orderShippingAddress,
    orderPackaging,
    orderPaymentMethod,
    createOrderError,
    createOrderIsLoading,
    setCheckoutStep,
    setOrderBillingAddress,
    setOrderShippingAddress,
    setOrderPackaging,
    setOrderPaymentMethod,
    handleSubmitOrder,
    handleSetupOrder,
    resetOrder,
  ]);
  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
}
