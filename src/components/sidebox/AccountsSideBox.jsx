import { useNavigate } from "react-router";
import { useNavbarContext } from "../../context/Navbar.context";
import { useAccountsContext } from "../../context/Accounts.context";
import { useAuthContext } from "../../context/Auth.context";
import useSWR from "swr";
import { getById } from "../../api";
import AsyncData from "../AsyncData";
import { useShoppingCartContext } from "../../context/ShoppingCart.context";

export function AccountsSideBox() {
  const { setAccountsSideboxIsOpen } = useNavbarContext();
  const { loggedInAccount } = useAccountsContext();
  const { logout } = useAuthContext();
  const { resetCart } = useShoppingCartContext();

  const {
    data: company = { company: {} },
    error: companyError,
    isLoading: companyIsLoading,
  } = useSWR({ url: `companies/${loggedInAccount?.companyId}` }, getById);

  const navigate = useNavigate();

  const handleClickLogin = () => {
    setAccountsSideboxIsOpen(false);
    navigate("/auth/login");
  };
  const handleClickLogout = () => {
    setAccountsSideboxIsOpen(false);
    resetCart();
    logout();
  };
  const handleClickAccountSettings = () => {
    setAccountsSideboxIsOpen(false);
    navigate("/account/settings");
  };

  const renderBodyLoggedIn = () => {
    const { email, accountTypeName } = loggedInAccount;
    const {
      company: { name: companyName },
    } = company;
    return (
      <>
        <p>Email: {email}</p>
        <p>Account Type: {accountTypeName}</p>
        <p>Company: {companyName}</p>
      </>
    );
  };
  const renderButton = () => {
    if (loggedInAccount) {
      return (
        <AsyncData
          loading={companyIsLoading}
          error={companyError}
          type="Account Data"
        >
          <button className="sidebox-button" onClick={handleClickLogout}>
            ACCOUNT LOGOUT
          </button>
        </AsyncData>
      );
    }
    return (
      <button className="sidebox-button" onClick={handleClickLogin}>
        ACCOUNT LOGIN
      </button>
    );
  };

  return (
    <>
      <div className="sidebox-title">
        <p>Account</p>
      </div>
      <div className="sidebox-body">
        {loggedInAccount !== null ? renderBodyLoggedIn() : <p>Not Logged In</p>}
      </div>
      <div className="sidebox-footer-links">
        <p
          className="sidebox-account-settings-link"
          onClick={handleClickAccountSettings}
        >
          Account Settings
        </p>
        <div className="sidebox-buttons-box">{renderButton()}</div>
      </div>
    </>
  );
}
