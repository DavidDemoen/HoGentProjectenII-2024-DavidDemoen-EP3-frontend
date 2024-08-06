import * as YUP from "yup";
import { useFormik } from "formik";
import AsyncData from "../../../AsyncData";
import { FormInputField } from "../../../ui_element/forms/FormInputField";
import { useProductCategoriesAPIContext } from "../../../../context/ProductCategories.API.context";

const schema = YUP.object({});

export function AddCategoryForm() {
  const { handleCreateProductCategory } = useProductCategoriesAPIContext();

  const initialValues = {
    name: "",
    description: "",
    referenceId: "",
  };
  const onSubmit = (values) => {
    console.log(values);
    handleCreateProductCategory(values);
  };
  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit,
  });

  return (
    <>
      <div>ADD-CATEGORY-FORM-PLACEHOLDER</div>
      <div>
        <AsyncData>
          <form onSubmit={formik.handleSubmit}>
            <FormInputField
              id="referenceId"
              name="referenceId"
              label="Reference ID"
              type="text"
              formik={formik}
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
          </form>
        </AsyncData>
      </div>
    </>
  );
}
