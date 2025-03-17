export const SHAPES = [
  {
    shape: [
      { x: 0, y: 0 }, { x: 1, y: 0 },
      { x: 0, y: 1 }, { x: 1, y: 1 },
    ],
    width: 2,
    height: 2,
    color: 'yellow',
  },
  {
    shape: [
      { x: 0, y: 0 }, { x: 0, y: 1 },
      { x: 0, y: 2 }, { x: 0, y: 3 },
    ],
    width: 1,
    height: 4,
    color: 'cyan',
  },
  {
    shape: [
      { x: 0, y: 0 }, { x: 0, y: 1 },
      { x: 0, y: 2 }, { x: 1, y: 2 },
    ],
    width: 2,
    height: 3,
    color: 'orange',
  },
  {
    shape: [
      { x: 1, y: 0 }, { x: 1, y: 1 },
      { x: 1, y: 2 }, { x: 0, y: 2 },
    ],
    width: 2,
    height: 3,
    color: 'blue',
  },
  {
    shape: [
      { x: 0, y: 0 }, { x: 1, y: 0 },
      { x: 1, y: 1 }, { x: 2, y: 1 },
    ],
    width: 3,
    height: 2,
    color: 'red',
  },
  {
    shape: [
      { x: 1, y: 0 }, { x: 2, y: 0 },
      { x: 0, y: 1 }, { x: 1, y: 1 },
    ],
    width: 3,
    height: 2,
    color: 'green',
  },
  {
    shape: [
      { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 },
      { x: 1, y: 1 },
    ],
    width: 3,
    height: 2,
    color: 'purple',
  },
];

export const DIFFICULTY_LEVEL = {
  DEFAULT: 'Легкотня!',
  BEGINNER: 'Шуточки кончились',
  APPRENTICE: 'Начинает припекать!',
  VETERAN: 'Держись крепче, \n будет трясти!',
  MASTER: 'Воплощение отчаяния',
  LEGEND: 'Дьявол звонит, \n пора страдать!!',
}

export const SPEED_LEVEL = {
  DEFAULT: 600,
  BEGINNER: 500,
  APPRENTICE: 400,
  VETERAN: 300,
  MASTER: 200,
  LEGEND: 100,
}

export const DIFFICULTY_LEVELS = [
  {
    THRESHOLD: 1000,
    DESCRIPTION: DIFFICULTY_LEVEL.BEGINNER,
    SPEED: SPEED_LEVEL.BEGINNER
  },
  {
    THRESHOLD: 2000,
    DESCRIPTION: DIFFICULTY_LEVEL.APPRENTICE,
    SPEED: SPEED_LEVEL.APPRENTICE
  },
  {
    THRESHOLD: 4000,
    DESCRIPTION: DIFFICULTY_LEVEL.VETERAN,
    SPEED: SPEED_LEVEL.VETERAN
  },
  {
    THRESHOLD: 5000,
    DESCRIPTION: DIFFICULTY_LEVEL.MASTER,
    SPEED: SPEED_LEVEL.MASTER
  },
  {
    THRESHOLD: 10000,
    DESCRIPTION: DIFFICULTY_LEVEL.LEGEND,
    SPEED: SPEED_LEVEL.LEGEND
  },
];
