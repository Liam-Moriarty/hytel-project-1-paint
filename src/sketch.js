// this runs first before anything else.
// it loads the image files so they are ready to use.
function preload() {
  eraserIcon = loadImage("./assets/eraser.svg");
  trashIcon = loadImage("./assets/trash.svg");
}

// this runs once when the app starts.
// it measures the screen size and creates the drawing area.
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
  const width = CANVAS.offsetWidth;
  const height = CANVAS.offsetHeight;
  const cnv = createCanvas(width, height);
  cnv.parent("canvas");

  toolbarInterface();
}

// this function handles two things
// check if the button is clicked and draw lines on screen
function draw() {
  // this function is to create a border in the canvas
  canvasBorder();
  handleToolbar();
  handleDrawing();
}

function mouseClicked() {
  // Check the Size Buttons
  for (let btn of sizeButtons) {
    // If we clicked a size button...
    if (
      mouseX > btn.x &&
      mouseX < btn.x + btn.w &&
      mouseY > btn.y &&
      mouseY < btn.y + btn.h
    ) {
      brushSize = updateBrushSize(brushSize, btn.delta);

      // Update the screen
      toolbarInterface();
    }
  }
}
