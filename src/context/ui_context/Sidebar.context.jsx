import { createContext, useContext, useMemo } from "react";
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
    {
      logo: <FaSignOutAlt />,
      title: "Logout",
    },
  ];
  const value = useMemo(() => {
    return {
      adminSidebarContent,
    };
  }, [adminSidebarContent]);

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
}
