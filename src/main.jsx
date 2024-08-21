import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "../styles/styles.css";
import { NavbarContextProvider } from "./context/Navbar.context.jsx";
import { AccountsContextProvider } from "./context/Accounts.context.jsx";
import { AuthContextProvider } from "./context/Auth.context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <AccountsContextProvider>
        <BrowserRouter>
          <NavbarContextProvider>
            <App />
          </NavbarContextProvider>
        </BrowserRouter>
      </AccountsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
