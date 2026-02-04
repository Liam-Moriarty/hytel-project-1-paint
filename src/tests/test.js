// -------- run tests ---------------

function runAllTests() {
  console.log("🧪 Running tests...");

  testDescribe("clamp()", () => {
    it("keeps value in range", () => {
      expect(clamp(10, 2, 20)).toBe(10);
    });

    it("bumps value up to min", () => {
      expect(clamp(1, 2, 20)).toBe(2);
    });

    it("brings value down to max", () => {
      expect(clamp(1000, 2, 20)).toBe(20);
    });
  });

  testDescribe("updateBrushSize()", () => {
    globalThis.MIN_BRUSH = 2;
    globalThis.MAX_BRUSH = 20;

    it("increases size correctly", () => {
      // start at 10, add 5 -> expect 15
      expect(updateBrushSize(8, 2)).toBe(10);
    });

    it("decreases size correctly", () => {
      expect(updateBrushSize(12, -2)).toBe(10);
    });

    it("stops at MAX_BRUSH", () => {
      expect(updateBrushSize(10, 50)).toBe(20);
    });

    it("stops at MIN_BRUSH", () => {
      expect(updateBrushSize(1, -2)).toBe(2);
    });
  });

  // test if the mouse is inside or outside the canvas
  testDescribe("isMouseInside helper", () => {
    it("returns TRUE when mouse is inside the box and pressed", () => {
      // manually fake mouse location this variables is built in p5.js
      mouseX = 50;
      mouseY = 50;
      mouseIsPressed = true;

      // check a box at 0,0 with width 900, height 700
      // The mouse (50,50) is definitely inside this box.
      const result = isMouseInside(0, 0, 900, 700);

      // assert
      expect(result).toBe(true);
    });

    it("returns FALSE when mouse is outside the box", () => {
      mouseX = 1000;
      mouseY = 1000;
      mouseIsPressed = true;

      // execute
      const result = isMouseInside(0, 0, 900, 700);

      // assert
      expect(result).toBe(false);
    });

    it("returns FALSE when mouse is not pressed", () => {
      // correct position, but click is released
      mouseX = 50;
      mouseY = 50;
      mouseIsPressed = false;

      // execute
      const result = isMouseInside(0, 0, 900, 700);

      // assert
      expect(result).toBe(false);
    });
  });

  // test clicking buttons if its successfully changes the color
  testDescribe("handleToolbar logic", () => {
    it("updates fillColor when a color button is clicked", () => {
      // --- 1. SETUP (The Mocking Phase) ---

      // Fake the 'buttonConfig' global array with one dummy button
      // We place it at x=0, y=0 with size 10x10
      globalThis.buttonConfig = [
        { x: 10, y: 10, w: 80, h: 30, label: "RED", color: "red" },
      ];

      // Fake the P5 mouse variables to be INSIDE that button
      globalThis.mouseX = 15;
      globalThis.mouseY = 15;
      globalThis.mouseIsPressed = true;

      // Fake the helper function 'isMouseInside' if it's not loaded
      // (Or assume it's loaded from your previous file)
      // For this test, we can just ensure the loop inside handleToolbar works.

      // Reset fillColor to verify it changes
      globalThis.fillColor = "black";

      // --- 2. EXECUTE ---
      handleToolbar();

      // --- 3. ASSERT ---
      // Did the global variable change to match the button's color?
      expect(fillColor).toBe("red");
    });
  });
  testSummary();
}

// Mini test runner (describe / it / expect)

let __t = {
  suiteStack: [],
  total: 0,
  passed: 0,
  failed: 0,
};

function testDescribe(name, fn) {
  __t.suiteStack.push(name);
  try {
    fn();
  } finally {
    __t.suiteStack.pop();
  }
}

function it(name, fn) {
  const suite = __t.suiteStack.join(" > ");
  const fullName = suite ? `${suite} > ${name}` : name;
  __t.total++;

  try {
    fn();
    __t.passed++;
    console.log(`✅ ${fullName}`);
  } catch (err) {
    __t.failed++;
    console.error(`❌ ${fullName}\n   ${err.message}`);
  }
}

function expect(actual) {
  return {
    toBe(expected) {
      if (actual !== expected)
        throw new Error(`Expected ${expected} but got ${actual}`);
    },
    toEqual(expected) {
      // NOTE: JSON stringify is "good enough" for simple data structures.
      const a = JSON.stringify(actual);
      const e = JSON.stringify(expected);
      if (a !== e) throw new Error(`Expected ${e} but got ${a}`);
    },
  };
}

function testSummary() {
  console.log(
    `\n🧪 Tests: ${__t.total} | ✅ ${__t.passed} | ❌ ${__t.failed}\n`,
  );
}
