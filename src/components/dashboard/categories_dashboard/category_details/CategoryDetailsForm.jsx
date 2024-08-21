import { FormInputField } from "../../../ui_element/forms/FormInputField";
import { useFormik } from "formik";
import * as YUP from "yup";
import { CiEdit } from "react-icons/ci";
import { IoSaveOutline } from "react-icons/io5";
import { useState } from "react";
import useSWRMutation from "swr/mutation";
import { updateById, create } from "../../../../api";
import { mutate } from "swr";
import { useAdminDashboardContext } from "../../../../context/AdminDashboard.context";

const schema = YUP.object({
  referenceId: YUP.string().required(),
  name: YUP.string().required(),
  description: YUP.string().required(),
});

export function CategoryDetailsForm({ referenceId, name, description }) {
  const [isInEditMode, setIsInEditMode] = useState({
    generalInfo: false,
  });
  const { categoryDetailId } = useAdminDashboardContext();

  const {
    trigger: updateCategory,
    data: updatedCategory,
    error: updateCategoryError,
  } = useSWRMutation("productcategories", updateById);
  const {
    trigger: createCategory,
    data: createdCategory,
    error: createCategoryError,
  } = useSWRMutation("productcategories", create);

  const handleUpdateCategory = async (category) => {
    await updateCategory(category);
    mutate({ url: `productcategories` });
  };
  const handleCreateCategory = async (category) => {
    await createCategory(category);
    mutate({ url: `productcategories` });
  };

  const handleClickEditGeneralInfo = () => {
    setIsInEditMode((prevState) => ({
      ...prevState,
      generalInfo: !prevState.generalInfo,
    }));
  };
  const handleClickSaveGeneralInfo = async () => {
    await formik.validateForm();

    const isValid =
      !formik.errors.name &&
      !formik.errors.description &&
      !formik.errors.referenceId;

    if (isValid) {
      const category = {
        referenceId: formik.values.referenceId,
        name: formik.values.name,
        description: formik.values.description,
      };
      category.id = referenceId;
      categoryDetailId === "new"
        ? handleCreateCategory(category)
        : handleUpdateCategory(category);
      setIsInEditMode((prevState) => ({
        ...prevState,
        generalInfo: !prevState.generalInfo,
      }));
    }
  };

  const initialValues = {
    referenceId: referenceId,
    name: name,
    description: description,
  };
  const formik = useFormik({
    initialValues,
    validationSchema: schema,
  });
  return (
    <>
      <div className="list-table-twin-box">
        <div className="list-table-box">
          <div className="list-table-box-title">General Info</div>
          <div
            className="list-table-edit-box"
            onClick={
              isInEditMode.generalInfo
                ? handleClickSaveGeneralInfo
                : handleClickEditGeneralInfo
            }
          >
            {isInEditMode.generalInfo ? (
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
            id="referenceId"
            name="referenceId"
            label="Reference Id"
            type="text"
            formik={formik}
            disabled={!isInEditMode.generalInfo}
          />
          <FormInputField
            id="name"
            name="name"
            label="Name"
            type="text"
            formik={formik}
            disabled={!isInEditMode.generalInfo}
          />
          <FormInputField
            id="description"
            name="description"
            label="Description"
            type="text"
            formik={formik}
            disabled={!isInEditMode.generalInfo}
          />
        </div>
        <div></div>
      </div>
    </>
  );
}
