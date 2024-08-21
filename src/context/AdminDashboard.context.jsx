import { createContext, useContext, useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { getAll } from "../api/index";
import { SalesDashboardBox } from "../components/dashboard/sales_dashboard/SalesDashboardBox";
import { ProductsDashboardBox } from "../components/dashboard/products_dashboard/ProductsDashboardBox";
import { CategoriesDashboardBox } from "../components/dashboard/categories_dashboard/CategoriesDashboardBox";
import { OrdersDashboardBox } from "../components/dashboard/orders_dashboard/OrdersDashboardBox";
import { AdminsDashboardBox } from "../components/dashboard/admins_dashboard/AdminsDashboardBox";
import { SettingsDashboardBox } from "../components/dashboard/settings_dashboard/SettingsDashboardBox";
import { AddProductBox } from "../components/dashboard/products_dashboard/add_product/AddProductBox";
import { EditProductBox } from "../components/dashboard/products_dashboard/edit_products/EditProductBox";
import { ProductCategoriesAPIContextProvider } from "./ProductCategories.API.context";
import { OrdersAPIContextProvider } from "./Orders.API.context";
import { PendingOrdersBox } from "../components/dashboard/pending_orders_dashboard/PendingOrdersBox";
import { CompanyDashboardBox } from "../components/dashboard/company_dashboard/CompanyDashboardBox";
import { PurcharsersDashboardBox } from "../components/dashboard/purchasers_dashboard/PurcharsersDashboardBox";

const AdminDashboardContext = createContext();
const supplierAccount = import.meta.env.VITE_DEV_MAIN_SUPPLIER_ACCOUNT;
const mainCompany = import.meta.env.VITE_DEV_MAIN_COMPANY;

export function useAdminDashboardContext() {
  return useContext(AdminDashboardContext);
}

export function AdminDashboardContextProvider({ children }) {
  // STATE
  const [selectedDashboard, setSelectedDashboard] = useState("");
  const [categoriesMainBox, setCategoriesMainBox] = useState("add");
  const [ordersMainBox, setOrdersMainBox] = useState("table");
  const [pendingOrderDetailId, setPendingOrderDetailId] = useState(null);
  const [productDetailId, setProductDetailId] = useState(null);
  const [categoryDetailId, setCategoryDetailId] = useState(null);
  const [adminOrderDetailId, setAdminOrderDetailId] = useState(null);

  // API calls Orders
  const {
    data: ordersDATA = { orders: [] },
    error: ordersError,
    isLoading: ordersIsLoading,
  } = useSWR({ url: `orders/company/${mainCompany}` }, getAll);
  const {
    data: ordersAccountTodayDATA = { orders: [] },
    error: ordersAccountTodayError,
    isLoading: ordersAccountTodayIsLoading,
  } = useSWR({ url: `orders/company/${mainCompany}/today` }, getAll);
  const {
    data: ordersAccountWeekDATA = { orders: [] },
    error: ordersAccountWeekError,
    isLoading: ordersAccountWeekIsLoading,
  } = useSWR({ url: `orders/company/${mainCompany}/week` }, getAll);
  const {
    data: ordersRevenueTodayDATA = { revenue: null },
    error: ordersRevenueTodayError,
    isLoading: ordersRevenueTodayIsLoading,
  } = useSWR({ url: `orders/company/${mainCompany}/revenue/today` }, getAll);
  const {
    data: ordersRevenueWeekDATA = { revenue: null },
    error: ordersRevenueWeekError,
    isLoading: ordersRevenueWeekIsLoading,
  } = useSWR({ url: `orders/company/${mainCompany}/revenue/week` }, getAll);

  // API calls Products
  const {
    data: productsDATA = { products: [] },
    error: productsError,
    isLoading: productsIsLoading,
  } = useSWR({ url: `companies/${mainCompany}/products` }, getAll);

  const setDashboard = (dashboard) => {
    setSelectedDashboard(dashboard);
  };

  // API calls Addresses

  // CONSOLE LOGS
  // const logSelectedDashboard = useEffect(() => {
  //   console.log(selectedDashboard);
  // }, [selectedDashboard]);

  const renderDashboard = (company, companyIsLoading, companyError) => {
    switch (selectedDashboard) {
      case "Sales Metrics":
        return <SalesDashboardBox />;
      case "Products":
        return <ProductsDashboardBox />;
      case "Categories":
        return (
          <ProductCategoriesAPIContextProvider>
            <CategoriesDashboardBox />
          </ProductCategoriesAPIContextProvider>
        );
      case "Orders":
        return (
          <OrdersAPIContextProvider>
            <OrdersDashboardBox />
          </OrdersAPIContextProvider>
        );
      case "Admins":
        return <AdminsDashboardBox />;
      case "Settings":
        return <SettingsDashboardBox />;
      case "Add Product":
        return <AddProductBox />;
      case "Edit Product":
        return <EditProductBox />;
      case "Pending Orders":
        return (
          <PendingOrdersBox
            company={company}
            loading={companyIsLoading}
            error={companyError}
          />
        );
      case "Company Metrics":
        return (
          <CompanyDashboardBox
            company={company}
            loading={companyIsLoading}
            error={companyError}
          />
        );
      case "Purchasers":
        return (
          <PurcharsersDashboardBox
            company={company}
            loading={companyIsLoading}
            error={companyError}
          />
        );
    }
  };

  const salesCardBodyGenerator = (type) => {
    const amount_orders = ordersAccountTodayDATA.count;
    const amount_orders_week = ordersAccountWeekDATA.count;
    const revenue_today = ordersRevenueTodayDATA.revenue;
    const revenue_week = ordersRevenueWeekDATA.revenue;

    switch (type) {
      case "sales-today":
        return {
          data: `${amount_orders}`,
          subdata: `${amount_orders} orders today`,
        };

      case "sales-week":
        return {
          data: `${amount_orders_week}`,
          subdata: `${amount_orders_week} orders this week`,
        };
      case "revenue-today":
        return {
          data: `€${revenue_today}`,
          subdata: `€${revenue_today} revenue today`,
        };
      case "revenue-week":
        return {
          data: `€${revenue_week}`,
          subdata: `€${revenue_week} revenue this week`,
        };
    }
  };

  const value = useMemo(() => {
    return {
      ordersDATA,
      ordersError,
      ordersIsLoading,
      selectedDashboard,
      ordersAccountTodayDATA,
      ordersAccountTodayError,
      ordersAccountTodayIsLoading,
      ordersAccountWeekError,
      ordersAccountWeekIsLoading,
      ordersRevenueTodayError,
      ordersRevenueTodayIsLoading,
      ordersRevenueWeekError,
      ordersRevenueWeekIsLoading,
      productsDATA,
      productsError,
      productsIsLoading,
      categoriesMainBox,
      ordersMainBox,
      pendingOrderDetailId,
      productDetailId,
      categoryDetailId,
      adminOrderDetailId,
      setDashboard,
      renderDashboard,
      salesCardBodyGenerator,
      setCategoriesMainBox,
      setOrdersMainBox,
      setPendingOrderDetailId,
      setProductDetailId,
      setCategoryDetailId,
      setAdminOrderDetailId,
    };
  }, [
    ordersDATA,
    ordersError,
    ordersIsLoading,
    selectedDashboard,
    ordersAccountTodayDATA,
    ordersAccountTodayError,
    ordersAccountTodayIsLoading,
    ordersAccountWeekError,
    ordersAccountWeekIsLoading,
    ordersRevenueTodayError,
    ordersRevenueTodayIsLoading,
    ordersRevenueWeekError,
    ordersRevenueWeekIsLoading,
    productsDATA,
    productsError,
    productsIsLoading,
    categoriesMainBox,
    ordersMainBox,
    pendingOrderDetailId,
    productDetailId,
    categoryDetailId,
    adminOrderDetailId,
    setDashboard,
    renderDashboard,
    salesCardBodyGenerator,
    setCategoriesMainBox,
    setOrdersMainBox,
    setPendingOrderDetailId,
    setProductDetailId,
    setCategoryDetailId,
    setAdminOrderDetailId,
  ]);

  return (
    <AdminDashboardContext.Provider value={value}>
      {children}
    </AdminDashboardContext.Provider>
  );
}
