export function SidebarItem({ title, logo, onClick }) {
  return (
    <div className="sidebar-item" onClick={onClick}>
      <div className="sidebar-logo">{logo}</div>
      <p>{title}</p>
    </div>
  );
}
