import { NavLink } from "react-router-dom";
import s from "./Header.module.css";
import MainLogo from "../../assets/images/icons/mainlogo.svg?react";
import clsx from "clsx";

const Header = () => {
  const setActiveClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.active);
  };
  return (
    <header className={s.header}>
      <div className={s.wrapLogo}>
        <MainLogo className={s.logo} />
      </div>
      <nav className={s.navWrap}>
        <NavLink className={setActiveClass} to="/">
          Home
        </NavLink>
        <NavLink className={setActiveClass} to="/catalog">
          Catalog
        </NavLink>
        <NavLink className={setActiveClass} to="/favorites">
          Favorites
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
