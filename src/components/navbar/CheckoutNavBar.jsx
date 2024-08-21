import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export function CheckoutNavBar() {
  const navigate = useNavigate();
  const handleClickCart = () => {
    navigate("/shopping-cart");
  };
  const handleClickQuestions = () => {
    console.log("Questions");
  };
  return (
    <>
      <div className="navbar-box checkout-navbar-box">
        <div className="checkout-navbar-cart-link" onClick={handleClickCart}>
          <MdOutlineKeyboardArrowLeft />
          <p>To shopping cart</p>
        </div>
        <div className="checkout-navbar-questions">
          <p className="no-underline">Do you have a question?</p>
          <p className="hover" onClick={handleClickQuestions}>
            We're happy to help
          </p>
        </div>
      </div>
    </>
  );
}
