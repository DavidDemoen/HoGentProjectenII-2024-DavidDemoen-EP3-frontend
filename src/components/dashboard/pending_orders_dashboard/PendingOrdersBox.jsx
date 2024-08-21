import useSWR from "swr";
import { getById } from "../../../api";
import { useAccountsContext } from "../../../context/Accounts.context";
import AsyncData from "../../AsyncData";
import { PendingOrdersFilterBox } from "./PendingOrdersFilterBox";
import { PendingOrdersList } from "./PendingOrdersList";
import { useAdminDashboardContext } from "../../../context/AdminDashboard.context";
import { PendingOrderDetailBox } from "./PendingOrderDetailBox";
import { PaginationBox } from "../../ui_element/pagination/PaginationBox";
import { useState } from "react";

export function PendingOrdersBox({
  company,
  loading: companyLoading,
  error: companyError,
}) {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({ sort: "date", order: "desc" });
  const [searchDate, setSearchDate] = useState("");
  const [searchReferenceId, setSearchReferenceId] = useState("");
  const [searchBuyerAccountName, setSearchBuyerAccountName] = useState("");
  const [searchStatus, setSearchStatus] = useState("");

  const { loggedInAccount } = useAccountsContext();
  const { pendingOrderDetailId } = useAdminDashboardContext();
  const buyerId = loggedInAccount?.id || null;

  const {
    data: pendingOrdersDATA = { orders: [] },
    error: pendingOrdersError,
    isLoading: pendingOrdersIsLoading,
  } = useSWR(
    company.id
      ? {
          url: `orders?buyerCompanyId=${company.id}&page=${page}&sortBy=${sort.sort}&sortOrder=${sort.order}&searchDate=${searchDate}&searchReferenceId=${searchReferenceId}&searchBuyerAccountName=${searchBuyerAccountName}&searchOrderStatusName=${searchStatus}`,
        }
      : null,
    getById
  );

  console.log(pendingOrdersDATA);

  const { orders, pagination } = pendingOrdersDATA;

  if (pendingOrderDetailId) {
    return (
      <PendingOrderDetailBox
        orderId={pendingOrderDetailId}
        buyerCompany={company}
      />
    );
  }

  return (
    <>
      <AsyncData
        loading={pendingOrdersIsLoading || companyLoading}
        error={pendingOrdersError || companyError}
        type="Orders Data"
      >
        <div className="pendingorders-main-container">
          <div className="pendingorders-list-title">Pending Orders</div>
          <PendingOrdersFilterBox sort={sort} setSort={setSort} />
          <PendingOrdersList
            orders={orders}
            searchDate={searchDate}
            setSearchDate={setSearchDate}
            searchReferenceId={searchReferenceId}
            setSearchReferenceId={setSearchReferenceId}
            setSearchStatus={setSearchStatus}
            searchStatus={searchStatus}
            setSearchBuyerAccountName={setSearchBuyerAccountName}
            searchBuyerAccountName={searchBuyerAccountName}
          />
          <PaginationBox pagination={pagination} handlePageChange={setPage} />
        </div>
      </AsyncData>
    </>
  );
}
