import React, { useEffect, useState, useRef } from 'react';
import { Link, withRouter } from "react-router-dom";
import { HINT_SCHEME } from "./const";
import Nav from "../../components/nav/nav";
import Profile from "../../components/profile/profile";
import Hint from "../../components/hint/hint";

import LeaderPic from "./../../vendor/decorate/profile-avatar.png";

import "./home.scss";

const Home = ({ history }) => {
  const links = [
    { label: 'TetroGrid', to: '/tetrogrid' },
    { label: 'Snatrix', to: '/snatrix' },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isNavActive, setIsNavActive] = useState(false);
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
      <Nav onActiveChange={setIsNavActive} />
      <div className="home__badge">
        <a href="https://github.com/ewudes/emuluvium" target="_blank" className="home__badge-icon"></a>
        <span className="home__badge-text">code on github</span>
      </div>
      <div className="home__profile">
        <Profile />
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
        <div className="home__left">
          <h2 className="home__leaders-title">8-битная элита</h2>
          <div className="home__leaders-wrap">
            <ul className="home__leaders-list">
              <li className="home__leaders-item"><img src={LeaderPic} width="55" height="55"/>Барсик<span>99999</span></li>
              <li className="home__leaders-item"><img src={LeaderPic} width="55" height="55"/>Томас<span>99999</span></li>
              <li className="home__leaders-item"><img src={LeaderPic} width="55" height="55"/>Рыжик<span>99999</span></li>
              <li className="home__leaders-item"><img src={LeaderPic} width="55" height="55"/>Пушистик<span>99999</span></li>
              <li className="home__leaders-item"><img src={LeaderPic} width="55" height="55"/>Муся<span>99999</span></li>
              <li className="home__leaders-item"><img src={LeaderPic} width="55" height="55"/>Борис<span>99999</span></li>
              <li className="home__leaders-item"><img src={LeaderPic} width="55" height="55"/>Пипи<span>99999</span></li>
              <li className="home__leaders-item"><img src={LeaderPic} width="55" height="55"/>Анатолий<span>99999</span></li>
              <li className="home__leaders-item"><img src={LeaderPic} width="55" height="55"/>Фара<span>99999</span></li>
              <li className="home__leaders-item"><img src={LeaderPic} width="55" height="55"/>Пиксель<span>99999</span></li>
            </ul>
          </div>
        </div>
        <div className="home__right">
          <h2 className="home__count-title">Статистика</h2>
          <ul className="home__count-list">
            <li className="home__count-item">Рейтинг:<span>99999</span></li>
            <li className="home__count-item">Любимая игра:<span>TetroGrid</span></li>
            <li className="home__count-item">Всего очков:<span>99999</span></li>
            <li className="home__count-item">Всего время:<span>99999</span></li>
            <li className="home__count-item">Ранг:<span>99999</span></li>
            <li className="home__count-item">Найдено котиков:<span>999</span></li>
          </ul>
        </div>
      </div>
      {!isNavActive && <Hint scheme={HINT_SCHEME} mode={HINT_SCHEME.MODE} />}
    </main>
  );
}

export default withRouter(Home);