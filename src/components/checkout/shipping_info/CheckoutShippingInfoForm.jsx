import * as YUP from "yup";
import { useFormik } from "formik";
import { FormInputField } from "../../ui_element/forms/FormInputField";
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
  packaging: YUP.string().required("Packaging is required"),
});

export function CheckoutShippingInfoForm({ orderPackagings }) {
  const {
    orderBillingAddress,
    orderShippingAddress,
    orderPackaging,
    setOrderShippingAddress,
    setOrderPackaging,
    setCheckoutStep,
  } = useCheckoutContext();

  const [isInEditMode, setIsInEditMode] = useState({
    shippingAddress: false,
    packaging: false,
  });

  const handleClickEditShippingAddress = () => {
    setIsInEditMode((prevState) => ({
      ...prevState,
      shippingAddress: !prevState.shippingAddress,
    }));
  };
  const handleClickSaveShippingAddress = async () => {
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

    if (isValid) {
      formik.handleSubmit();
      setIsInEditMode((prevState) => ({
        ...prevState,
        shippingAddress: !prevState.shippingAddress,
      }));
    }
  };
  const handleClickEditPackaging = () => {
    setIsInEditMode((prevState) => ({
      ...prevState,
      packaging: !prevState.packaging,
    }));
  };
  const handleClickSavePackaging = () => {
    setOrderPackaging(filterPackaging(formik.values.packaging));
    setIsInEditMode((prevState) => ({
      ...prevState,
      packaging: !prevState.packaging,
    }));
  };

  const filterPackaging = (name) => {
    return orderPackagings.find((packaging) => packaging.name === name);
  };

  const initialValues = () => {
    return {
      street: orderShippingAddress?.street || "",
      number: orderShippingAddress?.number || "",
      city: orderShippingAddress?.city || "",
      postalCode: orderShippingAddress?.postalCode || "",
      country: orderShippingAddress?.country || "",
      packaging: orderPackaging?.name || "",
    };
  };
  const onSubmit = ({ packaging, ...rest }) => {
    setOrderShippingAddress(rest);
  };
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: schema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit,
  });
  const handleClickBillingAddress = () => {
    formik.setValues(orderBillingAddress);
    setOrderShippingAddress(orderBillingAddress);
  };
  const handleClickPayment = async () => {
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

    if (isValid) {
      const { packaging, ...address } = formik.values;
      const packagingObject = filterPackaging(packaging);
      setOrderShippingAddress(address);
      setOrderPackaging(packagingObject);
      setCheckoutStep("payment-methods");
    }
  };
  // const handleClickPackaging = () => {
  //   const { packaging } = formik.values;
  //   const packagingObject = filterPackaging(packaging);
  //   setOrderPackaging(packagingObject);
  // };
  const handleClickBilling = () => {
    setCheckoutStep("personal-info");
  };

  return (
    <>
      <div className="checkout-form-topbox">
        <div>
          <div className="checkout-form-title">Shipping address</div>
          <div
            className="list-table-edit-box"
            onClick={
              isInEditMode.shippingAddress
                ? handleClickSaveShippingAddress
                : handleClickEditShippingAddress
            }
          >
            {isInEditMode.shippingAddress ? (
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
            disabled={!isInEditMode.shippingAddress}
          />
          <FormInputField
            id="number"
            name="number"
            label="Number"
            type="text"
            formik={formik}
            disabled={!isInEditMode.shippingAddress}
          />
          <FormInputField
            id="city"
            name="city"
            label="City"
            type="text"
            formik={formik}
            disabled={!isInEditMode.shippingAddress}
          />
          <FormInputField
            id="postalCode"
            name="postalCode"
            label="Postal Code"
            type="text"
            formik={formik}
            disabled={!isInEditMode.shippingAddress}
          />
          <FormInputField
            id="country"
            name="country"
            label="Country"
            type="text"
            formik={formik}
            disabled={!isInEditMode.shippingAddress}
          />
          <div className="checkout-form-button-container">
            <button
              className="checkout-form-button"
              onClick={handleClickBillingAddress}
              disabled={!orderBillingAddress}
            >
              Use Billing Address
            </button>
          </div>
        </div>
      </div>
      <div className="checkout-form-secondary-box">
        <div className="checkout-form-title checkout-form-subtitle">
          Packaging info
        </div>
        <div
          className="list-table-edit-box"
          onClick={
            isInEditMode.packaging
              ? handleClickSavePackaging
              : handleClickEditPackaging
          }
        >
          {isInEditMode.packaging ? (
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
          id="packaging"
          name="packaging"
          label="Packaging"
          type="select"
          options={orderPackagings}
          formik={formik}
          disabled={!isInEditMode.packaging}
        />
        <div className="checkout-form-button-container">
          <button onClick={handleClickBilling} className="checkout-form-button">
            Back to Billing Info
          </button>
          <button onClick={handleClickPayment} className="checkout-form-button">
            Proceed to Payment
          </button>
        </div>
      </div>
    </>
  );
}
