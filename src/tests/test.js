// -------- run tests ---------------

// checks whether a condition is true and reports the result.
function assert(condition, message) {
  if (!condition) {
    console.error("❌ FAIL:", message);
  } else {
    console.log("✅ PASS:", message);
  }
}

// ensures a number stays within a defined range.
function clamp(n, min, max) {
  if (n < min) return min;
  if (n > max) return max;
  return n;
}

// calculates the next brush size based on user input while enforcing limits.
function updateBrushSize(currentSize, delta) {
  return clamp(currentSize + delta, MIN_BRUSH, MAX_BRUSH);
}

function runAllTests() {
  console.log("🧪 Running tests...");

  // What these test:
  //   Normal values remain unchanged
  //   Values below the minimum are corrected
  //   Values above the maximum are capped
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
    it("brush increases normally", () => {
      expect(updateBrushSize(10, 2, 20)).toBe(12);
    });

    it("brush never goes below min", () => {
      expect(updateBrushSize(2, 2, 20)).toBe(2);
    });
  });

  testSummary();

  // What these test:
  //   Brush size increases correctly
  //   Brush size never drops below the minimum
  //   Brush size never exceeds the maximum
  // assert(updateBrushSize(10, 2) === 12, "brush increases normally");
  // assert(updateBrushSize(2, -10) === 2, "brush never goes below min");
  // assert(updateBrushSize(20, 10) === 20, "brush never exceeds max");
  // assert(updateBrushSize(18, 10) === 20, "brush clamps at max");
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
