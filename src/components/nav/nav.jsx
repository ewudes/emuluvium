import React, { useState, useRef, useEffect } from "react";
import "./nav.scss";

const Nav = () => {
  const [isActive, setIsActive] = useState(false);
  const navRef = useRef(null);
  const wrapperRef = useRef(null);

  const handleNavClick = () => {
    setIsActive(prev => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedOutsideNav = navRef.current && !navRef.current.contains(event.target);
      const clickedOutsideWrapper = wrapperRef.current && !wrapperRef.current.contains(event.target);

      if (clickedOutsideNav && clickedOutsideWrapper) {
        setIsActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <div className={`nav ${isActive ? 'nav--active' : 'nav--not-active'}`} ref={navRef} onClick={handleNavClick}>
        <span className="nav__item"></span>
        <span className="nav__item"></span>
        <span className="nav__item"></span>
      </div>
      <div
        className={`nav__wrapper ${isActive ? 'nav__wrapper-active' : ''}`}
        ref={wrapperRef}
      ></div>
    </> 
  );
}

export default Nav;