import "../../../../styles/ui_element/listTable_styles.css";
import { PurchasersItem } from "./PurchasersItem";

export function PurchasersList({ accounts }) {
  console.log(accounts);

  return (
    <>
      <table className="table-main-container">
        <thead className="table-header">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Account Type</th>
            <th>Gender</th>
            <th>Active Account</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account, index) => (
            <PurchasersItem {...account} key={index} />
          ))}
        </tbody>
      </table>
    </>
  );
}
