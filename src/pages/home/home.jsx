import React from 'react';
import { Link } from 'react-router-dom';

import './home.scss'

const Home = () => {
  return (
    <main className="home__wrapper">
      <h1 className="home__title">Bit Nostalgia</h1>
      <ul className="home__list">
        <li className="home__item">
          <Link to="/tetris" className="home__link">TetroGrid</Link>
        </li>
      </ul>
    </main>
  );
}

export default Home;