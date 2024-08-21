import useSWR from "swr";
import { getById } from "../../../api";
import AsyncData from "../../AsyncData";
import { useAdminDashboardContext } from "../../../context/AdminDashboard.context";

export function PendingOrdersItem({
  id,
  date,
  referenceId,
  buyerAccountId,
  status,
}) {
  const { setPendingOrderDetailId } = useAdminDashboardContext();

  const {
    data: buyerAccountDATA = { account: {} },
    error: buyerAccountError,
    isLoading: buyerAccountIsLoading,
  } = useSWR({ url: `accounts/${buyerAccountId}` }, getById);

  const {
    account: { first_name, last_name },
  } = buyerAccountDATA;

  const handleClickDetails = () => {
    setPendingOrderDetailId(id);
  };

  return (
    <>
      <AsyncData
        loading={buyerAccountIsLoading}
        error={buyerAccountError}
        type="Order Data"
      >
        <tr className="table-row">
          <td>{date}</td>
          <td>
            {first_name} {last_name}
          </td>

          <td>{referenceId}</td>
          <td>{status}</td>
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
