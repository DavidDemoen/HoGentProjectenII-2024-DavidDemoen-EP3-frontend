import useSWR from "swr";
import { getById } from "../../../api";
import AsyncData from "../../AsyncData";

export function PurchasersItem({
  first_name,
  last_name,
  email,
  phone,
  accountTypeName,
  is_active,
  genderId,
}) {
  const {
    data: genderDATA = { gender: {} },
    error: genderError,
    isLoading: genderIsLoading,
  } = useSWR({ url: `gender/${genderId}` }, getById);

  const { gender } = genderDATA;

  return (
    <>
      <AsyncData
        loading={genderIsLoading}
        error={genderError}
        type="Account data"
      >
        <tr className="table-row">
          <td>
            {first_name} {last_name}
          </td>
          <td>{email}</td>
          <td>{phone}</td>
          <td>{accountTypeName}</td>
          <td>{gender.name}</td>
          <td>{is_active ? "Active" : "Inactive"}</td>
        </tr>
      </AsyncData>
    </>
  );
}
