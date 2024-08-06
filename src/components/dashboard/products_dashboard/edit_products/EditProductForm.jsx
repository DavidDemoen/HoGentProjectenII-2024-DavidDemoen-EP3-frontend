import * as YUP from "yup";
import { Form, useFormik } from "formik";
import { FormInputField } from "../../../ui_element/forms/FormInputField";
import { useManufacturersAPIContext } from "../../../../context/Manufacturers.API.context";
import { useProductCategoriesAPIContext } from "../../../../context/ProductCategories.API.context";
import { useProductsAPIContext } from "../../../../context/Products.API.context";
import AsyncData from "../../../AsyncData";
import { useEffect, useState } from "react";

const schema = YUP.object({});

export function EditProductForm({ product }) {
  // const [manufacturer, setManufacturer] = useState(null);
  // const [productCategory, setProductCategory] = useState(null);

  const {
    manufacturersDATA,
    manufacturersError,
    manufacturersIsLoading,
    // selectedManufacturerDATA,
    // selectedManufacturerError,
    // selectedManufacturerIsLoading,
    // setSelectedManufacturerId,
  } = useManufacturersAPIContext();
  const { manufacturers } = manufacturersDATA;
  const {
    productCategoriesDATA,
    productCategoriesError,
    productCategoriesIsLoading,
    // selectedProductCategoryDATA,
    // selectedProductCategoryError,
    // selectedProductCategoryIsLoading,
    // setSelectedProductCategoryId,
  } = useProductCategoriesAPIContext();
  const { categories } = productCategoriesDATA;
  const { handleUpdateProduct, updateProductIsLoading, updateProductError } =
    useProductsAPIContext();

  // useEffect(() => {
  //   if (product.manufacturerId) {
  //     setSelectedManufacturerId(product.manufacturerId);
  //     setManufacturer(selectedManufacturerDATA.manufacturer);
  //   }
  //   if (product.productCategoryId) {
  //     setSelectedProductCategoryId(product.productCategoryId);
  //     setProductCategory(selectedProductCategoryDATA.productCategory);
  //   }
  // }, [
  //   product,
  //   setSelectedManufacturerId,
  //   selectedManufacturerDATA.manufacturer,
  //   setSelectedProductCategoryId,
  //   selectedProductCategoryDATA.productCategory,
  // ]);

  const formik = useFormik({
    initialValues: {
      id: product.id,
      name: product.name,
      referenceId: product.referenceId,
      description: product.description,
      currentUnitPrice: product.currentUnitPrice,
      currentProductDiscount: product.currentProductDiscount,
      manufacturerId: product.manufacturerId,
      productCategoryId: product.productCategoryId,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values);
      values.id = product.id;
      handleUpdateProduct(values);
    },
  });

  // useEffect(() => {
  //   if (selectedManufacturerDATA.manufacturer) {
  //     setManufacturer(selectedManufacturerDATA.manufacturer);
  //   }
  //   if (selectedProductCategoryDATA.productCategory) {
  //     setProductCategory(selectedProductCategoryDATA.productCategory);
  //   }
  // }, [selectedManufacturerDATA, selectedProductCategoryDATA]);

  return (
    <>
      <div>EDIT-PRODUCT-FORM-PLACEHOLDER</div>
      <div>
        <AsyncData
          loading={
            manufacturersIsLoading ||
            productCategoriesIsLoading ||
            updateProductIsLoading
          }
          error={
            manufacturersError || productCategoriesError || updateProductError
          }
          type="Form Data"
        >
          <form onSubmit={formik.handleSubmit}>
            <FormInputField
              id="name"
              name="name"
              label="Product Name"
              type="text"
              formik={formik}
            />
            <FormInputField
              id="referenceId"
              name="referenceId"
              label="Reference ID"
              type="text"
              formik={formik}
            />
            <FormInputField
              id="productCategoryId"
              name="productCategoryId"
              label="Category"
              type="select"
              formik={formik}
              options={categories}
              //defaultValue={productCategory}
              idParam="referenceId"
            />
            <FormInputField
              id="manufacturerId"
              name="manufacturerId"
              label="Manufacturer"
              type="select"
              formik={formik}
              options={manufacturers}
              //defaultValue={manufacturer}
              idParam="id"
            />
            <FormInputField
              id="description"
              name="description"
              label="Description"
              type="textarea"
              formik={formik}
              rows={5}
            />
            <FormInputField
              id="currentUnitPrice"
              name="currentUnitPrice"
              label="Price (in EUR)"
              type="text"
              formik={formik}
            />
            <FormInputField
              id="currentProductDiscount"
              name="currentProductDiscount"
              label="Discount (in %)"
              type="text"
              formik={formik}
            />
            <FormInputField
              id="stock"
              name="stock"
              label="Stock"
              type="text"
              formik={formik}
            />
            <FormInputField
              id="image"
              name="image"
              label="Image"
              type="text"
              formik={formik}
            />
            <div>
              <button type="submit">Submit</button>
            </div>
          </form>
        </AsyncData>
      </div>
    </>
  );
}
