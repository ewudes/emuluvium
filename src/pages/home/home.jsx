import React from "react";
import { Link } from "react-router-dom";
import { HINT_SCHEME } from "./const";
import Nav from "../../components/nav/nav";
import Hint from "../../components/hint/hint";

import "./home.scss";

const Home = () => {
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
          <li className="home__item">
            <Link to="/tetrogrid" className="home__link">TetroGrid</Link>
          </li>
          <li className="home__item">
            <Link to="/snatrix" className="home__link">Snatrix</Link>
          </li>
        </ul>
      </div>
      <Hint scheme={HINT_SCHEME} mode={HINT_SCHEME.MODE}/>
    </main>
  );
}

export default Home;