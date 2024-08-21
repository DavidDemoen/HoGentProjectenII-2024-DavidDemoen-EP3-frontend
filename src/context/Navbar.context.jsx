import { createContext, useContext, useMemo, useState } from "react";
import { GenericSideboxContainer } from "../components/ui_element/sidebox/GenericSideboxContainer";

const NavbarContext = createContext();

export function useNavbarContext() {
  return useContext(NavbarContext);
}

export function NavbarContextProvider({ children }) {
  const [accountsSideBoxIsOpen, setAccountsSideboxIsOpen] = useState(false);
  const [checkoutNavbar, setCheckoutNavbar] = useState(false);
  const [accountClosedByOutsideClick, setAccountClosedByOutsideClick] =
    useState(false);
  const [shoppingcartSideBoxIsOpen, setShoppingcartSideBoxIsOpen] =
    useState(false);

  const renderSidebox = () => {
    if (accountsSideBoxIsOpen) {
      return <GenericSideboxContainer type="account" />;
    }
    if (shoppingcartSideBoxIsOpen) {
      return <GenericSideboxContainer type="cart" />;
    }
  };
  const handleAccountClick = () => {
    setAccountsSideboxIsOpen(!accountsSideBoxIsOpen);
    setShoppingcartSideBoxIsOpen(false);
  };
  const handleCartClick = () => {
    setShoppingcartSideBoxIsOpen(!shoppingcartSideBoxIsOpen);
    setAccountsSideboxIsOpen(false);
  };

  console.log(accountClosedByOutsideClick);
  console.log(`CheckoutNavbar: ${checkoutNavbar}`);

  const value = useMemo(() => {
    return {
      accountsSideBoxIsOpen,
      shoppingcartSideBoxIsOpen,
      checkoutNavbar,
      setAccountsSideboxIsOpen,
      setShoppingcartSideBoxIsOpen,
      renderSidebox,
      handleAccountClick,
      handleCartClick,
      setAccountClosedByOutsideClick,
      setCheckoutNavbar,
    };
  }, [
    shoppingcartSideBoxIsOpen,
    accountsSideBoxIsOpen,
    checkoutNavbar,
    setAccountsSideboxIsOpen,
    setShoppingcartSideBoxIsOpen,
    renderSidebox,
    handleAccountClick,
    handleCartClick,
    setAccountClosedByOutsideClick,
    setCheckoutNavbar,
  ]);

  return (
    <NavbarContext.Provider value={value}>{children}</NavbarContext.Provider>
  );
}
