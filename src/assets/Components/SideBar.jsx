import React, { useState } from "react";
import { MenuLogo } from "./NavBar";
/*** imgs ***/
import cameron from "../images/cameron.png";
import gerard from "../images/gerard.png";
import megan from "../images/megan.png";
import simon from "../images/simon.png";

/*** icons ***/
import { IoHome } from "react-icons/io5";
import { FaBook } from "react-icons/fa"; // Alternative to GiQuran
import { FaUser } from "react-icons/fa"; // Alternative to FaUserNinja (or GiScrollUnfurled)
import { FaTerminal } from "react-icons/fa"; // Alternative to GiCode (and originally FaCode)import { FaDesktop } from "react-icons/fa"; // Alternative to FaLaptopCode
import { FaRss } from "react-icons/fa"; // Alternative to FaNewspaper
import { MdOutlineSportsGymnastics } from "react-icons/md";
import { ImBlog } from "react-icons/im";
import { IoGameController } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FaPaw } from "react-icons/fa";

/** data **/
const content = [
  {
    icon: <IoHome />, // Quran icon
    label: "Home ",
    href: "/",
    category: 0,
  },
  {
    icon: <FaPaw />, // Quran icon
    label: "Pets & Animals",
    href: "/",
    category: 15,
  },
  {
    icon: <MdOutlineSportsGymnastics />, // Represents history (Seerah)
    label: "Sports",
    href: "/",
    category: 17,
  },
  {
    icon: <FaTerminal />, // Coding basics
    label: " Science & Technology ",
    href: "/",
    category: 28,
  },
  {
    icon: <FaUser />, // Web development
    label: "Howto & Style ",
    href: "/",
    category: 26,
  },
  {
    icon: <ImBlog />, // Algorithms & data structures
    label: "People & Blogs",
    href: "/",
    category: 22,
  },
  {
    icon: <FaRss />, // Tech news
    label: " News & Politics",
    href: "/",
    category: 25,
  },
  {
    icon: <IoGameController />, // Tech news
    label: "Gaming ",
    href: "/",
    category: 20,
  },
];

const subscriptions = [
  {
    name: "cameron Ali",
    image: cameron,
  },
  {
    name: "gerard Mohammed",
    image: gerard,
  },
  {
    name: "megan Khaled",
    image: megan,
  },
  {
    name: "simon Hassan",
    image: simon,
  },
];

let categoryback = 0;
function SideBar({ category, Setcategory }) {
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <MenuLogo />
        <Content category={category} Setcategory={Setcategory} />
        <Subscriptions />
      </div>
    </div>
  );
}

function Content({ category, Setcategory }) {
  return (
    <ul className="content">
      {content.map((item, index) => (
        <li
          key={index}
          className={category === item.category ? "active" : ""}
          onClick={() => {
            Setcategory(item.category);
            categoryback = item.category;
          }}
        >
          <Link to={item.href}>
            <span>{item.icon}</span>
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
function Subscriptions() {
  return (
    <ul className="subscriptions">
      <h2>subscriptions</h2>
      {subscriptions.map((p, index) => {
        return (
          <li key={index}>
            <figure>
              <img src={p.image} alt="person photo" />
            </figure>
            <span>
              {p.name.length > 11 ? p.name.slice(0, 11) + "..." : p.name}
            </span>
            <span className="active"></span>
          </li>
        );
      })}
    </ul>
  );
}
export { SideBar, categoryback };
