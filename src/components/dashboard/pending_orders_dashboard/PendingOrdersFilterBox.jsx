import { SearchBox } from "../../ui_element/search/SearchBox";
import { SortBox } from "../../ui_element/sort/SortBox";

const sortOptions = [
  { value: "date", label: "Date" },
  { value: "referenceId", label: "Reference ID" },
  { value: "buyerAccountId", label: "Buyer Account" },
  { value: "orderStatusName", label: "Status" },
];

export function PendingOrdersFilterBox({ sort, setSort }) {
  return (
    <>
      <div className="pendingorders-filter-container">
        <div></div>
        <div className="order-filterbox">
          <SortBox options={sortOptions} sort={sort} setSort={setSort} />
        </div>
      </div>
    </>
  );
}
