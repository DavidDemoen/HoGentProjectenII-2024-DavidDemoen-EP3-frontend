import { useEffect } from "react";
import AsyncData from "../../AsyncData";
import { PurchasersList } from "./PurchasersList";
import "../../../../styles/dashboard_styles.css"

export function PurcharsersDashboardBox({ company, loading, error }) {
  console.log(company);

  const filterAccounts = (accounts) => {
    return accounts
      ? accounts.filter((account) => account.accountTypeName === "PURCHASER")
      : [];
  };

  return (
    <div>
      <AsyncData loading={loading} error={error} type="Account data">
        <div className="purchasers-main-container">
          <div className="purchasers-list-title">
            Company Purchasing Accounts
          </div>
          <PurchasersList accounts={filterAccounts(company.accounts)} />
        </div>
      </AsyncData>
    </div>
  );
}
