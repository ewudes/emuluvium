import React from 'react';
import { Link } from 'react-router-dom';

import './home.scss'

const Home = () => {
  return (
    <main className="home__wrapper">
      <div className="home__badge">
        <a href="#" className="home__badge-icon"></a>
        <span className="home__badge-text">code on github</span>
      </div>
      <h1 className="home__title">Emuluvium</h1>
      <ul className="home__list">
        <li className="home__item">
          <Link to="/tetrogrid" className="home__link">TetroGrid</Link>
        </li>
      </ul>
    </main>
  );
}

export default Home;