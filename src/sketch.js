// global variables stores data in canvas
let fillColor = "black";
let eraserIcon;
let trashIcon;
let brushSize = 10;

const MIN_BRUSH = 2;
const MAX_BRUSH = 20;

const TEST_MODE = false;

// this runs first before anything else.
// it loads the image files so they are ready to use.
function preload() {
  eraserIcon = loadImage("../assets/eraser.svg");
  trashIcon = loadImage("../assets/trash.svg");
}

// this runs once when the app starts.
// it measures the screen size and creates the drawing area.
// it also calls drawinterface to draw the buttons for the first time.
function setup() {
  if (TEST_MODE) {
    console.clear();
    console.log("🧪 Running tests...");
    noCanvas();
    runTests();
    noLoop();
    return;
  }

  const CANVAS = document.getElementById("canvas");
  const width = CANVAS.offsetWidth;
  const height = CANVAS.offsetHeight;
  const cnv = createCanvas(width, height);
  cnv.parent("canvas");

  drawInterface();
}

// this function handles two things
// check if the button is clicked and draw lines on screen
function draw() {
  // this function is to create a border in the canvas
  canvasBorder();
  handleToolbar();
  handleDrawing();
}

function handleToolbar() {
  // this loop checks every button in our list
  for (let btn of buttonConfig) {
    // checks if the mouse is clicking inside this button
    if (isMouseInside(btn.x, btn.y, btn.w, btn.h)) {
      // if it is the trash button, wipe the screen and redraw buttons
      if (btn.label === "TRASH") {
        background("#fff");
        drawInterface();
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

// this draws the toolbar and all the buttons.
// we keep this separate so we can call it again after using the trash button.
function drawInterface() {
  // toolbar interface
  noStroke();
  fill(220);
  rect(0, 0, width, 90);

  textAlign(CENTER, CENTER);

  toolbarColors();
  toolbarSizeBtn();

  // Draw the current size number in the middle
  fill(0);
  noStroke();
  text(brushSize, 250, 67);

  colorPicker();
}

function colorPicker() {
  // color picker
  colorPicker = createColorPicker("#000");
  colorPicker.parent("canvas");
  colorPicker.position(10, 50);
  colorPicker.style("width", "80px");

  // listens for changes to the color picker
  colorPicker.input(() => {
    fillColor = colorPicker.value();
  });
}

function toolbarColors() {
  // loops through the list of buttons to draw each one
  for (let btn of buttonConfig) {
    fill(btn.color);
    rect(btn.x, btn.y, btn.w, btn.h);

    noStroke();
    // sets the text/icon color black for white buttons, white for others
    fill(btn.color === "white" ? "black" : "white");

    // if its an icon draw image to the button
    if (btn.type === "icon") {
      imageMode(CENTER);

      // pick the right image based on the label
      let iconToDraw;
      if (btn.label === "TRASH") {
        iconToDraw = trashIcon;
      } else {
        iconToDraw = eraserIcon;
      }

      // draws the image in the center of the button
      image(iconToDraw, btn.x + btn.w / 2, btn.y + btn.h / 2, 20, 20);

      imageMode(CORNER);
    } else {
      // otherwise draws the text label in the center of the button
      text(btn.label, btn.x + btn.w / 2, btn.y + btn.h / 2);
    }
  }
}

function toolbarSizeBtn() {
  // brush size buttons
  textAlign(CENTER, CENTER);

  // Loop through our new sizeButtons list
  for (let btn of sizeButtons) {
    noStroke();
    fill(255);
    rect(btn.x, btn.y, btn.w, btn.h); // Draw box

    fill(0);
    text(btn.label, btn.x + btn.w / 2, btn.y + btn.h / 2); // Draw label
  }
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
      drawInterface();
    }
  }
}

// draws a thin black outline around the entire app so you can see the edges.
function canvasBorder() {
  push();
  stroke(0);
  strokeWeight(1);
  noFill();
  rect(0, 0, width, height);
  pop();
}

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
