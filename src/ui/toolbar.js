// this draws the toolbar and all the buttons.
// we keep this separate so we can call it again after using the trash button.
function toolbarInterface() {
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
  if (typeof myBrush !== "undefined") {
    text(myBrush.size, 250, 67);
  } else {
    text(10, 250, 67); // Default fallback
  }

  // selectColor();
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

function selectColor() {
  // color picker
  colorPicker = createColorPicker("#000");
  colorPicker.parent("canvas");
  colorPicker.position(10, 50);
  colorPicker.style("width", "80px");

  // listens for changes to the color picker
  // colorPicker.input(() => {
  //   fillColor = colorPicker.value();
  // });

  colorPicker.input(() => {
    // Check if brush exists before setting to avoid errors
    if (typeof myBrush !== "undefined") {
      myBrush.setColor(colorPicker.value());
    }
  });
}
