import useSWR from "swr";
import { getById } from "../../../../api";
import { useAdminDashboardContext } from "../../../../context/AdminDashboard.context";
import AsyncData from "../../../AsyncData";
import { AdminOrderDetailForm } from "./AdminOrderDetailForm";

export function AdminOrderDetailBox({ orderId, buyerCompany }) {
  const { setAdminOrderDetailId } = useAdminDashboardContext();

  const {
    data: orderDATA = { order: {} },
    error: orderError,
    isLoading: orderIsLoading,
  } = useSWR(orderId ? { url: `orders/${orderId}` } : null, getById);
  const { order } = orderDATA;

  const handleClickBackToOrders = () => {
    setAdminOrderDetailId(null);
  };

  return (
    <>
      <div className="pendingorders-main-container">
        <AsyncData
          loading={orderIsLoading}
          error={orderError}
          type="Order Data"
        >
          <div className="pendingorders-header">
            <div className="pendingorders-list-title">
              Order Detail {order.referenceId}
            </div>
            <p onClick={handleClickBackToOrders}>Back to Orders</p>
          </div>
          <AdminOrderDetailForm {...order} />
        </AsyncData>
      </div>
    </>
  );
}
