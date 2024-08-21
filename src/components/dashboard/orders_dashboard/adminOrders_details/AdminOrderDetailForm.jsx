import { useFormik } from "formik";
import { FormInputField } from "../../../ui_element/forms/FormInputField";
import { AdminOrderDetailTableItem } from "./AdminOrderDetailTableItem";

export function AdminOrderDetailForm({
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
}) {
  const initialValues = {
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
  };
  const formik = useFormik({
    initialValues: initialValues,
  });
  return (
    <>
      <div className="list-table-twin-box">
        <div className="order-details-form-container list-table-box">
          <div className="list-table-box-title">General Info</div>

          <FormInputField
            id="referenceId"
            name="referenceId"
            label="Reference ID"
            type="text"
            disabled={true}
            formik={formik}
          />
          <FormInputField
            id="orderDiscount"
            name="orderDiscount"
            label="Order Discount"
            type="text"
            formik={formik}
            disabled={true}
          />

          <FormInputField
            id="orderStatusName"
            name="orderStatusName"
            label="Order Status"
            type="text"
            formik={formik}
            disabled={true}
          />
          <FormInputField
            id="paymentStatusName"
            name="paymentStatusName"
            label="Payment Status"
            type="text"
            formik={formik}
            disabled={true}
          />
          <FormInputField
            id="paymentMethodName"
            name="paymentMethodName"
            label="Payment Method"
            type="text"
            formik={formik}
            disabled={true}
          />
          <FormInputField
            id="orderPackaging"
            name="orderPackaging"
            label="Order Packaging"
            type="text"
            formik={formik}
            disabled={true}
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
          <FormInputField
            id="shippingStreet"
            name="shippingStreet"
            label="Street"
            type="text"
            formik={formik}
            disabled={true}
          />
          <FormInputField
            id="shippingNumber"
            name="shippingNumber"
            label="Number"
            type="text"
            formik={formik}
            disabled={true}
          />
          <FormInputField
            id="shippingCity"
            name="shippingCity"
            label="City"
            type="text"
            formik={formik}
            disabled={true}
          />
          <FormInputField
            id="shippingZip"
            name="shippingZip"
            label="Zip"
            type="text"
            formik={formik}
            disabled={true}
          />
          <FormInputField
            id="shippingCountry"
            name="shippingCountry"
            label="Country"
            type="text"
            formik={formik}
            disabled={true}
          />
        </div>
        <div className="list-table-box">
          <div className="list-table-box-title">Billing Address</div>
          <FormInputField
            id="billingStreet"
            name="billingStreet"
            label="Street"
            type="text"
            formik={formik}
            disabled={true}
          />
          <FormInputField
            id="billingNumber"
            name="billingNumber"
            label="Number"
            type="text"
            formik={formik}
            disabled={true}
          />
          <FormInputField
            id="billingCity"
            name="billingCity"
            label="City"
            type="text"
            formik={formik}
            disabled={true}
          />
          <FormInputField
            id="billingZip"
            name="billingZip"
            label="Zip"
            type="text"
            formik={formik}
            disabled={true}
          />
          <FormInputField
            id="billingCountry"
            name="billingCountry"
            label="Country"
            type="text"
            formik={formik}
            disabled={true}
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
              <AdminOrderDetailTableItem key={index} item={order_item} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
