export function ProductsFilterOverviewItem({
  item,
  addFunction,
  removeFunction,
  checked,
}) {
  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      addFunction(item);
    }
    if (!e.target.checked) {
      removeFunction(item);
    }
  };

  return (
    <>
      <div className="filter-overview-item">
        <input
          type="checkbox"
          id={`filter-${item.name}`}
          className="filter-overview-item-checkbox"
          checked={checked}
          onChange={handleCheckboxChange}
        />
        <label
          htmlFor={`filter-${item.name}`}
          className="filter-overview-item-label"
        >
          <p>{item.name}</p>
        </label>
      </div>
    </>
  );
}
