import useSWR from "swr";
import { useAdminDashboardContext } from "../../../context/AdminDashboard.context";
import AsyncData from "../../AsyncData";
import { getById } from "../../../api";

export function AdminOrdersItem({
  id,
  date,
  referenceId,
  orderStatusName: status,
  buyerAccountId,
  sellerCompanyId,
  type,
}) {
  const { setAdminOrderDetailId } = useAdminDashboardContext();

  const {
    data: buyerAccountDATA = { account: {} },
    error: buyerAccountError,
    isLoading: buyerAccountIsLoading,
  } = useSWR({ url: `accounts/${buyerAccountId}` }, getById);
  const {
    data: sellerCompanyDATA = { company: {} },
    error: sellerCompanyError,
    isLoading: sellerCompanyIsLoading,
  } = useSWR({ url: `companies/${sellerCompanyId}` }, getById);

  const handleClickDetails = () => {
    setAdminOrderDetailId(id);
  };

  return (
    <>
      <AsyncData
        loadin={sellerCompanyIsLoading || buyerAccountIsLoading}
        error={sellerCompanyError || buyerAccountError}
        type="Account Data"
      >
        <tr className="table-row">
          <td>{date}</td>
          <td>
            {type === "outgoing" ? (
              <>
                {buyerAccountDATA.account.first_name}
                {buyerAccountDATA.account.last_name}
              </>
            ) : (
              sellerCompanyDATA.company.name
            )}
          </td>
          <td>{referenceId}</td>
          <td>{status}</td>
          <td>
            <button className="table-button" onClick={handleClickDetails}>
              Details
            </button>
          </td>
        </tr>
      </AsyncData>
    </>
  );
}
