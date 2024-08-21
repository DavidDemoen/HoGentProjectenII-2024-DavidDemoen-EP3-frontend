import { ProductsDashboardItem } from "./ProductsDashboardItem";
import "../../../../styles/ui_element/listTable_styles.css";

export function ProductsDashboardList({ products, companyId }) {
  console.log(products);
  return (
    <>
      <table className="table-main-container">
        <thead className="table-header">
          <tr>
            <th>Reference Id</th>
            <th>Product Name</th>
            <th>Manufacturer</th>
            <th>Product Category</th>
            <th>Current Stock</th>
            <th>Current Unit Price</th>
            <th>Current Unit Discount</th>
            <th>Details and Edit</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <ProductsDashboardItem
              key={index}
              {...product}
              companyId={companyId}
            />
          ))}
        </tbody>
      </table>
      {/* <div>
        <div className="products-list-box-title">
          <p>PRODUCT NAME</p>
        </div>
        <AsyncData
          error={productsError}
          loading={productsIsLoading}
          type="products"
        >
          <div className="products-list-body">
            {products.map((product) => (
              <ProductsDashboardItem key={product.id} {...product} />
            ))}
          </div>
        </AsyncData>
      </div> */}
    </>
  );
}
