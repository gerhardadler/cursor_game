export class Vector2D {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  magnitude() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  normalize() {
    const mag = this.magnitude();
    if (mag === 0) {
      return new Vector2D(0, 0);
    }
    return new Vector2D(this.x / mag, this.y / mag);
  }

  add(other) {
    return new Vector2D(this.x + other.x, this.y + other.y);
  }

  subtract(other) {
    return new Vector2D(this.x - other.x, this.y - other.y);
  }

  multiply(scalar) {
    return new Vector2D(this.x * scalar, this.y * scalar);
  }

  divide(scalar) {
    if (scalar === 0) {
      throw new Error("Cannot divide by zero");
    }
    return new Vector2D(this.x / scalar, this.y / scalar);
  }

  abs() {
    return new Vector2D(Math.abs(this.x), Math.abs(this.y));
  }

  radian() {
    return Math.atan2(this.y, this.x);
  }

  rotate(angle) {
    const x = this.x * Math.cos(angle) - this.y * Math.sin(angle);
    const y = this.x * Math.sin(angle) + this.y * Math.cos(angle);
    return new Vector2D(x, y);
  }

  distance(other) {
    return Math.sqrt((other.x - this.x) ** 2 + (other.y - this.y) ** 2);
  }

  copy() {
    return new Vector2D(this.x, this.y);
  }

  clamp(minVector, maxVector) {
    const clampedX = Math.min(Math.max(this.x, minVector.x), maxVector.x);
    const clampedY = Math.min(Math.max(this.y, minVector.y), maxVector.y);
    return new Vector2D(clampedX, clampedY);
  }

  lerp(target, t) {
    if (t < 0) t = 0;
    if (t > 1) t = 1;

    const lerpedX = this.x + (target.x - this.x) * t;
    const lerpedY = this.y + (target.y - this.y) * t;

    return new Vector2D(lerpedX, lerpedY);
  }

  static vectorFromRadian(radian) {
    return new Vector2D(Math.cos(radian), Math.sin(radian));
  }
}
