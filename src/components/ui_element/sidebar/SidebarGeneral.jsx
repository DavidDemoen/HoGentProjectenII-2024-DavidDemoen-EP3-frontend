import { SidebarItem } from "./SidebarItem";
import "../../../../styles/ui_element/sidebar_styles.css";

export function SidebarGeneral({ content, onClick }) {
  //console.log(onClick);
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
