export function isColliding(sprite1, sprite2) {
  const rect1 = sprite1.getBounds();
  const rect2 = sprite2.getBounds();

  return (
    rect1.x + rect1.width > rect2.x &&
    rect1.x < rect2.x + rect2.width &&
    rect1.y + rect1.height > rect2.y &&
    rect1.y < rect2.y + rect2.height
  );
}
