export class Level {
  constructor(level, minEnemySpawnDelay, maxEnemySpawnDelay, enemySpeed) {
    this.level = level;
    this.minEnemySpawnDelay = minEnemySpawnDelay;
    this.maxEnemySpawnDelay = maxEnemySpawnDelay;
    this.enemySpeed = enemySpeed;
  }

  static fromKills(kills) {
    let level;
    for (const levelKills in levels) {
      if (kills >= levelKills) {
        level = levels[levelKills];
      } else {
        break;
      }
    }
    return level;
  }
}

const levels = {
  0: new Level(1, 1000, 1500, 0.2),
  10: new Level(2, 800, 1300, 0.2),
  20: new Level(3, 700, 1200, 0.2),
  30: new Level(4, 600, 1100, 0.25),
  50: new Level(5, 500, 1000, 0.25),
  70: new Level(6, 400, 900, 0.25),
  100: new Level(7, 300, 800, 0.3),
  130: new Level(8, 200, 700, 0.3),
  160: new Level(9, 200, 600, 0.3),
  200: new Level(10, 200, 500, 0.35),
  250: new Level(11, 200, 400, 0.35),
  300: new Level(12, 150, 400, 0.35),
  400: new Level(13, 150, 350, 0.4),
  500: new Level(14, 150, 300, 0.4),
  700: new Level(15, 150, 250, 0.4),
};
