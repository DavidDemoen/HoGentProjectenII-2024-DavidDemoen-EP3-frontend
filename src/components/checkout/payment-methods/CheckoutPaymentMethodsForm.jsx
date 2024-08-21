import * as YUP from "yup";
import { useFormik } from "formik";
import { FormInputField } from "../../ui_element/forms/FormInputField";
import { useCheckoutContext } from "../../../context/Checkout.context";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { IoSaveOutline } from "react-icons/io5";

const schema = YUP.object({});

export function CheckoutPaymentMethodsForm({ paymentMethods }) {
  const { setCheckoutStep, setOrderPaymentMethod, orderPaymentMethod } =
    useCheckoutContext();
  const [isInEditMode, setIsInEditMode] = useState({
    paymentMethod: false,
  });

  const initialValues = () => {
    return {
      paymentMethod: orderPaymentMethod?.name || "",
    };
  };
  const filterPaymentMethod = (name) => {
    return paymentMethods.find((paymentMethod) => paymentMethod.name === name);
  };

  const handleClickEditPaymentMethod = () => {
    setIsInEditMode((prevState) => ({
      ...prevState,
      paymentMethod: !prevState.paymentMethod,
    }));
  };
  const handleClickSavePaymentMethod = () => {
    setOrderPaymentMethod(filterPaymentMethod(formik.values.paymentMethod));
    setIsInEditMode((prevState) => ({
      ...prevState,
      paymentMethod: !prevState.paymentMethod,
    }));
  };

  const handleClickShipping = () => {
    setCheckoutStep("shipping");
  };
  const handleToSummary = () => {
    setCheckoutStep("summary");
  };

  const onSubmit = ({ paymentMethod }) => {
    const paymentMethodObject = filterPaymentMethod(paymentMethod);
    setOrderPaymentMethod(paymentMethodObject);
    setCheckoutStep("summary");
  };
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: schema,
    onSubmit,
  });

  return (
    <>
      <div className="checkout-form-topbox">
        <div className="checkout-form-title">Select Payment Method</div>
        <div
          className="list-table-edit-box"
          onClick={
            isInEditMode.paymentMethod
              ? handleClickSavePaymentMethod
              : handleClickEditPaymentMethod
          }
        >
          {isInEditMode.paymentMethod ? (
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
          id="paymentMethod"
          name="paymentMethod"
          label="Payment Method"
          type="radio"
          options={paymentMethods}
          formik={formik}
          disabled={!isInEditMode.paymentMethod}
        />
      </div>
      <div className="checkout-form-secondary-box">
        <div className="checkout-form-button-container">
          <button
            className="checkout-form-button"
            onClick={handleClickShipping}
          >
            Back to Shipping Info
          </button>
          <button className="checkout-form-button" onClick={handleToSummary}>
            Proceed to Summary
          </button>
        </div>
      </div>
    </>
  );
}
