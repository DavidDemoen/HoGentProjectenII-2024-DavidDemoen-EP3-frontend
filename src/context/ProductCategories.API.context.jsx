import {
  useContext,
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import useSWR, { mutate } from "swr";
import { getAll, getById, create, deleteById, updateById } from "../api/index";
import useSWRMutation from "swr/mutation";

const ProductCategoriesAPIContext = createContext();
const supplierAccount = import.meta.env.VITE_DEV_MAIN_SUPPLIER_ACCOUNT;
const mainCompany = import.meta.env.VITE_DEV_MAIN_COMPANY;

export function useProductCategoriesAPIContext() {
  return useContext(ProductCategoriesAPIContext);
}

export function ProductCategoriesAPIContextProvider({ children }) {
  // STATE
  const [selectedProductCategoryId, setSelectedProductCategoryId] =
    useState(null);

  // API calls ProductCategories
  const {
    data: productCategoriesDATA = { productCategories: [] },
    error: productCategoriesError,
    isLoading: productCategoriesIsLoading,
  } = useSWR({ url: "productcategories" }, getAll);
  const {
    data: selectedProductCategoryDATA = { productCategory: {} },
    error: selectedProductCategoryError,
    isLoading: selectedProductCategoryIsLoading,
  } = useSWR(
    selectedProductCategoryId
      ? { url: `productcategories/${selectedProductCategoryId}` }
      : null,
    getById
  );
  const {
    trigger: createProductCategory,
    isLoading: createProductCategoryIsLoading,
    error: createProductCategoryError,
  } = useSWRMutation(`productcategories`, create);
  const {
    trigger: deleteProductCategory,
    isLoading: deleteProductCategoryIsLoading,
    error: deleteProductCategoryError,
  } = useSWRMutation(`productcategories`, deleteById);
  const {
    trigger: updateProductCategory,
    isLoading: updateProductCategoryIsLoading,
    error: updateProductCategoryError,
  } = useSWRMutation(`productcategories`, updateById);

  const handleCreateProductCategory = useCallback(
    async (data) => {
      console.log(`Create productcategory: ${JSON.stringify(data)}`);
      await createProductCategory(data);
      mutate({ url: "productcategories" });
      mutate({ url: `productcategories/${selectedProductCategoryId}` });
    },
    [createProductCategory]
  );
  const handleDeleteProductCategory = useCallback(
    async (id) => {
      console.log(`Delete productcategory: ${id}`);
      await deleteProductCategory(id);
      mutate({ url: "productcategories" });
      mutate({ url: `productcategories/${selectedProductCategoryId}` });
    },
    [deleteProductCategory, mutate]
  );
  const handleUpdateProductCategory = useCallback(
    async (data) => {
      console.log(`Update productcategory: ${JSON.stringify(data)}`);
      data.id = data.referenceId;
      await updateProductCategory(data);
      mutate({ url: "productcategories" });
      mutate({ url: `productcategories/${data.referenceId}` });
    },
    [updateProductCategory, mutate]
  );

  const value = useMemo(() => {
    return {
      productCategoriesDATA,
      productCategoriesError,
      productCategoriesIsLoading,
      selectedProductCategoryId,
      selectedProductCategoryDATA,
      selectedProductCategoryError,
      selectedProductCategoryIsLoading,
      createProductCategoryIsLoading,
      createProductCategoryError,
      deleteProductCategoryIsLoading,
      deleteProductCategoryError,
      setSelectedProductCategoryId,
      handleCreateProductCategory,
      handleDeleteProductCategory,
      handleUpdateProductCategory,
    };
  }, [
    productCategoriesDATA,
    productCategoriesError,
    productCategoriesIsLoading,
    selectedProductCategoryId,
    selectedProductCategoryDATA,
    selectedProductCategoryError,
    selectedProductCategoryIsLoading,
    createProductCategoryIsLoading,
    createProductCategoryError,
    deleteProductCategoryIsLoading,
    deleteProductCategoryError,
    setSelectedProductCategoryId,
    handleCreateProductCategory,
    handleDeleteProductCategory,
    handleUpdateProductCategory,
  ]);

  return (
    <ProductCategoriesAPIContext.Provider value={value}>
      {children}
    </ProductCategoriesAPIContext.Provider>
  );
}
