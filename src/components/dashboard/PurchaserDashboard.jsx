import { SidebarGeneral } from "../ui_element/sidebar/SidebarGeneral";
import { useSidebarContext } from "../../context/ui_context/Sidebar.context";
import { useNavigate } from "react-router";
import { useAdminDashboardContext } from "../../context/AdminDashboard.context";
import { DashboardBox } from "./DashboardBox";

export function PurchaserDashboard() {
  const { purchaserSidebarContent } = useSidebarContext();
  const { setDashboard } = useAdminDashboardContext();

  const navigate = useNavigate();

  const handleOnClick = (type, url) => {
    navigate(`/dashboard/${url}`);
  };

  return (
    <>
      <div>
        <SidebarGeneral
          content={purchaserSidebarContent}
          onClick={handleOnClick}
        />
        <DashboardBox type={type} />
      </div>
    </>
  );
}
