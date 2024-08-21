import { DashboardBox } from "./DashboardBox";
import { SidebarGeneral } from "../ui_element/sidebar/SidebarGeneral";
import { useSidebarContext } from "../../context/ui_context/Sidebar.context";
import { useAdminDashboardContext } from "../../context/AdminDashboard.context";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { DashboardHeader } from "./DashboardHeader";

export function GeneralDashboard({ accountType, defaultType }) {
  const { adminSidebarContent, purchaserSidebarContent, setSelectedItem } =
    useSidebarContext();
  const { setDashboard, setCategoriesMainBox } = useAdminDashboardContext();

  const navigate = useNavigate();

  useEffect(() => {
    setSelectedItem(defaultType);
  }, [defaultType]);

  const handleOnClick = (type, url) => {
    navigate(`/dashboard/${url}`);
    setDashboard(type);
    setCategoriesMainBox("add");
    setSelectedItem(type);
  };
  const fetchSidebarContent = () => {
    if (accountType === "ADMIN") {
      return adminSidebarContent;
    }
    if (accountType === "PURCHASER") {
      return purchaserSidebarContent;
    }
  };

  return (
    <>
      <DashboardHeader type={accountType} />
      <div className="general-dashboard-box">
        <SidebarGeneral
          content={fetchSidebarContent()}
          onClick={handleOnClick}
        />
        <DashboardBox type={defaultType} />
      </div>
    </>
  );
}
