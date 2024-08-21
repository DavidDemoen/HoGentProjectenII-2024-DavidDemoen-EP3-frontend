import { useAdminDashboardContext } from "../../context/AdminDashboard.context";
import "../../../styles/dashboard_styles.css";
import { useEffect } from "react";
import { useAccountsContext } from "../../context/Accounts.context";
import useSWR from "swr";
import { getById } from "../../api";

export function DashboardBox({ type }) {
  const { renderDashboard, setDashboard } = useAdminDashboardContext();
  const { loggedInAccount } = useAccountsContext();

  const {
    data: companyDATA = { company: {} },
    error: companyError,
    isLoading: companyIsLoading,
  } = useSWR(
    loggedInAccount ? { url: `companies/${loggedInAccount.companyId}` } : null,
    getById
  );

  useEffect(() => {
    setDashboard(type);
  }, [type]);

  return (
    <>{renderDashboard(companyDATA.company, companyIsLoading, companyError)}</>
  );
}
