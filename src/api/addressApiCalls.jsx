import useSWR from "swr";
import { getAll } from "./index";

const getAddressByIdApiCall = (id) => {
  const {
    data: address = {},
    error: addressError,
    isLoading: addressIsLoading,
  } = useSWR({ url: `addresses/${id}` }, getAll);
  return { address, addressError, addressIsLoading };
};

export { getAddressByIdApiCall };
