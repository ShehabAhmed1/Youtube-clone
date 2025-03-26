import React from "react";
/*** imgs ***/
import logo from "../images/logo2.jpg";
import persone from "../images/jack.png";
/*** icons ***/
import { IoMenu } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { IoMdNotifications } from "react-icons/io";
import { CgMoreR } from "react-icons/cg";
import { RiVideoAddFill } from "react-icons/ri";

function NavBar() {
  return (
    <nav>
      <div className="main-container">
        <div className="nav-content">
          <MenuLogo />
          <Search />
          <PersonalPart />
        </div>
      </div>
    </nav>
  );
}

//c1=> component 1
/** c1 menue-logo component***/
function MenuLogo() {
  return (
    <div className="menu-logo">
      <div className="menu-icon micon" onClick={ControleSideBar}>
        <IoMenu />
      </div>
      <div className="logo">
        <img src={logo} alt="webSite logo" />
      </div>
    </div>
  );
}

/** c2 search component **/
function Search() {
  return (
    <div className="search">
      <input type="search" name="search" placeholder="search..." />
      <div className="searchIcon">
        <CiSearch />
      </div>
    </div>
  );
}

/** c3 personal component **/
function PersonalPart() {
  return (
    <div className="personal">
      <div className="upload-icon micon none">
        <RiVideoAddFill />
      </div>
      <div className="more-icon micon none">
        <CgMoreR />
      </div>
      <div className="notification-icon micon none">
        <IoMdNotifications />
      </div>
      <figure className="person-img">
        <img src={persone} alt="persone" />
      </figure>
    </div>
  );
}

/** fun to controle in sidebar show it and hidden it***/
function ControleSideBar() {
  let sidebar = document.querySelector(".sidebar");
  let overlayout = document.querySelector(".overlayout");
  if (sidebar.classList.contains("active")) {
    sidebar.classList.remove("active");
    overlayout.classList.remove("active");
  } else {
    sidebar.classList.add("active");
    overlayout.classList.add("active");
  }
}
export { NavBar, MenuLogo, ControleSideBar };
