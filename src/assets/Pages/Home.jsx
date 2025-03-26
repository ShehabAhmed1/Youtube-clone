import React, { useState } from "react";
import { NavBar, ControleSideBar } from "../Components/NavBar";
import { SideBar, categoryback } from "../Components/SideBar";
import { Videos } from "../Components/videos";

const Home = () => {
  const [category, Setcategory] = useState(categoryback | 0);
  return (
    <section className="home">
      <NavBar />
      <SideBar category={category} Setcategory={Setcategory} />
      <Videos category={category} Setcategory={Setcategory} />
      <div className="overlayout" onClick={ControleSideBar}></div>
    </section>
  );
};

export { Home };
