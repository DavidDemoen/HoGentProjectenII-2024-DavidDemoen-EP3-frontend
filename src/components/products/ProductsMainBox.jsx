import { ProductsFilterBox } from "./products_filter/ProductsFilterBox";
import { ProductsItemsBox } from "./products_items/ProductsItemsBox";
import { ProductsSearchbarBox } from "./products_searchbar/ProductsSearchbarBox";
import { useManufacturersAPIContext } from "../../context/Manufacturers.API.context";
import { useShoppingCartContext } from "../../context/ShoppingCart.context";
import AsyncData from "../AsyncData";
import { ProductCategoriesAPIContextProvider } from "../../context/ProductCategories.API.context";
import { useAccountsContext } from "../../context/Accounts.context";
import useSWR from "swr";
import { getById } from "../../api/index";
import { useNavigate } from "react-router-dom";
import { getAll } from "../../api/index";
import { PaginationBox } from "../ui_element/pagination/PaginationBox";
import { useState } from "react";
import { useFilterContext } from "../../context/ui_context/Filter.context";

export function ProductsMainBox() {
  const { filterCategories, filterManufacturers } = useFilterContext();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { shopCompany } = useAccountsContext();
  const { cartItems } = useShoppingCartContext();
  console.log(shopCompany);
  const {
    data: companyDATA = { company: {} },
    error: companyError,
    isLoading: companyIsLoading,
  } = useSWR({ url: `companies/${shopCompany}` }, getById);
  const { company } = companyDATA;

  const formatCategories = (categories) => {
    return categories.map((category) => category.referenceId).join(",");
  };
  const formatManufacturers = (manufacturers) => {
    return manufacturers.map((manufacturer) => manufacturer.id).join(",");
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const {
    data: productsDATA = { products: [] },
    error: productsError,
    isLoading: productsIsLoading,
  } = useSWR(
    {
      url: `products?companyId=${shopCompany}&page=${page}&manufacturerId=${formatManufacturers(
        filterManufacturers
      )}&productCategoryId=${formatCategories(
        filterCategories
      )}&search=${search}`,
    },
    getAll
  );

  const { products, totalItems: totalProductItems, pagination } = productsDATA;

  const {
    manufacturersDATA: { manufacturers },
    manufacturersError,
    manufacturersIsLoading,
  } = useManufacturersAPIContext();

  const navigate = useNavigate();

  const handleClickChangeShop = () => {
    localStorage.removeItem("shopCompany");
    navigate("/shopselection");
  };
  return (
    <>
      <div className="products-main-box-top">
        <AsyncData
          loading={companyIsLoading}
          error={companyError}
          type="Company data"
        >
          <div className="products-main-change-shop">
            {cartItems.length === 0 ? (
              <p
                className="products-main-change-shop-button"
                onClick={handleClickChangeShop}
              >
                Change Shop
              </p>
            ) : (
              <p>
                Please complete your order or empty your shopping cart before
                changing shop
              </p>
            )}
          </div>
          <div className="products-main-box-header">
            <p>{company.name} Shop</p>
          </div>
          <div className="products-main-box-img">
            <p>img placeholder</p>
          </div>
        </AsyncData>
      </div>
      <AsyncData
        error={manufacturersError || productsError}
        loading={manufacturersIsLoading || productsIsLoading}
        type="Products"
      >
        <ProductCategoriesAPIContextProvider>
          <ProductsFilterBox productsCount={totalProductItems} />
        </ProductCategoriesAPIContextProvider>
        <ProductsSearchbarBox setSearch={setSearch} search={search} />
        <ProductsItemsBox manufacturers={manufacturers} products={products} />
        <PaginationBox
          pagination={pagination}
          handlePageChange={handlePageChange}
        />
      </AsyncData>
    </>
  );
}
