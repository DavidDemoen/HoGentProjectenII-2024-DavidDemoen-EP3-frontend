import { PendingOrdersItem } from "./PendingOrdersItem";
import "../../../../styles/ui_element/listTable_styles.css";
import { PaginationBox } from "../../ui_element/pagination/PaginationBox";
import { TableFilterBox } from "../../ui_element/table/TableFilterBox";

export function PendingOrdersList({
  orders,
  searchDate,
  setSearchDate,
  setSearchReferenceId,
  searchReferenceId,
  setSearchBuyerAccountName,
  searchBuyerAccountName,
  setSearchStatus,
  searchStatus,
}) {
  return (
    <>
      <table className="table-main-container">
        <thead className="table-header">
          <tr>
            <th>Date</th>
            <th>Buyer Account</th>
            <th>Reference ID</th>
            <th>Status</th>
            <th>Details and Edit</th>
          </tr>
          <tr>
            <TableFilterBox
              subject="date"
              search={searchDate}
              setSearch={setSearchDate}
            />
            <TableFilterBox
              subject="buyerAccountName"
              search={searchBuyerAccountName}
              setSearch={setSearchBuyerAccountName}
            />
            <TableFilterBox
              subject="referenceId"
              search={searchReferenceId}
              setSearch={setSearchReferenceId}
            />
            <TableFilterBox
              subject="status"
              search={searchStatus}
              setSearch={setSearchStatus}
            />
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <PendingOrdersItem
              key={order.id}
              date={order.date}
              referenceId={order.referenceId}
              id={order.id}
              buyerAccountId={order.buyerAccountId}
              status={order.orderStatusName}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}
