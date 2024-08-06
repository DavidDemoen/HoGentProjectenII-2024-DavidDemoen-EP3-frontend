import { Home } from "../../pages/Home";
import { About } from "../../pages/About";
import { Contact } from "../../pages/Contact";
import { NotFound } from "../../pages/NotFound";
import { Dashboard } from "../../pages/Dashboard";
import { Routes, Route } from "react-router-dom";

export function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="dashboard"
          element={<Dashboard type={"Sales Metrics"} />}
        />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
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
      </Routes>
    </>
  );
}
