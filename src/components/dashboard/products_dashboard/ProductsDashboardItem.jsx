import { useNavigate } from "react-router";
import { useProductsAPIContext } from "../../../context/Products.API.context";

export function ProductsDashboardItem({ id, name }) {
  const { setSelectedProductId, handleDeleteProduct } = useProductsAPIContext();

  const navigate = useNavigate();

  const handleEditClick = () => {
    //setSelectedProductId(id);
    navigate(`/dashboard/products/edit/${id}`);
  };
  const handleDeleteClick = () => {
    handleDeleteProduct(id);
  };

  return (
    <>
      <div className="products-list-item">
        <p>{name}</p>
        <button onClick={handleEditClick}>Edit</button>
        <button onClick={handleDeleteClick}>Delete</button>
      </div>
    </>
  );
}
