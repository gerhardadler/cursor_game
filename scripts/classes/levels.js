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
  0: new Level(200, 300),
  10: new Level(160, 260),
  20: new Level(140, 240),
  30: new Level(130, 230),
  50: new Level(120, 220),
  70: new Level(100, 200),
  100: new Level(80, 180),
};
