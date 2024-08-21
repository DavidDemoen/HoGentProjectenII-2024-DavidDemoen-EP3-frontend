import { NavBarLinks } from "./NavBarLinks";
import { NavBarHeader } from "./NavBarHeader";
import { NavBarDynamics } from "./NavBarDynamics";
import "../../../styles/navbar_styles.css";
import { useNavbarContext } from "../../context/Navbar.context";
import { CheckoutNavBar } from "./CheckoutNavBar";

const renderregNavbar = () => {
  return (
    <div className="navbar-box">
      <NavBarHeader />
      <NavBarLinks />
      <NavBarDynamics />
    </div>
  );
};

export function NavBarBox() {
  const { checkoutNavbar } = useNavbarContext();

  return <>{checkoutNavbar ? <CheckoutNavBar /> : renderregNavbar()}</>;
}
