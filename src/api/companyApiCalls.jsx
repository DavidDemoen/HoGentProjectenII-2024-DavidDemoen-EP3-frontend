import useSWR from "swr";
import { getAll } from "./index.jsx";

const getCompanyByIdApiCall = (id) => {
  const {
    data: company = {},
    error: companyError,
    isLoading: companyIsLoading,
  } = useSWR({ url: `companies/${id}` }, getAll);
  return { company, companyError, companyIsLoading };
};

export { getCompanyByIdApiCall };
