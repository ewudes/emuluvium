import React from "react";
import "./nav.scss";

const Nav = () => {
  return (
    <>
      <div className="nav not-active">
        <span className="nav__item"></span>
        <span className="nav__item"></span>
        <span className="nav__item"></span>
      </div>
      <div className="nav__wrapper"></div>
    </> 
  );
}

export default Nav;