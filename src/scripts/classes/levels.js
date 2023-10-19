export class Level {
  constructor(minEnemySpawnDelay, maxEnemySpawnDelay) {
    this.minEnemySpawnDelay = minEnemySpawnDelay;
    this.maxEnemySpawnDelay = maxEnemySpawnDelay;
  }

  static fromPoints(points) {
    let level;
    for (const levelPoints in levels) {
      if (points >= levelPoints) {
        level = levels[levelPoints];
      } else {
        break;
      }
    }
    return level;
  }
}

const levels = {
  0: new Level(1000, 1500),
  10: new Level(800, 1300),
  20: new Level(700, 1200),
  30: new Level(600, 1100),
  50: new Level(500, 1000),
  70: new Level(400, 900),
  100: new Level(300, 800),
  130: new Level(200, 700),
  160: new Level(200, 600),
  200: new Level(200, 500),
  250: new Level(200, 400),
  300: new Level(150, 400),
  400: new Level(150, 350),
  500: new Level(150, 300),
  700: new Level(150, 250),
};
