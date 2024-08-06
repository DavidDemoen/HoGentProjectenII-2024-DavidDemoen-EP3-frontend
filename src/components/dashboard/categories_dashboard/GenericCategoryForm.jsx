import * as YUP from "yup";
import { Form, useFormik } from "formik";
import { FormInputField } from "../../ui_element/forms/FormInputField";
import { useProductCategoriesAPIContext } from "../../../context/ProductCategories.API.context";
import { useAdminDashboardContext } from "../../../context/AdminDashboard.context";

const schema = YUP.object({});

export function GenericCategoryForm({ type, category }) {
  const {
    handleUpdateProductCategory,
    handleCreateProductCategory,
    setSelectedProductCategoryId,
  } = useProductCategoriesAPIContext();
  const { setCategoriesMainBox } = useAdminDashboardContext();

  const initialValues = () => {
    switch (type) {
      case "edit":
        return {
          name: category.name,
          description: category.description,
          referenceId: category.referenceId,
        };
      case "add":
        return {
          name: "",
          description: "",
          referenceId: "",
        };
    }
  };
  const onSubmit = (values) => {
    console.log(values);
    switch (type) {
      case "edit":
        handleUpdateProductCategory(values);
        break;
      case "add":
        handleCreateProductCategory(values);
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
  const renderTitle = () => {
    switch (type) {
      case "edit":
        return `Edit Category ${category.referenceId}`;
      case "add":
        return "Add Category";
    }
  };
  const handleExit = () => {
    setCategoriesMainBox("add");
  };

  return (
    <>
      <div>
        <h2>{renderTitle()}</h2>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <FormInputField
          id="referenceId"
          name="referenceId"
          label="Reference ID"
          type="text"
          formik={formik}
          disabled={type === "edit"}
        />
        <FormInputField
          id="name"
          name="name"
          label="Category Name"
          type="text"
          formik={formik}
        />
        <FormInputField
          id="description"
          name="description"
          label="Description"
          type="textarea"
          formik={formik}
          rows="5"
          needsPlaceholder={true}
        />
        <div>
          <button type="submit">Save</button>
        </div>
        {type === "edit" && (
          <div>
            <button type="button" onClick={handleExit}>
              Exit Edit
            </button>
          </div>
        )}
      </form>
    </>
  );
}
