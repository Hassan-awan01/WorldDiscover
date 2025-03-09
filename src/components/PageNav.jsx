import { NavLink } from "react-router-dom";
import Styles from "./PageNav.module.css";
import Logo from "./Logo";
function PageNav() {
  return (
    <ul className={Styles.nav}>
      <Logo />
      <li>
        <NavLink to="/product">Product</NavLink>
      </li>
      <li>
        <NavLink to="/pricing">Pricing</NavLink>
      </li>
      <li>
        <NavLink to="/login" className={Styles.ctaLink}>
          LogIn
        </NavLink>
      </li>
    </ul>
  );
}
export default PageNav;
