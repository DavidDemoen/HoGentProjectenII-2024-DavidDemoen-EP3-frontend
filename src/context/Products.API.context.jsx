import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import useSWR, { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import { getAll, getById, updateById, deleteById, create } from "../api/index";

const ProductsAPIContext = createContext();
const supplierAccount = import.meta.env.VITE_DEV_MAIN_SUPPLIER_ACCOUNT;
const mainCompany = import.meta.env.VITE_DEV_MAIN_COMPANY;

export function useProductsAPIContext() {
  return useContext(ProductsAPIContext);
}

export function ProductsAPIContextProvider({ children }) {
  // STATE
  const [selectedProductId, setSelectedProductId] = useState(null);
  // API calls Products
  const {
    data: productsDATA = { products: [] },
    error: productsError,
    isLoading: productsIsLoading,
  } = useSWR({ url: `companies/${mainCompany}/products` }, getAll);
  const {
    data: selectedProductDATA = { product: {} },
    error: selectedProductError,
    isLoading: selectedProductIsLoading,
  } = useSWR(
    selectedProductId ? { url: `products/${selectedProductId}` } : null,
    getById
  );
  const {
    trigger: updateProduct,
    isLoading: updateProductIsLoading,
    error: updateProductError,
  } = useSWRMutation(`products`, updateById);
  const {
    trigger: deleteProduct,
    isLoading: deleteProductIsLoading,
    error: deleteProductError,
  } = useSWRMutation(`products`, deleteById);
  const {
    trigger: createProduct,
    isLoading: createProductIsLoading,
    error: createProductError,
  } = useSWRMutation(`products`, create);

  const handleUpdateProduct = useCallback(
    async (values) => {
      console.log(values);
      await updateProduct(values);
      mutate({
        url: `companies/${mainCompany}/products`,
      });
      mutate({
        url: `products/${selectedProductId}`,
      });
    },
    [updateProduct, mutate]
  );
  const handleDeleteProduct = useCallback(
    async (id) => {
      console.log(`Delete product: ${id}`);
      await deleteProduct(id);
      mutate({
        url: `companies/${mainCompany}/products`,
      });
      mutate({
        url: `products/${selectedProductId}`,
      });
    },
    [deleteProduct, mutate]
  );
  const handleCreateProduct = useCallback(async (data) => {
    data.companyId = mainCompany;
    console.log(`Create product: ${JSON.stringify(data)}`);
    await createProduct(data);
    mutate({
      url: `companies/${mainCompany}/products`,
    });
    mutate({
      url: `products/${selectedProductId}`,
    });
  }, [createProduct, mutate]);

  // CONSOLE LOGS
  // useEffect(() => {
  //   console.log(selectedProductId);
  // }, [selectedProductId]);
  // useEffect(() => {
  //   console.log(selectedProductDATA);
  // }, [selectedProductDATA]);

  const value = useMemo(() => {
    return {
      productsDATA,
      productsError,
      productsIsLoading,
      selectedProductId,
      selectedProductDATA,
      selectedProductError,
      selectedProductIsLoading,
      updateProductIsLoading,
      updateProductError,
      deleteProductIsLoading,
      deleteProductError,
      createProductIsLoading,
      createProductError,
      setSelectedProductId,
      handleUpdateProduct,
      handleDeleteProduct,
      handleCreateProduct,
    };
  }, [
    productsDATA,
    productsError,
    productsIsLoading,
    selectedProductId,
    selectedProductDATA,
    selectedProductError,
    selectedProductIsLoading,
    updateProductIsLoading,
    updateProductError,
    deleteProductIsLoading,
    deleteProductError,
    createProductIsLoading,
    createProductError,
    setSelectedProductId,
    handleUpdateProduct,
    handleDeleteProduct,
    handleCreateProduct,
  ]);

  return (
    <ProductsAPIContext.Provider value={value}>
      {children}
    </ProductsAPIContext.Provider>
  );
}
