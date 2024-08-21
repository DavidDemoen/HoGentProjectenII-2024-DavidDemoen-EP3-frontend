export function FooterItemBox({ title, items }) {
  return (
    <div className="footer-item-box">
      <div className="footer-item-title-box">
        <p className="footer-item-title-text">{title}</p>
      </div>
      <div className="footer-item-list">
        {items.map(({ link, name }, index) => (
          <div key={index} className="footer-item-link-box">
            <p className="footer-item-link-text">{name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
