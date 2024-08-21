import { useAuthContext } from "../../context/Auth.context";
import "../../../styles/ui_element/listTable_styles.css";
import { useAccountsContext } from "../../context/Accounts.context";
import { useShoppingCartContext } from "../../context/ShoppingCart.context";

export function LoginButtonBox({ handleClickLogin }) {
  const { logout } = useAuthContext();
  const { loggedInAccount } = useAccountsContext();
  const { resetCart } = useShoppingCartContext();

  const handleClickLogout = () => {
    resetCart();
    logout();
  };
  return (
    <>
      <div className="login-button-box table-button-box">
        <button
          type="submit"
          className="login-button table-button"
          onClick={handleClickLogin}
          disabled={loggedInAccount !== null}
        >
          Login
        </button>
        <button
          onClick={handleClickLogout}
          className="table-button"
          disabled={loggedInAccount === null}
        >
          Logout
        </button>
      </div>
    </>
  );
}
