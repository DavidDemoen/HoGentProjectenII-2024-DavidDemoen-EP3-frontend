import { AppRouter } from "./components/router/AppRouter";
import { NavBarBox } from "./components/navbar/NavBarBox";
import { SidebarContextProvider } from "./context/ui_context/Sidebar.context";
import { AdminDashboardContextProvider } from "./context/AdminDashboard.context";
import { ProductsAPIContextProvider } from "./context/Products.API.context";

function App() {
  return (
    <>
      <NavBarBox />
      <ProductsAPIContextProvider>
        <AdminDashboardContextProvider>
          <SidebarContextProvider>
            <AppRouter />
          </SidebarContextProvider>
        </AdminDashboardContextProvider>
      </ProductsAPIContextProvider>
    </>
  );
}

export default App;
