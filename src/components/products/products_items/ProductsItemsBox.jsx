import { useAccountsContext } from "../../../context/Accounts.context";
import { ProductItem } from "./ProductItem";

export function ProductsItemsBox({ manufacturers, products }) {
  const { shopCompany } = useAccountsContext();

  // const {
  //   data: productsDATA = { products: [] },
  //   error: productsError,
  //   isLoading: productsIsLoading,
  // } = useSWR({ url: `companies/${shopCompany}/products` }, getAll);

  const getManufacturer = (id) => {
    return manufacturers.find((manufacturer) => manufacturer.id === id);
  };

  return (
    <>
      <div className="product-items-box">
        {products.map((product) => {
          return (
            <ProductItem
              key={product.id}
              {...product}
              manufacturer={getManufacturer(product.manufacturerId)}
            />
          );
        })}
      </div>
    </>
  );
}
