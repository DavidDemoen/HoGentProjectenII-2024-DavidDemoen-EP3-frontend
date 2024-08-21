import { useAdminDashboardContext } from "../../../context/AdminDashboard.context";
import { AdminOrdersList } from "./AdminOrdersList";
import { useAccountsContext } from "../../../context/Accounts.context";
import useSWR from "swr";
import { getById } from "../../../api";
import AsyncData from "../../AsyncData";
import { AdminOrderDetailBox } from "./adminOrders_details/AdminOrderDetailbox";

export function OrdersDashboardBox() {
  const { adminOrderDetailId } = useAdminDashboardContext();
  const {
    loggedInAccount: { companyId },
  } = useAccountsContext();

  const {
    data: outgoingOrdersDATA = { orders: [] },
    error: outgoingOrdersError,
    isLoading: outgoingOrdersIsLoading,
  } = useSWR(
    companyId ? { url: `orders/company/${companyId}` } : null,
    getById
  );
  const { orders: outgoingOrders } = outgoingOrdersDATA;

  const {
    data: incomingOrdersDATA = { orders: [] },
    error: incomingOrdersError,
    isLoading: incomingOrdersIsLoading,
  } = useSWR({ url: `orders/buyer/company/${companyId}` }, getById);
  const { orders: incomingOrders } = incomingOrdersDATA;

  if (adminOrderDetailId) {
    return <AdminOrderDetailBox orderId={adminOrderDetailId} />;
  }

  return (
    <>
      <div className="pendingorders-main-container">
        <div className="orders-table-main-container">
          <div className="pendingorders-list-title">Outgoing Orders</div>
          <AsyncData
            loading={outgoingOrdersIsLoading}
            error={outgoingOrdersError}
            type="Outgoing Orders Data"
          >
            <AdminOrdersList type="outgoing" orders={outgoingOrders} />
          </AsyncData>
        </div>
        <div className="orders-table-main-container">
          <div className="pendingorders-list-title">Incoming Orders</div>
          <AdminOrdersList type="incoming" orders={incomingOrders} />
        </div>
      </div>
    </>
  );
}
