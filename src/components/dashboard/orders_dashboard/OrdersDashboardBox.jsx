import { useAdminDashboardContext } from "../../../context/AdminDashboard.context";
import { OrdersDashboardTable } from "./OrdersDashboardTable";
import { OrdersDashboardDetailsBox } from "./OrdersDashboardDetailsBox";
import { useEffect } from "react";

export function OrdersDashboardBox() {
  const { ordersMainBox, setOrdersMainBox } = useAdminDashboardContext();
  const renderMainBox = () => {
    switch (ordersMainBox) {
      case "table":
        return <OrdersDashboardTable />;
      case "details":
        return <OrdersDashboardDetailsBox />;
      default:
        return <OrdersTable />;
    }
  };
  useEffect(() => {
    setOrdersMainBox("table");
  }, []);

  return (
    <>
      <h1>Orders</h1>
      {renderMainBox()}
    </>
  );
}
