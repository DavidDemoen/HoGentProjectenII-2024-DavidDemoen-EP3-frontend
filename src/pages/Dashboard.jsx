import { useEffect } from "react";
import { useAccountsContext } from "../context/Accounts.context";
import { GeneralDashboard } from "../components/dashboard/GeneralDashboard";
import "../../styles/dashboard_styles.css";

export function Dashboard({ type }) {
  const { loggedInAccount } = useAccountsContext();

  const accountTypeName = loggedInAccount?.accountTypeName || null;

  const renderDashboard = () => {
    if (accountTypeName == "ADMIN") {
      return (
        <GeneralDashboard defaultType="Sales Metrics" accountType="ADMIN" />
      );
    }
    if (accountTypeName == "PURCHASER") {
      return (
        <GeneralDashboard
          defaultType="Company Metrics"
          accountType="PURCHASER"
        />
      );
    }
    return <h1>NOT LOGGED IN WITH RIGHT ACCOUNT</h1>;
  };
  useEffect(() => {
    renderDashboard();
  }, [accountTypeName]);

  return (
    <>
      <div>{renderDashboard()}</div>
    </>
  );
}
