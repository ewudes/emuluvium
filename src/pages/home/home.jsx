import React, { useEffect, useState, useRef } from 'react';
import { Link, withRouter } from "react-router-dom";
import { HINT_SCHEME } from "./const";
import Nav from "../../components/nav/nav";
import Hint from "../../components/hint/hint";

import "./home.scss";

const Home = ({ history }) => {
  const links = [
    { label: 'TetroGrid', to: '/tetrogrid' },
    { label: 'Snatrix', to: '/snatrix' },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const linkRefs = useRef([]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
        setActiveIndex((prev) => (prev + 1) % links.length);
      } else if (e.key === 'ArrowUp') {
        setActiveIndex((prev) => (prev - 1 + links.length) % links.length);
      } else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        const activeLink = links[activeIndex];
        if (activeLink) {
          history.push(activeLink.to);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, links, history]);

  return (
    <main className="home__wrapper">
      <div className="home__bg-wrap">
        <div className="home__bg"></div>
        <div className="home__bg"></div>
      </div>
      <Nav />
      <div className="home__badge">
        <a href="https://github.com/ewudes/emuluvium" target="_blank" className="home__badge-icon"></a>
        <span className="home__badge-text">code on github</span>
      </div>
      <div className="home__overlay">
        <h1 className="home__title">Emuluvium</h1>
        <ul className="home__list">
          {links.map((link, index) => (
            <li
              key={link.to}
              className={`home__item ${index === activeIndex ? 'home__item-active' : ''}`}
            >
              <Link
                to={link.to}
                className="home__link"
                ref={(el) => (linkRefs.current[index] = el)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Hint scheme={HINT_SCHEME} mode={HINT_SCHEME.MODE}/>
    </main>
  );
}

export default withRouter(Home);