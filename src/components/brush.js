class Brush {
  constructor(startSize = 10, startColor = "black") {
    this.size = startSize;
    this.color = startColor;
    this._savedColor = startColor;

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

  // returns white to act as eraser
  activateEraser() {
    this.isEraserMode = true;
    this.color = "white";
    return this.color;
  }

  // for drawing

  render() {
    // only draw if mouse is pressed
    if (mouseIsPressed && mouseY > 105) {
      stroke(this.color);
      strokeWeight(this.size);
      strokeCap(ROUND);

      // draw line from previous mouse position to current
      line(pmouseX, pmouseY, mouseX, mouseY);
    }
  }
}
class SprayBrush extends Brush {
  constructor(startSize = 20, startColor = "black") {
    super(startSize, startColor);

    this.density = 50;
  }

  render() {
    // only paint if mouse is pressed
    if (mouseIsPressed && mouseY > 90) {
      stroke(this.color);
      strokeWeight(1); // Spray dots are always small

      const count = this.density || 50;

      for (let i = 0; i < count; i++) {
        const offsetX = random(-this.size, this.size);
        const offsetY = random(-this.size, this.size);

        // only draw if inside the circle
        if (offsetX * offsetX + offsetY * offsetY < this.size * this.size) {
          point(mouseX + offsetX, mouseY + offsetY);
        }
      }
    }
  }
}
