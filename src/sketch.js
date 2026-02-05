// it loads the image files so they are ready to use.
function preload() {
  eraserIcon = loadImage("./assets/eraser.svg");
  trashIcon = loadImage("./assets/trash.svg");
}

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

  // initialize the Objects
  lineBrush = new Brush(10, "black");
  sprayBrush = new SprayBrush(20, "red"); // Starts bigger
  activeBrush = lineBrush;

  myToolbar = new Toolbar(buttonConfig, sizeButtons);

  myToolbar.setBrush(activeBrush);

  selectColor();

  restoreCanvasState();
}

function draw() {
  // if brush isn't ready or in test mode, stop drawing.
  if (!activeBrush) return;

  // The object handles the drawing logic
  activeBrush.render();

  myToolbar.render(activeBrush);

  canvasBorder();
}

function mousePressed() {
  // the toolbar handles all button logic
  myToolbar.handleClicks(mouseX, mouseY, activeBrush);
}

function mouseReleased() {
  // only save if we clicked inside the canvas area
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    saveCanvasState();
  }
}
