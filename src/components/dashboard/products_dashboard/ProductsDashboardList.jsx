import { ProductsDashboardItem } from "./ProductsDashboardItem";
import AsyncData from "../../AsyncData";
import { useProductsAPIContext } from "../../../context/Products.API.context";

export function ProductsDashboardList() {
  const { productsDATA, productsError, productsIsLoading } =
    useProductsAPIContext();
  const { products } = productsDATA;
  return (
    <>
      <div>
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
      </div>
    </>
  );
}
