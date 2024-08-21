import { createContext, useMemo, useContext } from "react";

const FilterBoxContext = createContext();

export function useFilterBoxContext() {
  return useContext(FilterBoxContext);
}

export function FilterBoxContextProvider({ children }) {
  const getFilterBoxStyles = (category) => {
    switch (category) {
      case "item-filter":
        return {
          box: {
            color: "red",
            display: "flex",
            gap: ".5rem",
            alignItems: "center",
          },
          p: {
            color: "black",
            fontSize: "1.2rem",
            fontWeight: 400,
          },
          hover: {
            color: "grey",
          },
          open: {
            color: "red",
          },
        };
      default:
        return {};
    }
  };
  const value = useMemo(() => {
    return {
      getFilterBoxStyles,
    };
  }, [getFilterBoxStyles]);

  return (
    <FilterBoxContext.Provider value={value}>
      {children}
    </FilterBoxContext.Provider>
  );
}
