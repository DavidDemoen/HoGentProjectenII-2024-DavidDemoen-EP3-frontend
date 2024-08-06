import { useContext, createContext, useState, useEffect, useMemo } from "react";
import useSWR from "swr";
import { getAll, getById } from "../api/index";

const ManufacturersAPIContext = createContext();
const supplierAccount = import.meta.env.VITE_DEV_MAIN_SUPPLIER_ACCOUNT;
const mainCompany = import.meta.env.VITE_DEV_MAIN_COMPANY;

export function useManufacturersAPIContext() {
  return useContext(ManufacturersAPIContext);
}

export function ManufacturersAPIContextProvider({ children }) {
  // STATE
  const [selectedManufacturerId, setSelectedManufacturerId] = useState(null);
  // API calls Manufacturers
  const {
    data: manufacturersDATA = { manufacturers: [] },
    error: manufacturersError,
    isLoading: manufacturersIsLoading,
  } = useSWR({ url: "manufacturers" }, getAll);
  const {
    data: selectedManufacturerDATA = { manufacturer: {} },
    error: selectedManufacturerError,
    isLoading: selectedManufacturerIsLoading,
  } = useSWR(
    selectedManufacturerId
      ? { url: `manufacturers/${selectedManufacturerId}` }
      : null,
    getById
  );

  const value = useMemo(() => {
    return {
      manufacturersDATA,
      manufacturersError,
      manufacturersIsLoading,
      selectedManufacturerDATA,
      selectedManufacturerError,
      selectedManufacturerIsLoading,
      setSelectedManufacturerId,
    };
  }, [
    manufacturersDATA,
    manufacturersError,
    manufacturersIsLoading,
    selectedManufacturerDATA,
    selectedManufacturerError,
    selectedManufacturerIsLoading,
    setSelectedManufacturerId,
  ]);

  return (
    <ManufacturersAPIContext.Provider value={value}>
      {children}
    </ManufacturersAPIContext.Provider>
  );
}
