import "../../../../styles/ui_element/sortbox_styles.css";

export function SortBox({ sort, setSort, options }) {
  const onSelectChange = ({ currentTarget: input }) => {
    setSort({ sort: input.value, order: sort.order });
  };
  const handleArrowClick = () => {
    setSort({ sort: sort.sort, order: sort.order === "asc" ? "desc" : "asc" });
  };
  return (
    <>
      <div className="sortbox-container">
        <p className="sortbox-sortby">Sort By:</p>
        <select
          defaultValue={sort.sort}
          className="sortbox-select"
          onChange={onSelectChange}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <button className="sortbox-arrow-btn" onClick={handleArrowClick}>
          <p className="sortbox-up_arrow">&uarr;</p>
          <p className="sortbox-down_arrow">&darr;</p>
        </button>
      </div>
    </>
  );
}
