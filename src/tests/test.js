// -------- run tests ---------------

function runAllTests() {
  console.log("Running tests...");

  setTimeout(() => {
    console.log("TESTING INITIAL STATES...");
    testDescribe("Initial States", () => {
      it("checks the initial states", () => {
        const b = new brush(10);
        expect(b.size).toBe(10);
        expect(b.color).toBe("black");
        expect(b.MIN_SIZE).toBe(2);
      });
    });
  }, 2000);

  setTimeout(() => {
    console.log("TESTING SIZES FEATURES...");
    testDescribe("Sizing Features", () => {
      it("increases size correctly", () => {
        const b = new brush(10); // Start at 10

        // 10 + 5 = 15
        const result = b.changeSize(5);

        expect(result).toBe(15); // Check return value
        expect(b.size).toBe(15); // Check internal state
      });

      it("decreases size correctly", () => {
        const b = new brush(10);
        b.changeSize(-3); // 10 - 3 = 7
        expect(b.size).toBe(7);
      });

      it("stops size at MAX_SIZE (20)", () => {
        const b = new brush(18);
        b.changeSize(100);
        expect(b.size).toBe(20);
      });

      it("stops size at MIN_SIZE (2)", () => {
        const b = new brush(4);
        b.changeSize(-10);
        expect(b.size).toBe(2);
      });
    });
  }, 4000);

  setTimeout(() => {
    console.log("TESTING COLOR CHANGE FEATURE...");
    testDescribe("Color Feature", () => {
      it("changes color and updates state", () => {
        const b = new brush();
        b.setColor("blue");
        expect(b.color).toBe("blue");
      });
    });
  }, 6000);

  setTimeout(() => {
    console.log("TESTING ERASER FEATURES...");
    testDescribe("Eraser Features", () => {
      it("activates eraser mode correctly", () => {
        const b = new brush(10, "red");

        // Turn on Eraser
        b.activateEraser();

        expect(b.color).toBe("white");
        expect(b.isEraserMode).toBe(true);
      });

      it("disables eraser mode when a new color is picked", () => {
        const b = new brush();

        // 1. Turn on Eraser
        b.activateEraser();
        expect(b.isEraserMode).toBe(true);

        // 2. Pick a color
        b.setColor("green");

        // 3. Verify Eraser is OFF and color is GREEN
        expect(b.isEraserMode).toBe(false);
        expect(b.color).toBe("green");
      });

      it("remembers the saved color correctly", () => {
        const b = new brush(10, "purple");
        expect(b._savedColor).toBe("purple");

        b.setColor("orange");
        expect(b._savedColor).toBe("orange");
      });
    });
  }, 8000);

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
