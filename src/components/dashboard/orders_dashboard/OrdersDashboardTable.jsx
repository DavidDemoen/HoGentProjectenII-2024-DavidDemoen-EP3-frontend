import { TableGeneral } from "../../ui_element/table/TableGeneral";
import { useOrdersAPIContext } from "../../../context/Orders.API.context";
import { useAdminDashboardContext } from "../../../context/AdminDashboard.context";
import AsyncData from "../../AsyncData";
import { useEffect, useState } from "react";

const header = ["DATE", "PAID", "RECIPIENT", "ITEMS", "DETAILS"];

export function OrdersDashboardTable() {
  const [processedOrders, setProcessedOrders] = useState([]);
  const { setSelectedOrderId } = useOrdersAPIContext();
  const { setOrdersMainBox } = useAdminDashboardContext();

  const handleClickDetails = (orderId) => {
    setOrdersMainBox("details");
    setSelectedOrderId(orderId);
  };

  const buttons = [
    {
      name: "Details",
      onClick: handleClickDetails,
      disabled: false,
    },
  ];
  const tableKeys = [
    "date",
    "paymentStatusName",
    "buyerAccountId",
    "itemsTable",
  ];
  const {
    ordersMainAccountDATA,
    ordersMainAccountError,
    ordersMainAccountIsLoading,
  } = useOrdersAPIContext();

  const { orders } = ordersMainAccountDATA;

  useEffect(() => {
    if (orders) {
      const updatedOrders = orders.map((order) => ({
        ...order,
        itemsTable: createItemsTable(order.order_items),
      }));
      setProcessedOrders(updatedOrders);
    }
  }, [orders]);

  const createItemsTable = (orderItems) => {
    return (
      <table>
        <tbody>
          {orderItems.map((item, index) => (
            <tr key={index}>
              <td>{item.product.name}</td>
              <td>x {item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  console.log(processedOrders);

  return (
    <>
      <div>
        <h1>ORDERS-METRICS-PLACEHOLDER</h1>
      </div>
      <p>Orders</p>
      <AsyncData
        loading={ordersMainAccountIsLoading}
        error={ordersMainAccountError}
        type="orders"
      >
        <TableGeneral
          header={header}
          data={processedOrders}
          buttons={buttons}
          tableKeys={tableKeys}
        />
      </AsyncData>
    </>
  );
}
