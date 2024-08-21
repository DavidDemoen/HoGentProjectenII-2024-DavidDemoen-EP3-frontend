import { Link } from "react-router-dom";
import { useAccountsContext } from "../../context/Accounts.context";
import { useEffect } from "react";

export function NavBarLinks() {
  const { loggedInAccount } = useAccountsContext();

  const accountTypeName = loggedInAccount?.accountTypeName || null;

  useEffect(() => {
    renderDashboard();
  }, [accountTypeName]);

  const renderDashboard = () => {
    return (
      (accountTypeName === "ADMIN" || accountTypeName === "PURCHASER") && (
        <Link to="/dashboard">Dashboard</Link>
      )
    );
  };

  return (
    <>
      <nav className="navbar-links-box">
        <Link to="/">Home</Link>
        {renderDashboard()}
        <Link to="/products">Products</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/about">About</Link>
      </nav>
    </>
  );
}
