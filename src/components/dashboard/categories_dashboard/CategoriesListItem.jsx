import { useAdminDashboardContext } from "../../../context/AdminDashboard.context";

export function CategoriesListItem({ referenceId, name, description }) {
  const { setCategoryDetailId } = useAdminDashboardContext();

  const handleClickDetails = () => {
    setCategoryDetailId(referenceId);
  };

  return (
    <>
      <tr className="table-row">
        <td>{referenceId}</td>
        <td>{name}</td>
        <td>{description}</td>
        <td>
          <button className="table-button" onClick={handleClickDetails}>
            Details and edit
          </button>
        </td>
      </tr>
    </>
  );
}
