import { useAdminDashboardContext } from "../../context/AdminDashboard.context";
import "../../../styles/dashboard_styles.css";
import { useEffect } from "react";

export function DashboardBox({ type }) {
  const { renderDashboard, setDashboard } = useAdminDashboardContext();

  useEffect(() => {
    setDashboard(type);
  }, [type]);

  return (
    <>
      <div>
        <h1>DASHBOARDBOX-PLACEHOLDER</h1>
        {renderDashboard()}
      </div>
    </>
  );
}
