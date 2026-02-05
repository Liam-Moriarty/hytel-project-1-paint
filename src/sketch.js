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

  // Initialize the Objects
  myBrush = new Brush(10, "black");
  myToolbar = new Toolbar(buttonConfig, sizeButtons);

  myToolbar.render(myBrush);
  selectColor();
}

function draw() {
  // if brush isn't ready or in test mode, stop drawing.
  if (!myBrush) return;

  // The object handles the drawing logic
  myBrush.render();

  myToolbar.render(myBrush);

  canvasBorder();
}

function mousePressed() {
  // The toolbar handles all button logic
  myToolbar.handleClicks(myBrush);
}
