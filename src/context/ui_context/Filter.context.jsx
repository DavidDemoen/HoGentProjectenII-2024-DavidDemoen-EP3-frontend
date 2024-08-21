import { useMemo, createContext, useState, useContext, useEffect } from "react";

const FilterContext = createContext();

export function useFilterContext() {
  return useContext(FilterContext);
}

export function FilterContextProvider({ children }) {
  const [filterCategories, setFilterCategories] = useState([]);
  const [filterManufacturers, setFilterManufacturers] = useState([]);
  const [filterAvailability, setFilterAvailability] = useState([]);

  const addFilterCategory = (category) => {
    setFilterCategories((prev) => [...prev, category]);
  };
  const removeFilterCategory = (category) => {
    setFilterCategories((prev) => prev.filter((c) => c.id !== category.id));
  };
  const resetFilterCategories = () => {
    setFilterCategories([]);
  };

  const addFilterManufacturer = (manufacturer) => {
    setFilterManufacturers((prev) => [...prev, manufacturer]);
  };
  const removeFilterManufacturer = (manufacturer) => {
    setFilterManufacturers((prev) =>
      prev.filter((m) => m.id !== manufacturer.id)
    );
  };
  const resetFilterManufacturers = () => {
    setFilterManufacturers([]);
  };

  const addFilterAvailability = (availability) => {
    setFilterAvailability((prev) => [...prev, availability]);
  };
  const removeFilterAvailability = (availability) => {
    setFilterAvailability((prev) =>
      prev.filter((a) => a.id !== availability.id)
    );
  };
  const resetFilterAvailability = () => {
    setFilterAvailability([]);
  };

  useEffect(() => {
    console.log(filterCategories);
  }, [filterCategories]);

  const value = useMemo(() => {
    return {
      filterCategories,
      filterManufacturers,
      filterAvailability,
      addFilterCategory,
      removeFilterCategory,
      resetFilterCategories,
      addFilterManufacturer,
      removeFilterManufacturer,
      resetFilterManufacturers,
      addFilterAvailability,
      removeFilterAvailability,
      resetFilterAvailability,
    };
  }, [
    filterCategories,
    filterManufacturers,
    filterAvailability,
    addFilterCategory,
    removeFilterCategory,
    resetFilterCategories,
    addFilterManufacturer,
    removeFilterManufacturer,
    resetFilterManufacturers,
    addFilterAvailability,
    removeFilterAvailability,
    resetFilterAvailability,
  ]);

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
}
