import useSWR from "swr";
import { getAll, getByName } from "./index.jsx";

const getAllOrderPackagings = () => {
  const {
    data: allOrderPackagings = { orderPackagings: [] },
    error: allOrderPackagingsError,
    isLoading: allOrderPackagingsIsLoading,
  } = useSWR({ url: `orderPackagings` }, getAll);
  return {
    allOrderPackagings,
    allOrderPackagingsError,
    allOrderPackagingsIsLoading,
  };
};
const getOrderPackagingByName = (name) => {
  const {
    data: orderPackaging = {},
    error: orderPackagingError,
    isLoading: orderPackagingIsLoading,
  } = useSWR({ url: `orderPackagings`, arg: name }, getByName);
  return { orderPackaging, orderPackagingError, orderPackagingIsLoading };
};

export { getAllOrderPackagings, getOrderPackagingByName };
