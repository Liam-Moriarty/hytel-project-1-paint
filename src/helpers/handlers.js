function handleToolbar() {
  // this loop checks every button in our list
  for (let btn of buttonConfig) {
    // checks if the mouse is clicking inside this button
    if (isMouseInside(btn.x, btn.y, btn.w, btn.h)) {
      // if it is the trash button, wipe the screen and redraw buttons
      if (btn.label === "TRASH") {
        background("#fff");
        toolbarInterface();
      } else {
        // otherwise, just change the paint color
        fillColor = btn.color;
      }
    }
  }
}

function handleDrawing() {
  // checks if the mouse is held down
  if (mouseIsPressed) {
    // checks if the mouse is below the toolbar
    if (mouseY > 100 && pmouseY > 100) {
      stroke(fillColor);
      strokeWeight(brushSize);
      strokeCap(ROUND);

      // draws a smooth line from where the mouse was to where it is now
      line(pmouseX, pmouseY, mouseX, mouseY);
    }
  }
}
