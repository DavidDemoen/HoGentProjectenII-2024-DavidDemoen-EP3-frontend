import { CheckoutPersonalInfoForm } from "./CheckoutPersonalInfoForm";
import AsyncData from "../../AsyncData";
import { useAccountsContext } from "../../../context/Accounts.context";
import { getById } from "../../../api";
import useSWR from "swr";

export function CheckoutPersonalInfoBox() {
  const { shopCompany: companyId } = useAccountsContext();

  const {
    data: companyDATA = { company: {} },
    error: companyError,
    isLoading: companyIsLoading,
  } = useSWR({ url: `companies/${companyId}` }, getById);
  const { company } = companyDATA;

  const {
    data: shopAddressDATA = { address: {} },
    error: addressError,
    isLoading: addressIsLoading,
  } = useSWR(
    company.addressId ? { url: `addresses/${company.addressId}` } : null,
    getById
  );
  const { address: billingAddress } = shopAddressDATA;

  const {
    data: allGenderDATA = { genders: [] },
    error: allGenderError,
    isLoading: allGenderIsLoading,
  } = useSWR({ url: `gender` }, getById);
  const { genders } = allGenderDATA;

  const setSalutationOptions = () => {
    return genders.map((gender) => {
      return { id: gender.id, name: gender.salutation };
    });
  };

  return (
    <>
      <div className="checkout-form-container">
        <AsyncData
          loading={addressIsLoading || allGenderIsLoading || companyIsLoading}
          error={addressError || allGenderError || companyError}
          type="Buyer Account Information"
        >
          <CheckoutPersonalInfoForm
            billingAddress={billingAddress}
            salutationOptions={setSalutationOptions()}
          />
        </AsyncData>
      </div>
    </>
  );
}
