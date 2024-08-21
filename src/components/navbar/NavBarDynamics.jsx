import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { MdOutlineAccountCircle } from "react-icons/md";
import { LuShoppingCart } from "react-icons/lu";
import { useNavbarContext } from "../../context/Navbar.context";
import { useShoppingCartContext } from "../../context/ShoppingCart.context";
import { useAccountsContext } from "../../context/Accounts.context";

export function NavBarDynamics() {
  const {
    handleCartClick,
    handleAccountClick,
    accountsSideBoxIsOpen,
    shoppingcartSideBoxIsOpen,
  } = useNavbarContext();
  const { amountOfItems } = useShoppingCartContext();
  const { loggedInAccount } = useAccountsContext();

  return (
    <>
      <div className="navbar-dyn-box">
        <div className="navbar-dyn-contact">
          { loggedInAccount ? <div><p>Hello {loggedInAccount.first_name}</p><p>{loggedInAccount.accountTypeName}</p></div> : "Not logged in"
          }</div>
        <div className="navbar-dyn-mains">
          <div>
            <HiOutlineMagnifyingGlass />
          </div>
          <div
            className={accountsSideBoxIsOpen ? "disabled-icon" : ""}
            onClick={handleAccountClick}
          >
            <MdOutlineAccountCircle />
          </div>
          <div className="">
            <LuShoppingCart
              className={shoppingcartSideBoxIsOpen ? "disabled-icon" : ""}
              onClick={handleCartClick}
            />
            <span className="navbar-notification-badge">{amountOfItems}</span>
          </div>
        </div>
      </div>
    </>
  );
}
