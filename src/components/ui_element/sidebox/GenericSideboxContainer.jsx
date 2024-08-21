import { useNavbarContext } from "../../../context/Navbar.context";
import { useEffect, useRef } from "react";
import { AccountsSideBox } from "../../sidebox/AccountsSideBox";
import { ShoppingcartSideBox } from "../../sidebox/ShoppingcartSideBox";
import "../../../../styles/ui_element/sidebox_styles.css";

export function GenericSideboxContainer({ type }) {
  const { setShoppingcartSideBoxIsOpen, handleAccountClick, handleCartClick } =
    useNavbarContext();
  const sideboxRef = useRef(null);

  const handleClickOutside = (event) => {
    if (sideboxRef.current && !sideboxRef.current.contains(event.target)) {
      if (type === "cart") {
        handleCartClick();
      } else if (type === "account") {
        handleAccountClick();
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="sidebox-underlay">
        <div ref={sideboxRef} className="sidebox-box">
          {type === "account" && <AccountsSideBox />}
          {type === "cart" && <ShoppingcartSideBox />}
        </div>
      </div>
    </>
  );
}
