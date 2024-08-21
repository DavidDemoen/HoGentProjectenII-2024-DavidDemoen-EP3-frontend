import * as YUP from "yup";
import { useFormik } from "formik";
import { FormInputField } from "../../ui_element/forms/FormInputField";
import { useAccountsContext } from "../../../context/Accounts.context";
import { useCheckoutContext } from "../../../context/Checkout.context";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { IoSaveOutline } from "react-icons/io5";

const schema = YUP.object({
  street: YUP.string().required("Street is required"),
  number: YUP.number().required("Number is required").min(1),
  city: YUP.string().required("City is required"),
  postalCode: YUP.number().required("Postal code is required").min(1000),
  country: YUP.string().required("Country is required"),
});

export function CheckoutPersonalInfoForm({
  billingAddress,
  salutationOptions,
}) {
  const { supplierAccount } = useAccountsContext();
  const { orderBillingAddress, setOrderBillingAddress, setCheckoutStep } =
    useCheckoutContext();

  const [isInEditMode, setIsInEditMode] = useState({
    billingAddress: false,
  });

  const handleClickEditBillingAddress = () => {
    setIsInEditMode((prevState) => ({
      ...prevState,
      billingAddress: !prevState.billingAddress,
    }));
  };
  const handleClickSaveBillingAddress = async () => {
    await formik.validateField("street");
    await formik.validateField("number");
    await formik.validateField("city");
    await formik.validateField("postalCode");
    await formik.validateField("country");

    const isValid =
      !formik.errors.street &&
      !formik.errors.number &&
      !formik.errors.city &&
      !formik.errors.postalCode &&
      !formik.errors.country;

    console.log(isValid);
    if (isValid) {
      formik.handleSubmit();
      setIsInEditMode((prevState) => ({
        ...prevState,
        billingAddress: !prevState.billingAddress,
      }));
    }
  };

  const initialValues = () => {
    return {
      firstName: supplierAccount.first_name,
      lastName: supplierAccount.last_name,
      salutation: supplierAccount.gender.salutation,
      street: orderBillingAddress?.street || billingAddress.street,
      number: orderBillingAddress?.number || billingAddress.number,
      city: orderBillingAddress?.city || billingAddress.city,
      postalCode: orderBillingAddress?.postalCode || billingAddress.postalCode,
      country: orderBillingAddress?.country || billingAddress.country,
    };
  };
  const onSubmit = async ({ street, number, city, postalCode, country }) => {
    setOrderBillingAddress({ street, number, city, postalCode, country });
  };
  const handleClickShipping = async () => {
    await formik.validateField("street");
    await formik.validateField("number");
    await formik.validateField("city");
    await formik.validateField("postalCode");
    await formik.validateField("country");

    const isValid =
      !formik.errors.street &&
      !formik.errors.number &&
      !formik.errors.city &&
      !formik.errors.postalCode &&
      !formik.errors.country;

    console.log(isValid);
    if (isValid) {
      const { street, number, city, postalCode, country } = formik.values;
      setOrderBillingAddress({ street, number, city, postalCode, country });
      setCheckoutStep("shipping");
    }
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: schema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit,
  });

  return (
    <>
      <div className="checkout-form-topbox">
        <div className="checkout-form-title">
          Purchasing Account Information
        </div>

        <FormInputField
          id="salutation"
          name="salutation"
          label="Salutation"
          type="radio"
          options={salutationOptions}
          formik={formik}
          disabled={true}
        />
        <FormInputField
          id="firstName"
          name="firstName"
          label="First name"
          type="text"
          formik={formik}
          disabled={true}
        />
        <FormInputField
          id="lastName"
          name="lastName"
          label="Last name"
          type="text"
          formik={formik}
          disabled={true}
        />
      </div>
      <div className="checkout-form-secondary-box">
        <div className="checkout-form-title checkout-form-subtitle">
          Billing Address
        </div>
        <div
          className="list-table-edit-box"
          onClick={
            isInEditMode.billingAddress
              ? handleClickSaveBillingAddress
              : handleClickEditBillingAddress
          }
        >
          {isInEditMode.billingAddress ? (
            <>
              <IoSaveOutline />
              <p>Save Changes</p>
            </>
          ) : (
            <>
              <CiEdit />
              <p>Edit Data</p>
            </>
          )}
        </div>
        <FormInputField
          id="street"
          name="street"
          label="Street"
          type="text"
          formik={formik}
          disabled={!isInEditMode.billingAddress}
        />
        <FormInputField
          id="number"
          name="number"
          label="Number"
          type="text"
          formik={formik}
          disabled={!isInEditMode.billingAddress}
        />
        <FormInputField
          id="city"
          name="city"
          label="City"
          type="text"
          formik={formik}
          disabled={!isInEditMode.billingAddress}
        />
        <FormInputField
          id="postalCode"
          name="postalCode"
          label="Postal Code"
          type="text"
          formik={formik}
          disabled={!isInEditMode.billingAddress}
        />
        <FormInputField
          id="country"
          name="country"
          label="Country"
          type="text"
          formik={formik}
          disabled={!isInEditMode.billingAddress}
        />
        <div className="checkout-form-button-container">
          <button
            className="checkout-form-button"
            onClick={handleClickShipping}
          >
            Proceed to Shipping
          </button>
        </div>
      </div>
    </>
  );
}
