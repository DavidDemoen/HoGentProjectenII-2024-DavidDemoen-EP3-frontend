import { createContext, useContext, useMemo } from "react";

const CardContext = createContext();

export function useCardContext() {
  return useContext(CardContext);
}

export function CardContextProvider({ children }) {
  function objectToString(obj) {
    return Object.entries(obj)
      .map(([key, value]) => {
        if (typeof value === "object" && !Array.isArray(value)) {
          return `${key}:\n${objectToString(value)
            .split("\n")
            .map((line) => `  ${line}`)
            .join("\n")}`;
        }
        return `${key}: ${value}`;
      })
      .join("\n");
  }

  const getSalesData = () => {
    const sales_data = {
      total_sales: 34200, // Total sales amount in currency
      total_quantity: 150, // Total quantity of products sold
      average_price_per_sale: 228, // Average price per sale
      total_transactions: 10, // Total number of transactions
      top_selling_product: "Laptop", // Product with the highest sales
      sales_by_region: {
        "North America": 2,
        Europe: 2,
        Asia: 2,
        "South America": 2,
        Australia: 1,
        Africa: 1,
      }, // Sales count by region
      sales_by_salesperson: {
        "John Doe": 2,
        "Jane Smith": 2,
        "Li Wei": 2,
        "Maria Rodriguez": 2,
        "Bruce Wayne": 1,
        "Kwame Nkrumah": 1,
      }, // Sales count by salesperson
    };

    return `Sales Data:\n${objectToString(sales_data)}`;
  };

  const value = useMemo(() => {
    return {
      getSalesData,
    };
  }, [getSalesData]);

  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
}
