import { FormInputField } from "../../../ui_element/forms/FormInputField";
import { Form, useFormik } from "formik";
import * as YUP from "yup";
import { CiEdit } from "react-icons/ci";
import { IoSaveOutline } from "react-icons/io5";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import { getAll, updateById, create } from "../../../../api";
import AsyncData from "../../../AsyncData";
import useSWRMutation from "swr/mutation";
import { useAdminDashboardContext } from "../../../../context/AdminDashboard.context";

const schema = YUP.object({
  referenceId: YUP.string().required(),
  name: YUP.string().required(),
  description: YUP.string().required(),
  currentUnitPrice: YUP.number().required().min(0),
  currentProductDiscount: YUP.number().required().min(0).max(1),
  manufacturer: YUP.string().required(),
  productCategory: YUP.string().required(),
  stock: YUP.number().required().min(0),
  companyId: YUP.string().required(),
  addToShop: YUP.boolean().required(),
});

export function ProductDetailsForm({
  id,
  name,
  referenceId,
  currentUnitPrice,
  currentProductDiscount,
  description,
  Manufacturer,
  ProductCategory,
  companyId,
  productCategoryId,
}) {
  const { productDetailId } = useAdminDashboardContext();

  const [isInEditMode, setIsInEditMode] = useState({
    generalInfo: false,
    salesData: false,
  });

  const {
    data: manufacturersDATA = { manufacturers: [] },
    error: manufacturersError,
    isLoading: manufacturersIsLoading,
  } = useSWR({ url: `manufacturers` }, getAll);
  const { manufacturers } = manufacturersDATA;
  const {
    data: productCategoriesDATA = { productCategories: [] },
    error: productCategoriesError,
    isLoading: productCategoriesIsLoading,
  } = useSWR({ url: `productcategories` }, getAll);
  const { categories } = productCategoriesDATA;
  const {
    data: stockDATA = { stock: "" },
    error: stockError,
    isLoading: stockIsLoading,
  } = useSWR(
    id ? { url: `companies/${companyId}/products/${id}/stock` } : null,
    getAll
  );
  console.log(stockDATA);
  const { stock } = stockDATA;

  const {
    trigger: updateProduct,
    isLoading: updateProductIsLoading,
    error: updateProductError,
  } = useSWRMutation(`products`, updateById);

  const handleUpdateProduct = async (product) => {
    await updateProduct(product);
    mutate({ url: `companies/${companyId}/products` });
  };

  const {
    trigger: createProduct,
    isLoading: createProductIsLoading,
    error: createProductError,
  } = useSWRMutation(`products`, create);

  const handleCreateProduct = async (product) => {
    await createProduct(product);
    mutate({ url: `companies/${companyId}/products` });
  };

  const filterManufacturerOnName = (manufacturerName) => {
    return manufacturers.find(
      (manufacturer) => manufacturer.name === manufacturerName
    );
  };
  const filterProductCategoryOnName = (productCategoryName) => {
    return categories.find(
      (productCategory) => productCategory.name === productCategoryName
    );
  };

  const handleClickEditGeneral = () => {
    productDetailId === "new"
      ? setIsInEditMode((prevState) => ({
          ...prevState,
          generalInfo: !prevState.generalInfo,
          salesData: !prevState.salesData,
        }))
      : setIsInEditMode((prevState) => ({
          ...prevState,
          generalInfo: !prevState.generalInfo,
        }));
  };
  const handleClickSaveGeneral = async () => {
    await formik.validateForm();

    const isValid =
      !formik.errors.name &&
      !formik.errors.description &&
      !formik.errors.referenceId &&
      !formik.errors.manufacturer &&
      !formik.errors.productCategory &&
      !formik.errors.stock &&
      !formik.errors.currentUnitPrice &&
      !formik.errors.currentProductDiscount;

    if (isValid) {
      const product = {
        id: id,
        referenceId: formik.values.referenceId,
        name: formik.values.name,
        description: formik.values.description,
        currentUnitPrice: currentUnitPrice,
        currentProductDiscount: currentProductDiscount,
        manufacturerId: filterManufacturerOnName(formik.values.manufacturer).id,
        productCategoryId: productCategoryId,
        stock: stock,
      };
      const newProduct = {
        referenceId: formik.values.referenceId,
        name: formik.values.name,
        description: formik.values.description,
        currentUnitPrice: formik.values.currentUnitPrice,
        currentProductDiscount: formik.values.currentProductDiscount,
        manufacturerId: filterManufacturerOnName(formik.values.manufacturer).id,
        productCategoryId: filterProductCategoryOnName(
          formik.values.productCategory
        ).referenceId,
        stock: formik.values.stock,
        companyId: companyId,
        addToShop: formik.values.addToShop,
      };
      productDetailId === "new"
        ? handleCreateProduct(newProduct)
        : handleUpdateProduct(product);
      productDetailId === "new"
        ? setIsInEditMode((prevState) => ({
            ...prevState,
            generalInfo: !prevState.generalInfo,
            salesData: !prevState.salesData,
          }))
        : setIsInEditMode((prevState) => ({
            ...prevState,
            generalInfo: !prevState.generalInfo,
          }));
    }
  };
  const handleClickEditSalesData = () => {
    setIsInEditMode((prevState) => ({
      ...prevState,
      salesData: !prevState.salesData,
    }));
  };
  const handleClickSaveSalesData = async () => {
    await formik.validateField("currentUnitPrice");
    await formik.validateField("currentProductDiscount");
    await formik.validateField("stock");
    await formik.validateField("productCategory");

    const isValid =
      !formik.errors.currentUnitPrice &&
      !formik.errors.currentProductDiscount &&
      !formik.errors.stock &&
      !formik.errors.productCategory;

    if (isValid) {
      const product = {
        id: id,
        referenceId: referenceId,
        name: name,
        description: description,
        currentUnitPrice: formik.values.currentUnitPrice,
        currentProductDiscount: formik.values.currentProductDiscount,
        manufacturerId: Manufacturer.id,
        productCategoryId: filterProductCategoryOnName(
          formik.values.productCategory
        ).referenceId,
        stock: formik.values.stock,
        companyId: companyId,
      };
      handleUpdateProduct(product);
      setIsInEditMode((prevState) => ({
        ...prevState,
        salesData: !prevState.salesData,
      }));
    }
  };

  const initialValues = () => {
    return {
      name: name,
      referenceId: referenceId,
      description: description,
      manufacturer: Manufacturer.name,
      currentUnitPrice: currentUnitPrice,
      currentProductDiscount: currentProductDiscount,
      productCategory: ProductCategory.name,
      stock: stock,
      companyId: companyId,
    };
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: schema,
  });

  return (
    <>
      <AsyncData
        loading={
          manufacturersIsLoading || productCategoriesIsLoading || stockIsLoading
        }
        error={manufacturersError || productCategoriesError || stockError}
        type="Product Data"
      >
        <div className="list-table-twin-box">
          <div className="list-table-box">
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
              id="name"
              name="name"
              label="Name"
              type="text"
              disabled={!isInEditMode.generalInfo}
              formik={formik}
            />
            <FormInputField
              id="referenceId"
              name="referenceId"
              label="Reference ID"
              type="text"
              disabled={!isInEditMode.generalInfo}
              formik={formik}
            />
            <FormInputField
              id="description"
              name="description"
              label="Description"
              type="textarea"
              disabled={!isInEditMode.generalInfo}
              formik={formik}
              rows={4}
            />
            <FormInputField
              id="manufacturer"
              name="manufacturer"
              label="Manufacturer"
              type="select"
              disabled={!isInEditMode.generalInfo}
              formik={formik}
              options={manufacturers}
            />
          </div>
          <div className="list-table-box">
            <div className="list-table-box-title">Sales Data</div>
            {productDetailId !== "new" && (
              <div
                className="list-table-edit-box"
                onClick={
                  isInEditMode.salesData
                    ? handleClickSaveSalesData
                    : handleClickEditSalesData
                }
              >
                {isInEditMode.salesData ? (
                  <>
                    <IoSaveOutline /> <p>Save Changes</p>
                  </>
                ) : (
                  <>
                    <CiEdit /> <p>Edit Data</p>
                  </>
                )}
              </div>
            )}

            <FormInputField
              id="currentUnitPrice"
              name="currentUnitPrice"
              label="Current Unit Price"
              type="text"
              disabled={!isInEditMode.salesData}
              formik={formik}
            />
            <FormInputField
              id="currentProductDiscount"
              name="currentProductDiscount"
              label="Current Product Discount"
              type="text"
              disabled={!isInEditMode.salesData}
              formik={formik}
            />
            <FormInputField
              id="stock"
              name="stock"
              label="Stock"
              type="text"
              disabled={!isInEditMode.salesData}
              formik={formik}
            />
            <FormInputField
              id="productCategory"
              name="productCategory"
              label="Product Category"
              type="select"
              disabled={!isInEditMode.salesData}
              formik={formik}
              options={categories}
            />
            {productDetailId === "new" && (
              <FormInputField
                id="addToShop"
                name="addToShop"
                label="Add to Shop"
                type="boolean-radio"
                disabled={!isInEditMode.salesData}
                formik={formik}
              />
            )}
          </div>
        </div>
      </AsyncData>
    </>
  );
}
