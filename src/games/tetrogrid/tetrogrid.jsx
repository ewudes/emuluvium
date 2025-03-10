import React, { memo, useEffect, useRef, useState } from "react";
import "./tetrogrid.scss";

const SHAPES = [
  {
    shape: [
      { x: 0, y: 0 }, { x: 1, y: 0 },
      { x: 0, y: 1 }, { x: 1, y: 1 },
    ],
    width: 2,
    height: 2,
    color: "yellow",
  },
  {
    shape: [
      { x: 0, y: 0 }, { x: 0, y: 1 },
      { x: 0, y: 2 }, { x: 0, y: 3 },
    ],
    width: 1,
    height: 4,
    color: "cyan",
  },
  {
    shape: [
      { x: 0, y: 0 }, { x: 0, y: 1 },
      { x: 0, y: 2 }, { x: 1, y: 2 },
    ],
    width: 2,
    height: 3,
    color: "orange",
  },
  {
    shape: [
      { x: 1, y: 0 }, { x: 1, y: 1 },
      { x: 1, y: 2 }, { x: 0, y: 2 },
    ],
    width: 2,
    height: 3,
    color: "blue",
  },
  {
    shape: [
      { x: 0, y: 0 }, { x: 1, y: 0 },
      { x: 1, y: 1 }, { x: 2, y: 1 },
    ],
    width: 3,
    height: 2,
    color: "red",
  },
  {
    shape: [
      { x: 1, y: 0 }, { x: 2, y: 0 },
      { x: 0, y: 1 }, { x: 1, y: 1 },
    ],
    width: 3,
    height: 2,
    color: "green",
  },
  {
    shape: [
      { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 },
      { x: 1, y: 1 },
    ],
    width: 3,
    height: 2,
    color: "purple",
  },
];

function randomShape() {
  const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
  return { ...shape };
}

const ROW_COUNT = 20;
const COLUMN_COUNT = 10;

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
  const [gameOver, setGameOver] = useState(false);
  const [fallSpeed, setFallSpeed] = useState(600);

  useEffect(updateDisplay, [scene, shape, position]);
  useEffect(removeFullLines, [scene]);

  useInterval(tick, fallSpeed);

  function updateDisplay() {
    setDisplay(mergeIntoStage(scene, shape, position));
  }

  function tick() {
    if (gameOver) return; 

    if (!movePosition(0, 1)) {
      placeShape();
    }
  }

  function placeShape() {
    if (gameOver) return;

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

    if (score >= 10000) {
      const newFallSpeed = Math.max(100, fallSpeed - 100);
      setFallSpeed(newFallSpeed);
    }
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
      setScore((oldVal) => oldVal + 1000);
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
    if (gameOver) return;

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
      default:
        return;
    }
    event.preventDefault();
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

  return [display, score, gameOver, nextShape, onKeyDown];
}

const Tetrogrid = () => {
  const [display, score, gameOver, nextShape, onKeyDown] = useBoard();
  const eBoard = useRef();

  useEffect(() => {
    if (eBoard.current) eBoard.current.focus();
  }, []);

  return (
    <div className="tetrogrid-wrap">
      <div className="tetrogrid__aside tetrogrid__aside--left">
        <div className="tetrogrid__score-wrap">
          <span className="tetrogrid__score-label">{score.toLocaleString()}</span>
        </div>
      </div>
      <div className="tetrogrid">
        <div ref={eBoard} className="tetrogrid__board" tabIndex={0} onKeyDown={onKeyDown}>
          {display.map((row, index) => (
            <Row key={index} row={row} />
          ))}
        </div>
      </div>
      <div className="tetrogrid__aside tetrogrid__aside--right">
        <div className="tetrogrid__level-wrap">
          <span className="tetrogrid__level-label">Салага</span>
        </div>
        <div className="tetrogrid__nextshape-wrap">
          <NextShapeDisplay shape={nextShape} />
        </div>
      </div>
      {gameOver && (
        <div className="game-over">
          <h2>Game Over!</h2>
          <p>Score: {score}</p>
        </div>
      )}
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
    <div className="next-shape-grid">
      {miniGrid.map((row, rowIndex) => (
        <div key={rowIndex} className="next-shape-row">
          {row.map((cell, cellIndex) => (
            <span key={cellIndex} className={`next-shape-cell ${cell ? `cell-${cell}` : ''}`}></span>
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
