// this runs first before anything else.
// it loads the image files so they are ready to use.
function preload() {
  eraserIcon = loadImage("./assets/eraser.svg");
  trashIcon = loadImage("./assets/trash.svg");
}

// this runs once when the app starts.
// it also calls toolbarInterface to draw the buttons for the first time.
function setup() {
  if (TEST_MODE) {
    console.clear();
    noCanvas();
    runAllTests();
    noLoop();
    return;
  }

  const CANVAS = document.getElementById("canvas");
  createCanvas(CANVAS.offsetWidth, CANVAS.offsetHeight).parent("canvas");

  // Initialize the Object
  myBrush = new brush(10, "black");

  toolbarInterface();
  selectColor();
}

function draw() {
  // if brush isn't ready or in test mode, stop drawing.
  if (!myBrush) return;

  // this function is to create a border in the canvas
  canvasBorder();

  // The object handles the drawing logic
  myBrush.render();
}

function mousePressed() {
  // handle general colors
  for (let btn of buttonConfig) {
    if (isMouseInside(btn.x, btn.y, btn.w, btn.h)) {
      if (btn.label === "TRASH") {
        background("white");
        toolbarInterface();
        return;
      }

      if (btn.label === "ERASER") {
        myBrush.activateEraser();
        return;
      }

      // if it's not trash/eraser, it must be a color button
      if (btn.label === "RESET COLOR") {
        myBrush.setColor("black");
      } else {
        myBrush.setColor(btn.color);
      }

      return;
    }
  }

  // handle size button
  for (let btn of sizeButtons) {
    if (isMouseInside(btn.x, btn.y, btn.w, btn.h)) {
      myBrush.changeSize(btn.delta);
      toolbarInterface();
      return;
    }
  }
}
