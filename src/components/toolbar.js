class Toolbar {
  constructor(btnConfig, sizeConfig) {
    this.buttons = btnConfig;
    this.sizeButtons = sizeConfig;

    this.height = 90;
    this.bgColor = 220;

    // initialize as null to prevent crashes
    this.targetBrush = null;
  }

  setBrush(brushInstance) {
    this.targetBrush = brushInstance;
  }

  render(connectedBrush) {
    // protected area
    noStroke();
    fill(this.bgColor);
    rect(0, 0, width, this.height);

    this._drawColorButtons();
    this._drawSizeButtons();
    this._drawSizeLabel(connectedBrush);
  }

  _drawColorButtons() {
    textAlign(CENTER, CENTER);

    for (let btn of this.buttons) {
      fill(btn.color);
      rect(btn.x, btn.y, btn.w, btn.h);

      noStroke();
      fill(btn.color === "white" ? "black" : "white");

      if (btn.type === "icon") {
        this._drawIcon(btn);
      } else {
        text(btn.label, btn.x + btn.w / 2, btn.y + btn.h / 2);
      }
    }
  }

  _drawIcon(btn) {
    imageMode(CENTER);
    let icon = btn.label === "TRASH" ? trashIcon : eraserIcon;
    image(icon, btn.x + btn.w / 2, btn.y + btn.h / 2, 20, 20);
    imageMode(CORNER);
  }

  _drawSizeButtons() {
    textAlign(CENTER, CENTER);
    for (let btn of this.sizeButtons) {
      noStroke();
      fill("white");
      rect(btn.x, btn.y, btn.w, btn.h);

      fill("black");
      text(btn.label, btn.x + btn.w / 2, btn.y + btn.h / 2);
    }
  }

  _drawSizeLabel(brush) {
    fill(0);
    noStroke();
    // check if brush exists, otherwise show default
    const size = brush ? brush.size : 10;
    text(size, 250, 67);
  }

  handleClicks(mx, my, targetBrush) {
    for (let btn of this.buttons) {
      if (isMouseInside(btn.x, btn.y, btn.w, btn.h)) {
        if (btn.label === "TRASH") {
          background("white");
          return;
        }
        if (btn.label === "ERASER") {
          targetBrush.activateEraser();
          return;
        }

        if (btn.label === "LINE") {
          switchBrush(lineBrush);
          return true;
        }

        if (btn.label === "SPRAY") {
          switchBrush(sprayBrush);
          return true;
        }

        // default color
        targetBrush.setColor(
          btn.color === "black" && btn.label === "RESET COLOR"
            ? "black"
            : btn.color,
        );
        return;
      }
    }

    // 2. Check Size Buttons
    for (let btn of this.sizeButtons) {
      if (isMouseInside(btn.x, btn.y, btn.w, btn.h)) {
        targetBrush.changeSize(btn.delta);
        return;
      }
    }
  }
}
