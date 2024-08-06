import { ProductsDashboardList } from "./ProductsDashboardList";
import { useNavigate } from "react-router";

export function ProductsDashboardBox() {
  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate("/dashboard/products/add");
  };

  return (
    <>
      <div>
        <h1>PRODUCTS-METRICS-PLACEHOLDER</h1>
        <button onClick={handleAddClick}>Add New Product</button>
        <ProductsDashboardList />
      </div>
    </>
  );
}
