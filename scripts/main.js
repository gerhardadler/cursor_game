import { Vector2D } from "./vector.js";

const app = new PIXI.Application({ width: 640, height: 360 });
document.body.appendChild(app.view);

const text = new PIXI.Text("Mouse Position: (0, 0)", {
  fill: 0xffffff,
  fontSize: 24,
});
app.stage.addChild(text);

class Bullet {
  constructor(position, directionVector, speed) {
    this.sprite = PIXI.Sprite.from("images/ørjam.jpg");
    this.sprite.anchor.set(0.5);
    this.sprite.width = 10;
    this.sprite.height = 10;
    app.stage.addChild(this.sprite);

    this.position = position;
    this.directionVector = directionVector;
    this.speed = speed;
  }

  tick(delta) {
    this.position = this.position.add(
      this.directionVector.multiply(this.speed * delta)
    );
    this.sprite.x = this.position.x;
    this.sprite.y = this.position.y;
  }
}

class Mouse {
  position = new Vector2D(0, 0);
  #startPosition = new Vector2D(0, 0);
  #bullets = [];

  updateMousePosition(newMousePosition) {
    this.position = newMousePosition;
  }

  onClick() {
    this.#startPosition = this.position.copy();
  }

  onRelease() {
    const shootVector = this.#startPosition.subtract(this.position).normalize();
    const distance = this.#startPosition.distance(this.position);
    console.log(this.#startPosition);
    console.log(this.position);
    console.log(shootVector);
    this.#bullets.push(new Bullet(this.position, shootVector, distance / 20));
  }

  tick(delta) {
    for (const bullet of this.#bullets) {
      bullet.tick(delta);
    }
  }
}

const mouse = new Mouse();

app.view.addEventListener("mousemove", function (e) {
  mouse.position.x = e.clientX - app.view.getBoundingClientRect().left;
  mouse.position.y = e.clientY - app.view.getBoundingClientRect().top;
  text.text = `Mouse Position: (${mouse.position.x.toFixed(
    2
  )}, ${mouse.position.y.toFixed(2)})`;
});

app.view.addEventListener("mousedown", function (e) {
  console.log("click");
  mouse.onClick();
});
app.view.addEventListener("mouseup", function (e) {
  console.log("release");
  mouse.onRelease();
});

class Enemy {
  constructor(position, speed, enemies) {
    this.sprite = PIXI.Sprite.from("images/ørjam.jpg");
    this.sprite.anchor.set(0.5);
    this.sprite.width = 20;
    this.sprite.height = 20;
    app.stage.addChild(this.sprite);

    this.position = position;
    this.speed = speed;
    this.enemies = enemies;
    this.separationDistance = 40;
  }

  tick(delta) {
    const mouseVector = mouse.position.subtract(this.position).normalize();

    // Calculate separation vector from other enemies
    let separationVector = new Vector2D(0, 0); // Create a Vector class to represent vectors
    for (const enemy of this.enemies) {
      if (enemy !== this) {
        const distance = this.position.distance(enemy.position);
        if (distance < this.separationDistance) {
          // Calculate a separation force away from the nearby enemy
          const awayVector = this.position
            .subtract(enemy.position)
            .normalize()
            .multiply(this.separationDistance - distance);
          separationVector = separationVector.add(awayVector);
        }
      }
    }

    // Combine the mouse-following and separation vectors
    const combinedVector = mouseVector.add(separationVector).normalize();

    this.position = this.position.add(
      combinedVector.multiply(this.speed * delta)
    );

    this.sprite.x = this.position.x;
    this.sprite.y = this.position.y;
  }
}

class EnemySpawner {
  timePassed = 0;
  minSpawnDelay = 100;
  maxSpawnDelay = 300;
  spawnDelay = 300;

  constructor(enemies) {
    this.enemies = enemies;
  }

  tick(delta) {
    this.timePassed += delta;
    if (this.timePassed > this.spawnDelay) {
      this.enemies.push(new Enemy(new Vector2D(100, 20), 1, enemies));
      this.timePassed = 0;
      this.newSpawnDelay();
    }
  }

  newSpawnDelay() {
    this.spawnDelay =
      this.minSpawnDelay +
      Math.random() * (this.maxSpawnDelay - this.minSpawnDelay);
  }
}

const enemies = [];
const enemySpawner = new EnemySpawner(enemies);

let elapsed = 0.0;
app.ticker.add((delta) => {
  for (const enemy of enemies) {
    enemy.tick(delta);
  }
  mouse.tick(delta);
  enemySpawner.tick(delta);
});
