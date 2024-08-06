import { useAdminDashboardContext } from "../../../context/AdminDashboard.context";
import { CardGeneral } from "../../ui_element/card/CardGeneral";
import AsyncData from "../../AsyncData";

export function SalesDashboardBox() {
  const {
    salesCardBodyGenerator,
    ordersAccountTodayError,
    ordersAccountTodayIsLoading,
    ordersAccountWeekError,
    ordersAccountWeekIsLoading,
    ordersRevenueTodayError,
    ordersRevenueTodayIsLoading,
    ordersRevenueWeekError,
    ordersRevenueWeekIsLoading,
  } = useAdminDashboardContext();

  return (
    <>
      <div>
        <h1>SALES-METRICS-PLACEHOLDER</h1>
        <h2>Orders</h2>
        <div className="sales-cards-box">
          <CardGeneral
            title="TODAY"
            body={salesCardBodyGenerator("sales-today")}
            loading={ordersAccountTodayIsLoading}
            error={ordersAccountTodayError}
            type="orders today"
          />

          <CardGeneral
            title="THIS WEEK"
            body={salesCardBodyGenerator("sales-week")}
            loading={ordersAccountWeekIsLoading}
            error={ordersAccountWeekError}
            type="orders week"
          />
        </div>
        <h2>Revenue</h2>
        <div className="sales-cards-box">
          <CardGeneral
            title="TODAY"
            body={salesCardBodyGenerator("revenue-today")}
            error={ordersRevenueTodayError}
            loading={ordersRevenueTodayIsLoading}
            type="revenue today"
          />
          <CardGeneral
            title="THIS WEEK"
            body={salesCardBodyGenerator("revenue-week")}
            error={ordersRevenueWeekError}
            loading={ordersRevenueWeekIsLoading}
            typr="revenue week"
          />
        </div>
      </div>
    </>
  );
}
