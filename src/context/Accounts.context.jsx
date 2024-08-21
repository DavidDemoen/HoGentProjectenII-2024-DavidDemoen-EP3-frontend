import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuthContext } from "./Auth.context";

const AccountsContext = createContext();

const mainSupplier = {
  id: 20,
  first_name: "David",
  last_name: "Demoen",
  phone: "+32456123475",
  email: "harmonic_rift@b2b.io",
  password: "password",
  companyId: 13,
  accountTypeName: "SUPPLIER",
  addressId: 1,
  gender: {
    id: "2",
    name: "male",
    abbreviation: "M",
    salutation: "Mr.",
  },
};

export function useAccountsContext() {
  return useContext(AccountsContext);
}

export function AccountsContextProvider({ children }) {
  const [shopCompany, setShopCompany] = useState(() => {
    const storedShopCompany = localStorage.getItem("shopCompany");
    return storedShopCompany ? JSON.parse(storedShopCompany) : null;
  });
  const [loggedInAccount, setLoggedInAccount] = useState(null);
  const [supplierAccount, setSupplierAccount] = useState(mainSupplier);

  useEffect(() => {
    localStorage.setItem("shopCompany", JSON.stringify(shopCompany));
  }, [shopCompany]);

  const { account } = useAuthContext();

  useEffect(() => {
    setLoggedInAccount(account);
  }, [account]);

  useEffect(() => {
    console.log(loggedInAccount);
    console.log(shopCompany);
  }, [loggedInAccount]);

  const value = useMemo(() => {
    return {
      shopCompany,
      supplierAccount,
      loggedInAccount,
      setShopCompany,
      setSupplierAccount,
      setLoggedInAccount,
    };
  }, [
    shopCompany,
    supplierAccount,
    loggedInAccount,
    setShopCompany,
    setSupplierAccount,
    setLoggedInAccount,
  ]);

  return (
    <AccountsContext.Provider value={value}>
      {children}
    </AccountsContext.Provider>
  );
}
