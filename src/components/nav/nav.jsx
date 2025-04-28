import React, { useState, useRef, useEffect } from "react";
import Checkbox from "../checkbox/checkbox";
import "./nav.scss";

const Nav = ({ onActiveChange }) => {
  const [isActive, setIsActive] = useState(false);
  const navRef = useRef(null);
  const wrapperRef = useRef(null);

  const handleNavClick = () => {
    setIsActive(prev => {
      const newState = !prev;
      onActiveChange(newState);
      return newState;
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedOutsideNav = navRef.current && !navRef.current.contains(event.target);
      const clickedOutsideWrapper = wrapperRef.current && !wrapperRef.current.contains(event.target);

      if (clickedOutsideNav && clickedOutsideWrapper) {
        setIsActive(false);
        onActiveChange(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onActiveChange]);

  return (
    <>
      <div className={`nav ${isActive ? 'nav--active' : 'nav--not-active'}`} ref={navRef} onClick={handleNavClick}>
        <span className="nav__dash"></span>
        <span className="nav__dash"></span>
        <span className="nav__dash"></span>
      </div>
      <div
        className={`nav__wrapper ${isActive ? 'nav__wrapper-active' : ''}`}
        ref={wrapperRef}
      >
        <div className="nav__buttons">
          <button className="nav__button">Войти</button>
          <button className="nav__button">Регистрация</button>
        </div>
        <ul className="nav__list">
          <li className="nav__item">
            <Checkbox label="Язык" id="lang"/>
          </li>
          <li className="nav__item">
            <Checkbox label="Тема" id="scheme"/>
          </li>
          <li className="nav__item">
            <Checkbox label="Звук" id="volume"/>
          </li>
        </ul>
        <div className="nav__author">Made with 🖤 ewudes</div>
      </div>
    </> 
  );
}

export default Nav;