// draws a thin black outline around the entire app so you can see the edges.
function canvasBorder() {
  push();
  stroke(0);
  strokeWeight(1);
  noFill();
  rect(0, 0, width, height);
  pop();
}
