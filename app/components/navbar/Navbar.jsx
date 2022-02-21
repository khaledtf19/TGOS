import { useState, useContext, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import AuthContext from "../../context/Auth/AuthContext";

import {
  RiMenuLine,
  RiCloseFill,
  RiLoginBoxFill,
  RiLoginBoxLine,
  RiLogoutBoxLine,
  RiUser3Fill,
  RiUser3Line,
} from "react-icons/ri";
import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import { MdOutlineSwitchAccount, MdSwitchAccount } from "react-icons/md";

import classes from "./Navbar.module.css";

export const Links = ({ setNavMenu }) => {
  const router = useRouter();
  return (
    <>
      <li className={classes.navbar__item} onClick={() => setNavMenu(false)}>
        <Link href={`/`}>
          <a
            className={`${classes.navbar__link}  ${
              router.pathname == "/" ? classes.navbar__link__active : ""
            }`}
          >
            {router.pathname == "/" ? (
              <AiFillHome size="30" />
            ) : (
              <AiOutlineHome size="30" />
            )}
            Home
          </a>
        </Link>
      </li>
      <li className={classes.navbar__item} onClick={() => setNavMenu(false)}>
        <Link href={`/profile`}>
          <a
            className={`${classes.navbar__link}  ${
              router.pathname == "/profile" ? classes.navbar__link__active : ""
            }`}
          >
            {router.pathname == "/profile" ? (
              <RiUser3Fill size="30" />
            ) : (
              <RiUser3Line size="30" />
            )}
            Profile
          </a>
        </Link>
      </li>
    </>
  );
};

export const Auth = ({ setNavMenu }) => {
  const router = useRouter();
  const { user, render } = useContext(AuthContext);
  const [userData, setUserData] = user;
  const [rerender, setRerender] = render;

  const handleLogout = () => {
    setNavMenu(false);
    localStorage.removeItem("auth-token");
    setRerender(!rerender);
    setUserData(null);
  };

  return (
    <>
      {userData ? (
        <li className={classes.navbar__item} onClick={() => handleLogout()}>
          <Link href={`/login`}>
            <a className={classes.navbar__link}>
              <RiLogoutBoxLine size="30" />
              logout
            </a>
          </Link>
        </li>
      ) : (
        <>
          <li
            className={classes.navbar__item}
            onClick={() => setNavMenu(false)}
          >
            <Link href={`/login`}>
              <a
                className={`${classes.navbar__link}  ${
                  router.pathname == "/login"
                    ? classes.navbar__link__active
                    : ""
                }`}
              >
                {router.pathname == "/login" ? (
                  <RiLoginBoxFill size="30" />
                ) : (
                  <RiLoginBoxLine size="30" />
                )}
                Login
              </a>
            </Link>
          </li>
          <li
            className={classes.navbar__item}
            onClick={() => setNavMenu(false)}
          >
            <Link href={`/register`}>
              <a
                className={`${classes.navbar__link}  ${
                  router.pathname == "/register"
                    ? classes.navbar__link__active
                    : ""
                }`}
              >
                {router.pathname == "/register" ? (
                  <MdSwitchAccount size="30" />
                ) : (
                  <MdOutlineSwitchAccount size="30" />
                )}
                sign-up
              </a>
            </Link>
          </li>
        </>
      )}
    </>
  );
};

export const Navbar = () => {
  const [navMenu, setNavMenu] = useState(false);
  const { user, render } = useContext(AuthContext);
  const [userData, setUserData] = user;
  const [rerender, setRerender] = render;

  useEffect(() => {}, [userData, rerender, navMenu]);

  return (
    <>
      <div className={classes.navbar__container}>
        <div
          className={classes.navbar__menu__btn}
          onClick={() => {
            setNavMenu(!navMenu);
          }}
        >
          {!navMenu ? <RiMenuLine size={30} /> : <RiCloseFill size={30} />}
        </div>
        <div className={classes.navbar__big}>
          <ul
            className={`${classes.navbar__list__right}  ${classes.navbar__list}`}
          >
            <Links setNavMenu={setNavMenu} />
          </ul>
          <ul
            className={`${classes.navbar__list__right}  ${classes.navbar__list}`}
          >
            <Auth setNavMenu={setNavMenu} />
          </ul>
        </div>
      </div>
      {navMenu ? (
        <div
          className={`${classes.navMenu__container} ${classes.fade__in__top}`}
          onClick={() => setNavMenu(false)}
        >
          <div className={classes.mobile__menu}>
            <ul className={classes.navbar__list}>
              <Links setNavMenu={setNavMenu} />
              <Auth setNavMenu={setNavMenu} />
            </ul>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
