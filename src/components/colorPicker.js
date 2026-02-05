function selectColor() {
  // color picker
  colorPicker = createColorPicker("#000");
  colorPicker.parent("canvas");
  colorPicker.position(10, 50);
  colorPicker.style("width", "80px");

  colorPicker.input(() => {
    // check if brush exists before setting to avoid errors
    if (typeof myBrush !== "undefined") {
      myBrush.setColor(colorPicker.value());
    }
  });
}
