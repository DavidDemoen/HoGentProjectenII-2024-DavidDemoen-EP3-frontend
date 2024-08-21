import { useState, useMemo, useContext, createContext } from "react";
import { Products } from "../pages/Products";
import { ProductsFilterOverviewBox } from "../components/products/products_filter/ProductsFilterOverviewBox";
import { useFilterContext } from "./ui_context/Filter.context";

const ProductPagesContext = createContext();

export function useProductPagesContext() {
  return useContext(ProductPagesContext);
}

export function ProductPagesContextProvider({ children }) {
  const [catFilterIsOpen, setCatFilterIsOpen] = useState(false);
  const [brandFilterIsOpen, setBrandFilterIsOpen] = useState(false);
  const [availabilityFilterIsOpen, setAvailabilityFilterIsOpen] =
    useState(false);

  const {
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
  } = useFilterContext();

  const handleProductsFilterClick = (type) => {
    switch (type) {
      case "category":
        setCatFilterIsOpen(!catFilterIsOpen);
        setBrandFilterIsOpen(false);
        setAvailabilityFilterIsOpen(false);
        break;
      case "brand":
        setBrandFilterIsOpen(!brandFilterIsOpen);
        setCatFilterIsOpen(false);
        setAvailabilityFilterIsOpen(false);
        break;
      case "availability":
        setAvailabilityFilterIsOpen(!availabilityFilterIsOpen);
        setCatFilterIsOpen(false);
        setBrandFilterIsOpen(false);
        break;
      default:
        break;
    }
  };
  const generateFilterOverview = (items) => {
    if (catFilterIsOpen) {
      return (
        <ProductsFilterOverviewBox
          name="categorie"
          items={items}
          addFunction={addFilterCategory}
          removeFunction={removeFilterCategory}
          resetFunction={resetFilterCategories}
          checkedItems={filterCategories}
          closeFunction={() => setCatFilterIsOpen(false)}
        />
      );
    }
    if (brandFilterIsOpen) {
      return (
        <ProductsFilterOverviewBox
          name="brand"
          items={items}
          addFunction={addFilterManufacturer}
          removeFunction={removeFilterManufacturer}
          resetFunction={resetFilterManufacturers}
          checkedItems={filterManufacturers}
          closeFunction={() => setBrandFilterIsOpen(false)}
        />
      );
    }
    if (availabilityFilterIsOpen) {
      return (
        <ProductsFilterOverviewBox
          name="availability"
          items={items}
          addFunction={addFilterAvailability}
          removeFunction={removeFilterAvailability}
          resetFunction={resetFilterAvailability}
          checkedItems={filterAvailability}
          closeFunction={() => setAvailabilityFilterIsOpen(false)}
        />
      );
    }
    return null;
  };

  const value = useMemo(() => {
    return {
      catFilterIsOpen,
      brandFilterIsOpen,
      availabilityFilterIsOpen,
      handleProductsFilterClick,
      generateFilterOverview,
    };
  }, [
    catFilterIsOpen,
    brandFilterIsOpen,
    availabilityFilterIsOpen,
    handleProductsFilterClick,
    generateFilterOverview,
  ]);
  return (
    <ProductPagesContext.Provider value={value}>
      {children}
    </ProductPagesContext.Provider>
  );
}
