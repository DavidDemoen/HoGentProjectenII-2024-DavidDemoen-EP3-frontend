import { SidebarItem } from "./SidebarItem";
import "../../../../styles/ui_element/sidebar_styles.css";
import { useSidebarContext } from "../../../context/ui_context/Sidebar.context";

export function SidebarGeneral({ content, onClick }) {
  const { selectedItem } = useSidebarContext();

  console.log(selectedItem);

  return (
    <>
      <div className="sidebar-box">
        {content.map((item) => {
          return (
            <div key={item.title} className="sidebar-item">
              <SidebarItem
                {...item}
                onClick={() => onClick(item.title, item.url)}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
