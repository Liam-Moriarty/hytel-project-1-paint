// Saves the current canvas pixels to the browser's memory
function saveCanvasState() {
  const canvasElement = document.getElementById("defaultCanvas0");

  if (canvasElement) {
    // convert the pixels to a specialized text string base64
    const dataURL = canvasElement.toDataURL();

    localStorage.setItem("mySavedPainting", dataURL);
  }
}

// loads the snapshot from memory and paints it on the screen
function restoreCanvasState() {
  // check if we have a save file
  const savedData = localStorage.getItem("mySavedPainting");

  if (savedData) {
    // load the image string
    loadImage(savedData, (img) => {
      image(img, 0, 0, width, height);
    });
  }
}
