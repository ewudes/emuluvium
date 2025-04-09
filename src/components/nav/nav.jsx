import React from "react";
import "./nav.scss";

const Nav = () => {
  return (
    <>
      <div className="hamburger not-active">
        <span className="hamburger__item"></span>
        <span className="hamburger__item"></span>
        <span className="hamburger__item"></span>
      </div>
      <div className="tetrogrid__nav"></div>
    </> 
  );
}

export default Nav;