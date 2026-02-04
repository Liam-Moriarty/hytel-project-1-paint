// a helper tool that does the math to see if the mouse is inside a box.
// it returns true if the mouse is pressed and inside the coordinates.
function isMouseInside(x, y, w, h) {
  return (
    mouseIsPressed &&
    mouseX > x &&
    mouseX < x + w &&
    mouseY > y &&
    mouseY < y + h
  );
}
