import useSWR from "swr";
import { useAccountsContext } from "../../../context/Accounts.context";
import { getById } from "../../../api";
import AsyncData from "../../AsyncData";
import '../../../../styles/ui_element/listTable_styles.css';

export function CompanyDashboardBox({
  company,
  loading: isLoading,
  error: isError,
}) {
  const {
    data: addressDATA = {
      address: {
        city: "",
        country: "",
        street: "",
        number: "",
        postalCode: "",
      },
    },
    error: addressError,
    isLoading: addressIsLoading,
  } = useSWR(
    company?.addressId ? { url: `addresses/${company.addressId}` } : null,
    getById
  );

  const { email, has_shop, name, phone } = company;

  const {
    address: { city, country, street, number, postalCode },
  } = addressDATA;

  return (
    <div>
      <AsyncData
        loading={isLoading || addressIsLoading}
        error={isError || addressError}
        type="Company data"
      >
        <div className="list-table-box">
          <div className="list-table-item">
            <p className="list-table-item-label">Company name:</p>
            <p className="list-table-item-text"> {name}</p>
          </div>
          <div className="list-table-item">
            <p className="list-table-item-label">Company email:</p>
            <p className="list-table-item-text"> {email}</p>
          </div>
          <div className="list-table-item">
            <p className="list-table-item-label">Company phone:</p>
            <p className="list-table-item-text"> {phone}</p>
          </div>
          <div className="list-table-item">
            <p className="list-table-item-label">Company has a shop:</p>
            <p className="list-table-item-text"> {has_shop ? "Yes" : "No" }</p>
          </div>
          <div className="list-table-item">
            <p className="list-table-item-label">Company address:</p>
            <p className="list-table-item-text">
              {street} {number}, {postalCode} {city}, {country}
            </p>
          </div>
        </div>
        <div className="dashboard-company-purchasers"></div>
      </AsyncData>
    </div>
  );
}
