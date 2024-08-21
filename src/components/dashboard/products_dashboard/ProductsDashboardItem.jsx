import { useAdminDashboardContext } from "../../../context/AdminDashboard.context";
import useSWR from "swr";
import { getById } from "../../../api";
import AsyncData from "../../AsyncData";

export function ProductsDashboardItem({
  id,
  referenceId,
  name,
  currentUnitPrice,
  currentProductDiscount,
  productCategoryId,
  manufacturerId,
  companyId,
}) {
  const { setProductDetailId } = useAdminDashboardContext();

  const {
    data: productCategoryDATA = { category: [] },
    error: productCategoriesError,
    isLoading: productCategoriesIsLoading,
  } = useSWR({ url: `productCategories/${productCategoryId}` }, getById);
  const { category } = productCategoryDATA;

  const {
    data: manufacturerDATA = { manufacturer: [] },
    error: manufacturerError,
    isLoading: manufacturerIsLoading,
  } = useSWR({ url: `manufacturers/${manufacturerId}` }, getById);
  const { manufacturer } = manufacturerDATA;

  const {
    data: stockDATA = { stock: [] },
    error: stockError,
    isLoading: stockIsLoading,
  } = useSWR({ url: `companies/${companyId}/products/${id}/stock` }, getById);
  const { stock } = stockDATA;

  const handleClickDetails = () => {
    setProductDetailId(id);
  };

  return (
    <>
      <AsyncData
        loading={productCategoriesIsLoading}
        error={productCategoriesError}
        type="Product data"
      >
        <tr className="table-row">
          <td>{referenceId}</td>
          <td>{name}</td>
          <td>{manufacturer.name}</td>
          <td>{category.name}</td>
          <td>{stock}</td>
          <td>€ {currentUnitPrice}</td>
          <td>{currentProductDiscount}</td>
          <td>
            <button className="table-button" onClick={handleClickDetails}>
              Details and edit
            </button>
          </td>
        </tr>
      </AsyncData>
    </>
  );
}
