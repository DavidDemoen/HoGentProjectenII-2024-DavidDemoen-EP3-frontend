import { SearchBox } from "../../ui_element/search/SearchBox";

export function ProductsSearchbarBox({ setSearch, search }) {
  return (
    <>
      <SearchBox search={search} setSearch={setSearch} />
    </>
  );
}
