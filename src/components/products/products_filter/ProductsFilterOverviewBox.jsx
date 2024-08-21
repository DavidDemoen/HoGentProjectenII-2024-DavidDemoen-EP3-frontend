import { ProductsFilterOverviewItem } from "./ProductsFilterOverviewItem";

export function ProductsFilterOverviewBox({
  items,
  addFunction,
  removeFunction,
  resetFunction,
  closeFunction,
  checkedItems,
}) {
  const checkItemChecked = (id) => {
    return checkedItems.some((item) => item.id === id);
  };
  return (
    <>
      <div className="filter-overview-box">
        <div className="filter-overview-items">
          {items.map((item) => (
            <ProductsFilterOverviewItem
              key={item.id}
              item={item}
              addFunction={addFunction}
              removeFunction={removeFunction}
              resetFunction={resetFunction}
              checked={checkItemChecked(item.id)}
            />
          ))}
        </div>
        <div className="filter-overview-button-box">
          <p
            className="filter-overview-button"
            onClick={() => resetFunction()}
          >
            Reset filter
          </p>
          <p className="filter-overview-button" onClick={closeFunction}>
            Close filter
          </p>
        </div>
      </div>
    </>
  );
}
