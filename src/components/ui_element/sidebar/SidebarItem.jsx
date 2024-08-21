import { useSidebarContext } from "../../../context/ui_context/Sidebar.context";

export function SidebarItem({ title, logo, onClick }) {
  const { selectedItem } = useSidebarContext();
  return (
    <div className="sidebar-item" onClick={onClick}>
      <div className={selectedItem === title ? "sidebar-logo sidebar-logo-selected" : "sidebar-logo"}>{logo}</div>
      <p
        className={
          selectedItem === title ? "sidebar-title sidebar-title-selected" : "sidebar-title"
        }
      >
        {title}
      </p>
    </div>
  );
}
