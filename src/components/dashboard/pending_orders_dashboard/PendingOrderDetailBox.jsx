import useSWR from "swr";
import { getById } from "../../../api";
import AsyncData from "../../AsyncData";
import { OrderDetailsForm } from "./OrderDetailsForm";
import { useAdminDashboardContext } from "../../../context/AdminDashboard.context";

export function PendingOrderDetailBox({ orderId, buyerCompany }) {
  const { setPendingOrderDetailId } = useAdminDashboardContext();

  const {
    data: pendingOrderDetailDATA = { order: {} },
    error: pendingOrderDetailError,
    isLoading: pendingOrderDetailIsLoading,
  } = useSWR(orderId ? { url: `orders/${orderId}` } : null, getById);
  const { order } = pendingOrderDetailDATA;

  const handleClickBackToOrders = () => {
    setPendingOrderDetailId(null);
  };

  return (
    <>
      <div className="pendingorders-main-container">
        <AsyncData
          loading={pendingOrderDetailIsLoading}
          error={pendingOrderDetailError}
          type="Order Data"
        >
          <div className="pendingorders-header">
            <div className="pendingorders-list-title">
              Pending Order Detail {order.referenceId}
            </div>
            <p onClick={handleClickBackToOrders}>Back to Orders</p>
          </div>
          <OrderDetailsForm {...order} buyerCompany={buyerCompany} />
        </AsyncData>
      </div>
    </>
  );
}
