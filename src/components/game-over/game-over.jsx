import React from "react";
import { Link } from "react-router-dom";
import "./game-over.scss";

const GameOver = ({score, gameTime, handleClick}) => {
  return (
    <>
      <div className="game-over">
        <ul className="game-over__rang-wrap">
          <li className="game-over__rang-item"></li>
          <li className="game-over__rang-item"></li>
          <li className="game-over__rang-item"></li>
        </ul>
        <h2>Потрачено!</h2>
        <p>Счет: {score}</p>
        <p>Время: {gameTime}</p>
        <div className="game-over__btns">
          <button className="game-over__restart-button" onClick={handleClick}>Играть заново</button>
          <Link to="/" className="game-over__home-button">Home</Link>
        </div>
      </div>
      <div className="game-over__overlay"></div>
    </>
  );
}

export default GameOver;