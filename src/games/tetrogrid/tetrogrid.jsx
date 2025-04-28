import React, { memo, useEffect, useRef, useState } from "react";
import { SHAPES, DIFFICULTY_LEVEL, SPEED_LEVEL, DIFFICULTY_LEVELS, ROW_COUNT, COLUMN_COUNT, HINT_SCHEME } from "./const";
import GameOver from "../../components/game-over/game-over";
import Pause from "../../components/pause/pause";
import Nav from "../../components/nav/nav";
import Profile from "../../components/profile/profile";
import Hint from "../../components/hint/hint";
import "./tetrogrid.scss";

function randomShape() {
  const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
  return { ...shape };
}

function copyScene(scene) {
  return scene.map((row) => row.slice());
}

function mergeIntoStage(stage, shape, position) {
  let res = copyScene(stage);
  shape.shape.forEach((point) => {
    const x = point.x + position.x;
    const y = point.y + position.y;

    if (x >= 0 && y >= 0 && x < COLUMN_COUNT && y < ROW_COUNT) {
      res[y][x] = shape.color;
    }
  });

  return res;
}

function createEmptyScene() {
  return Array.from(Array(ROW_COUNT), () => Array(COLUMN_COUNT).fill(null));
}

function useBoard() {
  const [scene, setScene] = useState(createEmptyScene);
  const [shape, setShape] = useState(randomShape);
  const [nextShape, setNextShape] = useState(randomShape);
  const [position, setPosition] = useState({ x: 4, y: 0 });
  const [display, setDisplay] = useState(() => mergeIntoStage(scene, shape, position));
  const [score, setScore] = useState(0);
  const [isGameOver, setGameOver] = useState(false);
  const [fallSpeed, setFallSpeed] = useState(SPEED_LEVEL.DEFAULT);
  const [level, setLevel] = useState(DIFFICULTY_LEVEL.DEFAULT);
  const [isPaused, setPaused] = useState(false);
  const [highScore, setHighScore] = useState(() => {
    const savedHighScore = localStorage.getItem("highScore");
    return savedHighScore ? parseInt(savedHighScore, 10) : 0;
  });
  const [gameTime, setGameTime] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!isGameOver && !isPaused) {
      timerRef.current = setInterval(() => {
        setGameTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [isGameOver, isPaused]); 

  useEffect(updateDisplay, [scene, shape, position]);
  useEffect(removeFullLines, [scene]);

  useInterval(tick, fallSpeed);

  function updateDisplay() {
    setDisplay(mergeIntoStage(scene, shape, position));
  }

  function tick() {
    if (isGameOver || isPaused) return;

    if (!movePosition(0, 1)) {
      placeShape();
    }
  }

  function placeShape() {
    if (isGameOver) return;

    setScene((prevScene) => mergeIntoStage(prevScene, shape, position));

    const newShape = nextShape;
    const newPosition = { x: 4, y: 0 };
    const newNextShape = randomShape();

    if (!validPosition(newPosition, newShape)) {
      setGameOver(true);
      return;
    }

    setShape(newShape);
    setNextShape(newNextShape);
    setPosition(newPosition);
  }

  useEffect(() => {
    const selectedLevel = DIFFICULTY_LEVELS.findLast(({ THRESHOLD }) => score >= THRESHOLD) || { DESCRIPTION: DIFFICULTY_LEVEL.DEFAULT, SPEED: SPEED_LEVEL.DEFAULT };
    
    setLevel(selectedLevel.DESCRIPTION);
    setFallSpeed(selectedLevel.SPEED);
  }, [score]);

  function restartGame() {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("highScore", score.toString());
    }

    setScene(createEmptyScene());
    setShape(randomShape());
    setNextShape(randomShape());
    setPosition({ x: 4, y: 0 });
    setScore(0);
    setGameOver(false);
    setPaused(false);
    setFallSpeed(SPEED_LEVEL.DEFAULT);
    setLevel(DIFFICULTY_LEVEL.DEFAULT);
    setGameTime(0);
  }

  function rotateShape() {
    const tX = Math.floor(shape.width / 2);
    const tY = Math.floor(shape.height / 2);

    const newPoints = shape.shape.map((point) => {
      let { x, y } = point;
      x -= tX;
      y -= tY;

      let rX = -y;
      let rY = x;

      rX += tX;
      rY += tY;

      return { x: rX, y: rY };
    });

    const newShape = { ...shape, shape: newPoints };

    if (validPosition(position, newShape)) {
      setShape(newShape);
    }
  }

  function removeFullLines() {
    const newScene = copyScene(scene);
    let touched = false;

    const removeRow = (rY) => {
      for (let y = rY; y > 0; y--) {
        for (let x = 0; x < COLUMN_COUNT; x++) {
          newScene[y][x] = newScene[y - 1][x];
        }
      }
      for (let x = 0; x < COLUMN_COUNT; x++) {
        newScene[0][x] = null;
      }
      touched = true;
      setScore((oldVal) => oldVal + 100);
    };

    for (let y = 0; y < ROW_COUNT; y++) {
      if (newScene[y].every((cell) => cell !== null)) {
        removeRow(y);
      }
    }

    if (touched) {
      setScene(newScene);
    }
  }

  function onKeyDown(event) {
    if (isGameOver) return;

    if (isPaused && event.key !== " ") {
      event.preventDefault();
      return;
    }

    switch (event.key) {
      case "ArrowRight":
        movePosition(1, 0);
        break;
      case "ArrowLeft":
        movePosition(-1, 0);
        break;
      case "ArrowDown":
        movePosition(0, 1);
        break;
      case "ArrowUp":
        rotateShape();
        break;
      case " ":
        togglePause();
        break;
      case "r":
        restartGame();
      default:
        return;
    }

    event.preventDefault();
  }

  function togglePause() {
    setPaused((prev) => !prev);
  }

  function movePosition(x, y) {
    const res = { x: position.x + x, y: position.y + y };

    if (!validPosition(res, shape)) {
      if (y === -1) {
        setGameOver(true); 
      }
      return false;
    }

    setPosition(res);
    return true;
  }

  function validPosition(position, shape) {
    return shape.shape.every(({ x, y }) => {
      const tX = x + position.x;
      const tY = y + position.y;
      return tX >= 0 && tX < COLUMN_COUNT && tY >= 0 && tY < ROW_COUNT && scene[tY][tX] === null;
    });
  }

  function useInterval(callback, delay) {
    const callbackRef = useRef();

    useEffect(() => {
      callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
      const interval = setInterval(() => callbackRef.current(), delay);
      return () => clearInterval(interval);
    }, [delay]);
  }

  return [display, score, isGameOver, nextShape, level, onKeyDown, isPaused, restartGame, fallSpeed, highScore, gameTime];
}

function formatGameTime(seconds) {
  if (seconds < 60) {
    return `${seconds} сек`;
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes} мин ${remainingSeconds} сек`;
}

const Tetrogrid = () => {
  const [display, score, isGameOver, nextShape, level, onKeyDown, isPaused, restartGame, fallSpeed, highScore, gameTime] = useBoard();
  const eBoard = useRef();

  useEffect(() => {
    if (eBoard.current) eBoard.current.focus();
  }, []);

  useEffect(() => {
    const ensureFocus = () => {
      if (document.activeElement !== eBoard.current) {
        eBoard.current?.focus();
      }
    };
  
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        setTimeout(ensureFocus, 0);
      }
    };
  
    const handleClickAnywhere = (event) => {
      if (!eBoard.current?.contains(event.target)) {
        setTimeout(ensureFocus, 0);
      }
    };
  
    window.addEventListener("blur", ensureFocus);
    window.addEventListener("focus", ensureFocus);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("click", handleClickAnywhere);
  
    ensureFocus();
  
    return () => {
      window.removeEventListener("blur", ensureFocus);
      window.removeEventListener("focus", ensureFocus);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("click", handleClickAnywhere);
    };
  }, []);
  
  const handleRestart = () => {
    restartGame();
    if (eBoard.current) eBoard.current.focus();
  };

  useEffect(() => {
    const stars = document.querySelectorAll(".tetrogrid__star");
    stars.forEach((star, index) => {
      const speedNormalized = Math.round((SPEED_LEVEL.DEFAULT - fallSpeed) / 100);

      if (index < speedNormalized) {
        star.classList.add("tetrogrid__star--active");
      } else {
        star.classList.remove("tetrogrid__star--active");
      }
    });
  }, [fallSpeed]);

  return (
    <div className="tetrogrid">
      <div className={`tetrogrid__bg-wrap tetrogrid__bg-wrap--default ${isGameOver || isPaused ? 'tetrogrid__bg-stop' : ''}`}>
        <div className="tetrogrid__bg"></div>
        <div className="tetrogrid__bg"></div>
      </div>
      <Nav/>
      <div className="tetrogrid__profile">
        <Profile />
      </div>
      <div className="tetrogrid__aside tetrogrid__aside--left">
        <div className="tetrogrid__score-wrap">
          <span className="tetrogrid__score-label">Текущий: <span>{score.toLocaleString()}</span></span>
          <span className="tetrogrid__score-label">Лучший: <span>{highScore.toLocaleString()}</span></span>
          <span className="tetrogrid__score-label">Ранг: <span>N/A</span></span>
          <span className="tetrogrid__score-label tetrogrid__score-label--tasks">Задания</span>
          <ul className="tetrogrid__tasks-list">
            <li className="tetrogrid__tasks-item">N/A</li>
            <li className="tetrogrid__tasks-item">N/A</li>
            <li className="tetrogrid__tasks-item">N/A</li>
          </ul>
        </div>
      </div>
      <div className="tetrogrid__wrapper">
        <div className="tetrogrid__fires-wrap">
          <ul className="tetrogrid__fires">
            <li className="tetrogrid__fire"></li>
            <li className="tetrogrid__fire"></li>
            <li className="tetrogrid__fire"></li>
            <li className="tetrogrid__fire"></li>
            <li className="tetrogrid__fire"></li>
          </ul>
        </div>
        <div ref={eBoard} className="tetrogrid__board tetrogrid__bg-inside" tabIndex={0} onKeyDown={onKeyDown}>
          {display.map((row, index) => (
            <Row key={index} row={row} />
          ))}
        </div>
      </div>
      <div className="tetrogrid__aside tetrogrid__aside--right">
        <div className="tetrogrid__level-wrap">
          <span className="tetrogrid__level-label">{level}</span>
        </div>
        <div className="tetrogrid__nextshape-wrap tetrogrid__bg-inside">
          <NextShapeDisplay shape={nextShape} />
        </div>
      </div>
      {isGameOver && <GameOver score={score} gameTime={formatGameTime(gameTime)} handleClick={handleRestart} />}
      {isPaused && <Pause />}
      <Hint scheme={HINT_SCHEME} mode={HINT_SCHEME.MODE}/>
    </div>
  );
};

const NextShapeDisplay = ({ shape }) => {
  if (!shape) return null;

  const gridSize = 4;
  const miniGrid = Array.from({ length: gridSize }, () => Array(gridSize).fill(null));

  shape.shape.forEach(({ x, y }) => {
    if (x < gridSize && y < gridSize) {
      miniGrid[y][x] = shape.color;
    }
  });

  return (
    <div className="tetrogrid__next-shape-grid">
      {miniGrid.map((row, rowIndex) => (
        <div key={rowIndex} className="tetrogrid__next-shape-row">
          {row.map((cell, cellIndex) => (
            <span key={cellIndex} className={`tetrogrid__next-shape-cell ${cell ? `cell-${cell}` : ''}`}></span>
          ))}
        </div>
      ))}
    </div>
  );
};

const Row = memo(({ row }) => (
  <div className="tetrogrid__row">
    {row.map((cell, index) => (
      <Cell key={index} cell={cell} />
    ))}
  </div>
));

const Cell = memo(({ cell }) => {
  const cellClass = cell ? `tetrogrid__cell tetrogrid__cell-${cell}` : 'tetrogrid__cell';
  return <span className={cellClass}></span>;
});

export default memo(Tetrogrid);
