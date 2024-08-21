import useSWR, { mutate } from "swr";
import { create } from "./index";
import useSWRMutation from "swr/mutation";

const {
  trigger: createOrder,
  error: createOrderError,
  isLoading: createOrderIsLoading,
} = useSWRMutation(`orders`, create);

const createOrderApiCall = async (data) => {
  console.log(`Create order: ${JSON.stringify(data)}`);
  const received = await createOrder(data);
  mutate({
    url: `orders`,
  });
};

export { createOrderApiCall, createOrderError, createOrderIsLoading };
