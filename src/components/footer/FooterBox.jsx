import "../../../styles/footer_styles.css";
import { FooterItemBox } from "./FooterItemBox";
import { TfiYoutube } from "react-icons/tfi";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const footerItems = [
  {
    title: "Shops",
    items: [
      { name: "Shop Overview", link: "shops/overview" },
      { name: "Shop Search", link: "shops/search" },
      { name: "Shop Categories", link: "shops/categories" },
      { name: "Shop Brands", link: "shops/brands" },
    ],
  },
  {
    title: "Professionals",
    items: [
      { name: "Downloads", link: "professionals/downloads" },
      { name: "Projects", link: "professionals/projects" },
      { name: "Our Clients", link: "professionals/clients" },
      { name: "Tools", link: "professionals/tools" },
    ],
  },
  {
    title: "About B2B.io",
    items: [
      { name: "About Us", link: "about/aboutus" },
      { name: "Facts", link: "about/facts" },
      { name: "B2B Campus", link: "about/campus" },
      { name: "Sustainablility", link: "about/sustainability" },
      { name: "Magazine", link: "about/magazine" },
      { name: "Jobs & Careers", link: "about/jobs" },
      { name: "Press", link: "about/press" },
    ],
  },
  {
    title: "Tems & Conditions",
    items: [
      { name: "Terms of Use", link: "legal/termsofuse" },
      { name: "Distribution Rights", link: "legal/distributionrights" },
      { name: "Privacy Policy", link: "legal/privacypolicy" },
      { name: "Imprint", link: "legal/imprint" },
    ],
  },
  {
    title: "Contact",
    items: [
      { name: "Contact Us", link: "contact/contactus" },
      { name: "Service Hotline", link: "contact/hotline" },
      { name: "Customer Service", link: "contact/customerservice" },
      { name: "FAQ", link: "contact/faq" },
    ],
  },
  {
    title: "Online Shop",
    items: [
      { name: "Shopping Cart", link: "shop/overview" },
      { name: "Wishlist", link: "account/wishlist" },
      { name: "Payment Methods", link: "shop/paymentmethods" },
      { name: "Shipping Conditions", link: "shop/shippingconditions" },
      { name: "General Shopping Conditions", link: "shop/shoppingconditions" },
    ],
  },
];

export function FooterBox() {
  return (
    <>
      <div className="footer-main-box">
        <div className="footer-body">
          {footerItems.map(({ title, items }, index) => (
            <div key={index} className="footer-item-box">
              <FooterItemBox title={title} items={items} />
            </div>
          ))}
        </div>
        <div className="footer-info-box">
          <div className="footer-info-links">
            <div className="footer-info-links-item">
              <TfiYoutube />
            </div>
            <div className="footer-info-links-item">
              <FaTwitter />
            </div>
            <div className="footer-info-links-item">
              <FaFacebook />
            </div>
            <div className="footer-info-links-item">
              <FaPinterest />
            </div>
            <div className="footer-info-links-item">
              <FaInstagramSquare />
            </div>
            <div className="footer-info-links-item">
              <FaLinkedin />
            </div>
          </div>
          <div className="footer-juridicial">
            <p className="footer-juridicial-copyright">
              COPYRIGHT 2024 B2B.io INTERNATIONAL AG
            </p>
            <p className="footer-juridicial-coockies">Coockie settings</p>
          </div>
        </div>
      </div>
    </>
  );
}
