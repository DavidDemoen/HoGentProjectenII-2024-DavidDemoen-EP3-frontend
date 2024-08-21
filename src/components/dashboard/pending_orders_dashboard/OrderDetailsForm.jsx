import { FormInputField } from "../../ui_element/forms/FormInputField";
import { useFormik } from "formik";
import * as YUP from "yup";
import { CiEdit } from "react-icons/ci";
import { IoSaveOutline } from "react-icons/io5";
import { OrderDetailOrderItemTableItem } from "./OrderDetailOrderItemTableItem";
import { useState } from "react";
import useSWRMutation from "swr/mutation";
import useSWR from "swr";
import { updateById } from "../../../api/index";
import { mutate } from "swr";
import { getAll } from "../../../api/index";
import AsyncData from "../../AsyncData";

const schema = YUP.object({
  referenceId: YUP.string().required(),
  shippingStreet: YUP.string().required().min(0),
  shippingNumber: YUP.number().required(),
  shippingCity: YUP.string().required(),
  shippingZip: YUP.number().required().min(1000),
  shippingCountry: YUP.string().required(),
  billingStreet: YUP.string().required(),
  billingNumber: YUP.number().required().min(0),
  billingCity: YUP.string().required(),
  billingZip: YUP.number().required().min(1000),
  billingCountry: YUP.string().required(),
  buyerFirstName: YUP.string().required(),
  buyerLastName: YUP.string().required(),
  buyerEmail: YUP.string().email().required(),
  buyerPhone: YUP.number().required(),
  orderDiscount: YUP.number()
    .required("Order discount is required")
    .min(0)
    .max(1),
  orderStatusName: YUP.string().required(),
  paymentStatusName: YUP.string().required(),
  paymentMethodName: YUP.string().required(),
  orderPackaging: YUP.string().required(),
});

export function OrderDetailsForm({
  id,
  referenceId,
  shipping_address,
  billing_address,
  buyer_account,
  order_items,
  orderDiscount,
  orderStatusName,
  paymentStatusName,
  paymentMethodName,
  orderPackagingName,
  buyerCompany,
}) {
  const [isInEditMode, setIsInEditMode] = useState({
    generalInfo: false,
    shippingAddress: false,
    billingAddress: false,
  });

  const {
    data: orderStatusDATA = { orderStatuses: [] },
    error: orderStatusError,
    isLoading: orderStatusIsLoading,
  } = useSWR({ url: `orderStatuses` }, getAll);
  const { orderStatuses } = orderStatusDATA;

  const {
    data: paymentStatusDATA = { paymentStatuses: [] },
    error: paymentStatusError,
    isLoading: paymentStatusIsLoading,
  } = useSWR({ url: `paymentStatuses` }, getAll);
  const { paymentStatuses } = paymentStatusDATA;

  const {
    data: paymentMethodDATA = { paymentMethods: [] },
    error: paymentMethodError,
    isLoading: paymentMethodIsLoading,
  } = useSWR({ url: `paymentMethods` }, getAll);
  const { paymentMethods } = paymentMethodDATA;

  const {
    data: orderPackagingDATA = { orderPackagings: [] },
    error: orderPackagingError,
    isLoading: orderPackagingIsLoading,
  } = useSWR({ url: `orderPackagings` }, getAll);
  const { orderPackagings } = orderPackagingDATA;

  const {
    trigger: updateAddress,
    isLoading: updateAddressIsLoading,
    error: updateAddressError,
  } = useSWRMutation(`addresses`, updateById);
  const {
    trigger: updateOrder,
    isLoading: updateOrderIsLoading,
    error: updateOrderError,
  } = useSWRMutation(`orders`, updateById);

  const handleUpdateAddress = async (address) => {
    await updateAddress(address);
    mutate({ url: `addresses/${address.id}` });
    mutate({ url: `orders` });
  };
  const handleUpdateOrder = async (order) => {
    await updateOrder(order);
    mutate({ url: "companies" });
    mutate({ url: "accounts" });
    mutate({ url: `orders/buyer/company/${buyerCompany.id}` });
  };

  const handleClickEditGeneral = () => {
    setIsInEditMode((prev) => ({ ...prev, generalInfo: !prev.generalInfo }));
  };
  const handleClickSaveGeneral = async () => {
    await formik.validateField("orderDiscount");
    await formik.validateField("referenceId");
    await formik.validateField("orderStatusName");
    await formik.validateField("paymentStatusName");
    await formik.validateField("paymentMethodName");
    await formik.validateField("orderPackaging");

    const isValid =
      !formik.errors.orderDiscount &&
      !formik.errors.referenceId &&
      !formik.errors.orderStatusName &&
      !formik.errors.paymentStatusName &&
      !formik.errors.paymentMethodName &&
      !formik.errors.orderPackaging;

    if (isValid) {
      const order = {
        id: id,
        referenceId: formik.values.referenceId,
        order_items: order_items,
        orderDiscount: formik.values.orderDiscount,
        orderStatusName: formik.values.orderStatusName,
        paymentStatusName: formik.values.paymentStatusName,
        paymentMethodName: formik.values.paymentMethodName,
        orderPackagingName: formik.values.orderPackaging,
      };
      handleUpdateOrder(order);
      setIsInEditMode((prev) => ({ ...prev, generalInfo: !prev.generalInfo }));
    }
  };
  const handleClickEditShippingAddress = () => {
    setIsInEditMode((prev) => ({
      ...prev,
      shippingAddress: !prev.shippingAddress,
    }));
  };
  const handleClickSaveShippingAddress = async () => {
    await formik.validateField("shippingStreet");
    await formik.validateField("shippingNumber");
    await formik.validateField("shippingCity");
    await formik.validateField("shippingZip");
    await formik.validateField("shippingCountry");

    const isValid =
      !formik.errors.shippingStreet &&
      !formik.errors.shippingNumber &&
      !formik.errors.shippingCity &&
      !formik.errors.shippingZip &&
      !formik.errors.shippingCountry;

    if (isValid) {
      const address = {
        id: shipping_address.id,
        street: formik.values.shippingStreet,
        number: formik.values.shippingNumber,
        city: formik.values.shippingCity,
        postalCode: formik.values.shippingZip,
        country: formik.values.shippingCountry,
      };
      handleUpdateAddress(address);
      setIsInEditMode((prev) => ({
        ...prev,
        shippingAddress: !prev.shippingAddress,
      }));
    }
  };
  const handleClickEditBillingAddress = () => {
    setIsInEditMode((prev) => ({
      ...prev,
      billingAddress: !prev.billingAddress,
    }));
  };
  const handleClickSaveBillingAddress = async () => {
    await formik.validateField("billingStreet");
    await formik.validateField("billingNumber");
    await formik.validateField("billingCity");
    await formik.validateField("billingZip");
    await formik.validateField("billingCountry");

    const isValid =
      !formik.errors.billingStreet &&
      !formik.errors.billingNumber &&
      !formik.errors.billingCity &&
      !formik.errors.billingZip &&
      !formik.errors.billingCountry;

    if (isValid) {
      const address = {
        id: billing_address.id,
        street: formik.values.billingStreet,
        number: formik.values.billingNumber,
        city: formik.values.billingCity,
        postalCode: formik.values.billingZip,
        country: formik.values.billingCountry,
      };
      handleUpdateAddress(address);
      setIsInEditMode((prev) => ({
        ...prev,
        billingAddress: !prev.billingAddress,
      }));
    }
  };

  const initialValues = () => {
    return {
      referenceId: referenceId,
      shippingStreet: shipping_address.street,
      shippingNumber: shipping_address.number,
      shippingCity: shipping_address.city,
      shippingZip: shipping_address.postalCode,
      shippingCountry: shipping_address.country,
      billingStreet: billing_address.street,
      billingNumber: billing_address.number,
      billingCity: billing_address.city,
      billingZip: billing_address.postalCode,
      billingCountry: billing_address.country,
      buyerFirstName: buyer_account.first_name,
      buyerLastName: buyer_account.last_name,
      buyerEmail: buyer_account.email,
      buyerPhone: buyer_account.phone,
      orderDiscount: orderDiscount,
      orderStatusName: orderStatusName,
      paymentStatusName: paymentStatusName,
      paymentMethodName: paymentMethodName,
      orderPackaging: orderPackagingName,
      buyerCompany: buyerCompany.name,
    };
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: schema,
    validateOnChange: true,
    validateOnBlur: true,
  });

  return (
    <>
      <AsyncData
        loading={
          orderStatusIsLoading ||
          updateAddressIsLoading ||
          paymentStatusIsLoading ||
          paymentMethodIsLoading ||
          updateOrderIsLoading ||
          orderPackagingIsLoading
        }
        error={
          orderStatusError ||
          updateAddressError ||
          paymentStatusError ||
          paymentMethodError ||
          updateOrderError ||
          orderPackagingError
        }
        type="Order data"
      >
        <div className="list-table-twin-box">
          <div className="order-details-form-container list-table-box">
            <div className="list-table-box-title">General Info</div>
            <div
              className="list-table-edit-box"
              onClick={
                isInEditMode.generalInfo
                  ? handleClickSaveGeneral
                  : handleClickEditGeneral
              }
            >
              {isInEditMode.generalInfo ? (
                <>
                  <IoSaveOutline /> <p>Save Changes</p>
                </>
              ) : (
                <>
                  <CiEdit /> <p>Edit Data</p>
                </>
              )}
            </div>
            <FormInputField
              id="referenceId"
              name="referenceId"
              label="Reference ID"
              type="text"
              disabled={!isInEditMode.generalInfo}
              formik={formik}
            />
            <FormInputField
              id="orderDiscount"
              name="orderDiscount"
              label="Order Discount"
              type="text"
              formik={formik}
              disabled={!isInEditMode.generalInfo}
            />
            {/* {formik.errors.orderDiscount ? (
              <p className="list-table-item-error">
                {formik.errors.orderDiscount}
              </p>
            ) : null} */}
            <FormInputField
              id="orderStatusName"
              name="orderStatusName"
              label="Order Status"
              type="select"
              formik={formik}
              disabled={!isInEditMode.generalInfo}
              options={orderStatuses}
            />
            <FormInputField
              id="paymentStatusName"
              name="paymentStatusName"
              label="Payment Status"
              type="select"
              formik={formik}
              disabled={!isInEditMode.generalInfo}
              options={paymentStatuses}
            />
            <FormInputField
              id="paymentMethodName"
              name="paymentMethodName"
              label="Payment Method"
              type="select"
              formik={formik}
              disabled={!isInEditMode.generalInfo}
              options={paymentMethods}
            />
            <FormInputField
              id="orderPackaging"
              name="orderPackaging"
              label="Order Packaging"
              type="select"
              formik={formik}
              disabled={!isInEditMode.generalInfo}
              options={orderPackagings}
            />
          </div>
          <div className="list-table-box">
            <div className="list-table-box-title">Buyer Information</div>
            <FormInputField
              id="buyerFirstName"
              name="buyerFirstName"
              label="First Name"
              type="text"
              formik={formik}
              disabled={true}
            />
            <FormInputField
              id="buyerLastName"
              name="buyerLastName"
              label="Last Name"
              type="text"
              formik={formik}
              disabled={true}
            />
            <FormInputField
              id="buyerEmail"
              name="buyerEmail"
              label="Email"
              type="text"
              formik={formik}
              disabled={true}
            />
            <FormInputField
              id="buyerPhone"
              name="buyerPhone"
              label="Phone"
              type="text"
              formik={formik}
              disabled={true}
            />
            <FormInputField
              id="buyerCompany"
              name="buyerCompany"
              label="Company"
              type="text"
              formik={formik}
              disabled={true}
            />
          </div>
        </div>
        <div className="list-table-twin-box">
          <div className="list-table-box">
            <div className="list-table-box-title">Shipping Address</div>
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
                  <IoSaveOutline /> <p>Save Changes</p>
                </>
              ) : (
                <>
                  <CiEdit /> <p>Edit Data</p>
                </>
              )}
            </div>
            <FormInputField
              id="shippingStreet"
              name="shippingStreet"
              label="Street"
              type="text"
              formik={formik}
              disabled={!isInEditMode.shippingAddress}
            />
            <FormInputField
              id="shippingNumber"
              name="shippingNumber"
              label="Number"
              type="text"
              formik={formik}
              disabled={!isInEditMode.shippingAddress}
            />
            <FormInputField
              id="shippingCity"
              name="shippingCity"
              label="City"
              type="text"
              formik={formik}
              disabled={!isInEditMode.shippingAddress}
            />
            <FormInputField
              id="shippingZip"
              name="shippingZip"
              label="Zip"
              type="text"
              formik={formik}
              disabled={!isInEditMode.shippingAddress}
            />
            <FormInputField
              id="shippingCountry"
              name="shippingCountry"
              label="Country"
              type="text"
              formik={formik}
              disabled={!isInEditMode.shippingAddress}
            />
          </div>
          <div className="list-table-box">
            <div className="list-table-box-title">Billing Address</div>
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
                  <IoSaveOutline /> <p>Save Changes</p>
                </>
              ) : (
                <>
                  <CiEdit /> <p>Edit Data</p>
                </>
              )}
            </div>
            <FormInputField
              id="billingStreet"
              name="billingStreet"
              label="Street"
              type="text"
              formik={formik}
              disabled={!isInEditMode.billingAddress}
            />
            <FormInputField
              id="billingNumber"
              name="billingNumber"
              label="Number"
              type="text"
              formik={formik}
              disabled={!isInEditMode.billingAddress}
            />
            <FormInputField
              id="billingCity"
              name="billingCity"
              label="City"
              type="text"
              formik={formik}
              disabled={!isInEditMode.billingAddress}
            />
            <FormInputField
              id="billingZip"
              name="billingZip"
              label="Zip"
              type="text"
              formik={formik}
              disabled={!isInEditMode.billingAddress}
            />
            <FormInputField
              id="billingCountry"
              name="billingCountry"
              label="Country"
              type="text"
              formik={formik}
              disabled={!isInEditMode.billingAddress}
            />
          </div>
        </div>
        <div className="list-table-box">
          <div className="list-table-box-title">Order Items</div>

          <table className="table-main-container">
            <thead className="table-header">
              <tr>
                <th>Product name</th>
                <th>Quantity</th>
                <th>Transaction Unit Price</th>
                <th>Transaction Unit Discount</th>
              </tr>
            </thead>
            <tbody>
              {order_items.map((order_item, index) => (
                <OrderDetailOrderItemTableItem key={index} item={order_item} />
              ))}
            </tbody>
          </table>
        </div>
      </AsyncData>
    </>
  );
}
