import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import useSWR, { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import { getAll, getById, updateById, deleteById, create } from "../api/index";

const supplierAccount = import.meta.env.VITE_DEV_MAIN_SUPPLIER_ACCOUNT;
const mainCompany = import.meta.env.VITE_DEV_MAIN_COMPANY;

const OrdersAPIContext = createContext();

export function useOrdersAPIContext() {
  return useContext(OrdersAPIContext);
}

export function OrdersAPIContextProvider({ children }) {
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const {
    data: ordersMainAccountDATA = { orders: [] },
    error: ordersMainAccountError,
    isLoading: ordersMainAccountIsLoading,
  } = useSWR({ url: `orders/account/${supplierAccount}` }, getAll);

  const value = useMemo(() => {
    return {
      ordersMainAccountDATA,
      ordersMainAccountError,
      ordersMainAccountIsLoading,
      selectedOrderId,
      setSelectedOrderId,
    };
  }, [
    ordersMainAccountDATA,
    ordersMainAccountError,
    ordersMainAccountIsLoading,
    selectedOrderId,
    setSelectedOrderId,
  ]);
  return (
    <OrdersAPIContext.Provider value={value}>
      {children}
    </OrdersAPIContext.Provider>
  );
}
