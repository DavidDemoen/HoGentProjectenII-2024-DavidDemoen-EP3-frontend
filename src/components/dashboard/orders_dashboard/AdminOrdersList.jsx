import { AdminOrdersItem } from "./AdminOrdersItem";

export function AdminOrdersList({ type, orders }) {
  console.log(orders);
  return (
    <>
      <table className="table-main-container">
        <thead className="table-header">
          <tr>
            <th>Date</th>
            {type === "outgoing" ? (
              <th>Buyer Account</th>
            ) : (
              <th>Selling Company</th>
            )}
            <th>Reference ID</th>
            <th>Status</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <AdminOrdersItem {...order} type={type} key={index} />
          ))}
        </tbody>
      </table>
    </>
  );
}
