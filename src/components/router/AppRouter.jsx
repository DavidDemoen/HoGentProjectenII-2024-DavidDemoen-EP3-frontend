import { Home } from "../../pages/Home";
import { About } from "../../pages/About";
import { Contact } from "../../pages/Contact";
import { NotFound } from "../../pages/NotFound";
import { Dashboard } from "../../pages/Dashboard";
import { Products } from "../../pages/Products";
import { ProductDetails } from "../../pages/ProductDetails";
import { ShoppingCart } from "../../pages/ShoppingCart";
import { Checkout } from "../../pages/Checkout";
import { Login } from "../../pages/Login";
import { Routes, Route, useLocation } from "react-router-dom";
import { useNavbarContext } from "../../context/Navbar.context";
import { useEffect } from "react";
import { ShopSelection } from "../../pages/ShopSelection";
import { AccountSettings } from "../../pages/AccountSettings";
import { Join } from "../../pages/Join";
import { useAccountsContext } from "../../context/Accounts.context";

export function AppRouter() {
  const { setCheckoutNavbar } = useNavbarContext();

  const location = useLocation();
  useEffect(() => {
    location.pathname === "/checkout"
      ? setCheckoutNavbar(true)
      : setCheckoutNavbar(false);
  }, [location]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="dashboard" element={<Dashboard />} />
        <Route path="about" element={<About />} />
        <Route path="about/ecology" element={<About topic="ecology" />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
        <Route path="auth/login" element={<Login />} />
        <Route path="shopselection" element={<ShopSelection />} />
        <Route
          path="dashboard/sales"
          element={<Dashboard type={"Sales Metrics"} />}
        />
        <Route
          path="dashboard/categories"
          element={<Dashboard type={"Categories"} />}
        />
        <Route
          path="dashboard/products"
          element={<Dashboard type={"Products"} />}
        />
        <Route
          path="dashboard/products/edit/:id"
          element={<Dashboard type={"Edit Product"} />}
        />
        <Route
          path="dashboard/products/add"
          element={<Dashboard type={"Add Product"} />}
        />
        <Route
          path="dashboard/orders"
          element={<Dashboard type={"Orders"} />}
        />
        <Route
          path="dashboard/admins"
          element={<Dashboard type={"Admins"} />}
        />
        <Route
          path="dashboard/settings"
          element={<Dashboard type={"Settings"} />}
        />
        <Route
          path="dashboard/purchasers"
          element={<Dashboard type={"Purchasers"} />}
        />
        <Route
          path="dashboard/company-metrics"
          element={<Dashboard type={"Company Metrics"} />}
        />
        <Route
          path="dashboard/pending-orders"
          element={<Dashboard type={"Pending Orders"} />}
        />

        <Route path="products" element={<Products />} />
        <Route path="products/details/:id" element={<ProductDetails />} />
        <Route path="shopping-cart" element={<ShoppingCart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/account/settings" element={<AccountSettings />} />
        <Route path="join" element={<Join />} />
      </Routes>
    </>
  );
}
