let myBrush; // The Object Instance
let bgButton; // Example of a trash button area

class brush {
  constructor(startSize = 10, startColor = "black") {
    this.size = startSize;
    this.color = startColor;

    // remember the last color so we can switch back from eraser
    this._savedColor = startColor;

    // constants brush min and max sizes
    this.MIN_SIZE = 2;
    this.MAX_SIZE = 20;
  }

  changeSize(delta) {
    const newSize = this.size + delta;

    if (newSize < this.MIN_SIZE) this.size = this.MIN_SIZE;
    else if (newSize > this.MAX_SIZE) this.size = this.MAX_SIZE;
    else this.size = newSize;

    return newSize;
  }

  setColor(newColor) {
    this.isEraserMode = false; // turn off eraser if picking a color
    this.color = newColor;
    this._savedColor = newColor; // remember this preference
    return this.color;
  }

  // returns white to confirm it worked
  activateEraser() {
    this.isEraserMode = true;
    this.color = "white";
    return this.color;
  }

  // returns true to signal a reset is needed reset/trash logic
  shouldReset() {
    return true;
  }

  // --- VISUAL METHODS  ---

  render() {
    // Only draw if mouse is pressed
    if (mouseIsPressed && mouseY > 105) {
      stroke(this.color);
      strokeWeight(this.size);
      strokeCap(ROUND);
      // Draw line from previous mouse pos to current
      line(pmouseX, pmouseY, mouseX, mouseY);
    }
  }
}

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
  createCanvas(CANVAS.offsetWidth, CANVAS.offsetHeight).parent("canvas");

  // Initialize the Object
  myBrush = new brush(10, "black");

  toolbarInterface();
  selectColor();
}

// this function handles two things
// check if the button is clicked and draw lines on screen
function draw() {
  // this function is to create a border in the canvas
  canvasBorder();

  // to draw the toolbar and draw the lines
  // handleToolbar();
  // handleDrawing();

  // The object handles the drawing logic now!
  myBrush.render();
}

function mousePressed() {
  // Check the Size Buttons
  // for (let btn of sizeButtons) {
  //   if (
  //     mouseX > btn.x &&
  //     mouseX < btn.x + btn.w &&
  //     mouseY > btn.y &&
  //     mouseY < btn.y + btn.h
  //   ) {
  //     brushSize = updateBrushSize(brushSize, btn.delta);
  //     toolbarInterface();
  //   }
  // }

  // trash button
  if (isMouseInside(100, 50, 40, 30)) {
    background("white");
    toolbarInterface();
    return;
  }

  // eraser button
  if (isMouseInside(150, 50, 40, 30)) {
    myBrush.activateEraser();
    return;
  }

  // --- HANDLE SIZES ---

  // minus button
  if (isMouseInside(200, 50, 30, 30)) {
    myBrush.changeSize(-2);
    toolbarInterface();
  }

  // plus button
  if (isMouseInside(270, 50, 30, 30)) {
    myBrush.changeSize(2);
    toolbarInterface();
  }

  // --- HANDLE COLORS ---
  if (isMouseInside(10, 10, 80, 30)) {
    myBrush.setColor("red");
  }

  if (isMouseInside(100, 10, 80, 30)) {
    myBrush.setColor("green");
  }

  if (isMouseInside(190, 10, 80, 30)) {
    myBrush.setColor("blue");
  }

  if (isMouseInside(280, 10, 130, 30)) {
    myBrush.setColor("black");
  }
}
