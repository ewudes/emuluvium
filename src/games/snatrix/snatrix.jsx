import React, { useState, useEffect, useRef } from "react";
import { BOARD_SIZE, INITIAL_SNAKE, INITIAL_DIRECTION, HINT_SCHEME } from "./const";
import GameOver from "../../components/game-over/game-over";
import Nav from "../../components/nav/nav";
import Profile from "../../components/profile/profile";
import Hint from "../../components/hint/hint";
import "./snatrix.scss";

const getRandomCoord = () => ({
  x: Math.floor(Math.random() * BOARD_SIZE),
  y: Math.floor(Math.random() * BOARD_SIZE),
});

const Snatrix = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(getRandomCoord());
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [isGameOver, setIsGameOver] = useState(false);
  const [speed, setSpeed] = useState(200);
  const directionRef = useRef(direction);
  directionRef.current = direction;

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowUp':
          if (directionRef.current.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (directionRef.current.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (directionRef.current.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (directionRef.current.x === 0) setDirection({ x: 1, y: 0 });
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isGameOver) return;

    const interval = setInterval(() => {
      setSnake((prev) => {
        const newHead = {
          x: prev[0].x + directionRef.current.x,
          y: prev[0].y + directionRef.current.y,
        };

        const hasHitWall =
          newHead.x < 0 || newHead.x >= BOARD_SIZE || newHead.y < 0 || newHead.y >= BOARD_SIZE;

        const hasHitSelf = prev.some(segment => segment.x === newHead.x && segment.y === newHead.y);

        if (hasHitWall || hasHitSelf) {
          setIsGameOver(true);
          return prev;
        }

        const newSnake = [newHead, ...prev];

        const hasEatenFood = newHead.x === food.x && newHead.y === food.y;
        if (hasEatenFood) {
          setFood(getRandomCoord());
          if (speed > 50) setSpeed(speed - 5);
          return newSnake;
        }

        newSnake.pop();
        return newSnake;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [food, speed, isGameOver]);

  const restartGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(getRandomCoord());
    setIsGameOver(false);
    setSpeed(200);
  };

  return (
    <div className="snatrix">
      <Nav/>
      <Profile />
      <div
        className="snatrix__board"
        style={{
          gridTemplateColumns: `repeat(${BOARD_SIZE}, 30px)`,
          gridTemplateRows: `repeat(${BOARD_SIZE}, 30px)`,
        }}
      >
        {Array.from({ length: BOARD_SIZE * BOARD_SIZE }).map((_, i) => {
          const x = i % BOARD_SIZE;
          const y = Math.floor(i / BOARD_SIZE);
          const isSnake = snake.some(segment => segment.x === x && segment.y === y);
          const isFood = food.x === x && food.y === y;

          return (
            <div
              key={i}
              className={`snatrix__cell ${
                isSnake ? 'snake' : isFood ? 'food' : ''
              }`}
            />
          );
        })}
      </div>
      {isGameOver && <GameOver score={11} gameTime={100} handleClick={restartGame}/>}
      <Hint scheme={HINT_SCHEME}/>
    </div>
  );
};

export default Snatrix;
