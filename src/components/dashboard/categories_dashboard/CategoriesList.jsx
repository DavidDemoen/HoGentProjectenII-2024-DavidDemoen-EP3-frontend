import "../../../../styles/ui_element/listTable_styles.css";
import { CategoriesListItem } from "./CategoriesListItem";

export function CategoriesList({ categories }) {
  console.log(categories);


  return (
    <>
      <table className="table-main-container">
        <thead className="table-header">
          <tr>
            <th>Reference Id</th>
            <th>Category Name</th>
            <th>Category Description</th>
            <th>Details and Edit</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <CategoriesListItem key={index} {...category} />
          ))}
        </tbody>
      </table>
    </>
  );
}
