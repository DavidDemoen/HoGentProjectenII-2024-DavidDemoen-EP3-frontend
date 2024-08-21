import { createContext, useContext, useMemo, useState } from "react";
import {
  FaHome,
  FaTrash,
  FaList,
  FaBars,
  FaUsers,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

const SidebarContext = createContext();

export function useSidebarContext() {
  return useContext(SidebarContext);
}

export function SidebarContextProvider({ children }) {
  const [selectedItem, setSelectedItem] = useState("");

  const adminSidebarContent = [
    {
      logo: <FaHome />,
      title: "Sales Metrics",
      url: "sales",
    },
    {
      logo: <FaTrash />,
      title: "Products",
      url: "products",
    },
    {
      logo: <FaList />,
      title: "Categories",
      url: "categories",
    },
    {
      logo: <FaBars />,
      title: "Orders",
      url: "orders",
    },
    {
      logo: <FaUsers />,
      title: "Admins",
      url: "admins",
    },
    {
      logo: <FaCog />,
      title: "Settings",
      url: "settings",
    },
  ];
  const purchaserSidebarContent = [
    {
      logo: <FaHome />,
      title: "Company Metrics",
      url: "company-metrics",
    },
    {
      logo: <FaBars />,
      title: "Pending Orders",
      url: "pending-orders",
    },
    {
      logo: <FaSignOutAlt />,
      title: "Purchasers",
      url: "purchasers",
    },
    {
      logo: <FaCog />,
      title: "Settings",
      url: "settings",
    },
  ];
  const value = useMemo(() => {
    return {
      adminSidebarContent,
      purchaserSidebarContent,
      selectedItem,
      setSelectedItem,
    };
  }, [
    adminSidebarContent,
    purchaserSidebarContent,
    selectedItem,
    setSelectedItem,
  ]);

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
}
