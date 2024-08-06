import { DashboardBox } from "../components/dashboard/DashboardBox";
import { SidebarGeneral } from "../components/ui_element/sidebar/SidebarGeneral";
import { useSidebarContext } from "../context/ui_context/Sidebar.context";
import { useAdminDashboardContext } from "../context/AdminDashboard.context";
import { useNavigate } from "react-router";

export function Dashboard({ type }) {
  const { adminSidebarContent } = useSidebarContext();
  const { setDashboard, setCategoriesMainBox } = useAdminDashboardContext();
  //console.log(setDashboard);
  //console.log(adminSidebarContent);

  const navigate = useNavigate();

  const handleOnClick = (type, url) => {
    navigate(`/dashboard/${url}`);
    setDashboard(type);
    setCategoriesMainBox("add");
  };

  return (
    <>
      <div className="box box-with-sidebar">
        <SidebarGeneral content={adminSidebarContent} onClick={handleOnClick} />

        <DashboardBox type={type} />
      </div>
    </>
  );
}
