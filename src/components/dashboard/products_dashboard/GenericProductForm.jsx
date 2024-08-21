import * as YUP from "yup";
import { Form, useFormik } from "formik";
import { FormInputField } from "../../ui_element/forms/FormInputField";
import { useManufacturersAPIContext } from "../../../context/Manufacturers.API.context";
import { useProductCategoriesAPIContext } from "../../../context/ProductCategories.API.context";
import { useProductsAPIContext } from "../../../context/Products.API.context";
import AsyncData from "../../AsyncData";

const getCounter = () => parseInt(localStorage.getItem("testCounter"), 10) || 1;
const setCounter = (value) => localStorage.setItem("testCounter", value);

const testAddData = (testCounter) => ({
  name: `TEST PRODUCT ${testCounter}`,
  referenceId: `TEST-REF-${testCounter}`,
  description: `TEST DESCRIPTION ${testCounter}`,
  currentUnitPrice: 100,
  currentProductDiscount: 0.1,
  manufacturerId: 1,
  productCategoryId: "B2B-PC-0001",
  addToShop: true,
});

const schema = YUP.object({});

export function GenericProductForm({ type, product }) {
  const { manufacturersDATA, manufacturersError, manufacturersIsLoading } =
    useManufacturersAPIContext();
  const { manufacturers } = manufacturersDATA;
  const {
    productCategoriesDATA,
    productCategoriesError,
    productCategoriesIsLoading,
  } = useProductCategoriesAPIContext();
  const { categories } = productCategoriesDATA;
  const {
    handleUpdateProduct,
    updateProductIsLoading,
    updateProductError,
    handleCreateProduct,
    createProductIsLoading,
    createProductError,
  } = useProductsAPIContext();

  const initialValues = () => {
    switch (type) {
      case "edit":
        return {
          id: product.id,
          name: product.name,
          referenceId: product.referenceId,
          description: product.description,
          currentUnitPrice: product.currentUnitPrice,
          currentProductDiscount: product.currentProductDiscount,
          manufacturerId: product.manufacturerId,
          productCategoryId: product.productCategoryId,
        };
      case "add":
        return testAddData(getCounter());
      // return {
      //   name: "",
      //   referenceId: "",
      //   description: "",
      //   currentUnitPrice: "",
      //   currentProductDiscount: "",
      //   manufacturerId: "",
      //   productCategoryId: "",
      //   addToShop: true,
      // };
      default:
        return {
          name: "",
          referenceId: "",
          description: "",
          currentUnitPrice: "",
          currentProductDiscount: "",
          manufacturerId: "",
          productCategoryId: "",
        };
    }
  };

  const onSubmit = (values) => {
    console.log(values);
    switch (type) {
      case "edit":
        values.id = product.id;
        handleUpdateProduct(values);
        break;
      case "add":
        setCounter(getCounter() + 1);
        handleCreateProduct(values);
        break;
      default:
        break;
    }
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: schema,
    onSubmit,
  });

  return (
    <>
      <div>{`${type.toUpperCase()}-PRODUCT-FORM-PLACEHOLDER`}</div>
      <div>
        <AsyncData
          loading={
            manufacturersIsLoading ||
            productCategoriesIsLoading ||
            updateProductIsLoading ||
            createProductIsLoading
          }
          error={
            manufacturersError ||
            productCategoriesError ||
            updateProductError ||
            createProductError
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
            {type === "add" && (
              <FormInputField
                id="addToShop"
                name="addToShop"
                label="Add to own shop?"
                type="boolean-radio"
                formik={formik}
              />
            )}

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
