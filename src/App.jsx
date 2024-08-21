import { AppRouter } from "./components/router/AppRouter";
import { NavBarBox } from "./components/navbar/NavBarBox";
import { SidebarContextProvider } from "./context/ui_context/Sidebar.context";
import { AdminDashboardContextProvider } from "./context/AdminDashboard.context";
import { ProductsAPIContextProvider } from "./context/Products.API.context";
import { FilterBoxContextProvider } from "./context/ui_context/FilterBox.context";
import { FilterContextProvider } from "./context/ui_context/Filter.context";
import { useNavbarContext } from "./context/Navbar.context";
import { ShoppingCartContextProvider } from "./context/ShoppingCart.context";
import { AccountsContextProvider } from "./context/Accounts.context";
import { AuthContextProvider } from "./context/Auth.context";
import { FooterBox } from "./components/footer/FooterBox";

const style = {
  paddingTop: "6.5rem",
  flex: 1
};

function App() {
  const { renderSidebox } = useNavbarContext();

  return (
    <>
      <FilterContextProvider>
        <ProductsAPIContextProvider>
          <ShoppingCartContextProvider>
            <AdminDashboardContextProvider>
              <FilterBoxContextProvider>
                <SidebarContextProvider>
                  <div className="app-main-box">
                    <NavBarBox />
                    <div style={style}>
                      {renderSidebox()}
                      <AppRouter />
                    </div>
                    <FooterBox />
                  </div>
                </SidebarContextProvider>
              </FilterBoxContextProvider>
            </AdminDashboardContextProvider>
          </ShoppingCartContextProvider>
        </ProductsAPIContextProvider>
      </FilterContextProvider>
    </>
  );
}

export default App;
