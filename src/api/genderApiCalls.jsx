import useSWR from "swr";
import { getAll, getById } from "./index.jsx";

const getAllGender = () => {
  const {
    data: allGender = { genders: [] },
    error: allGenderError,
    isLoading: allGenderIsLoading,
  } = useSWR({ url: `gender` }, getAll);
  return { allGender, allGenderError, allGenderIsLoading };
};

export { getAllGender };
