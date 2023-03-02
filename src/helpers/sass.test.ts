import {
  isCssFunction,
  isCssPropertyValue,
  isCssNumber,
  isCssUnit,
  isCssBoolean,
  SassValue,
} from "./sass";

describe("Sass - isCssFunction", () => {
  it("Var is a css function", () => {
    expect(isCssFunction(`var()`)).toBeTruthy();
  });
  it("Max is a css function", () => {
    expect(isCssFunction(`max()`)).toBeTruthy();
  });
  it("Min is a css function", () => {
    expect(isCssFunction(`min()`)).toBeTruthy();
  });
  it("Calc is a css function", () => {
    expect(isCssFunction(`calc(something)`)).toBeTruthy();
  });
  it("Env is a css function", () => {
    expect(isCssFunction(`env(something)`)).toBeTruthy();
  });
  it("Env is a css function", () => {
    expect(isCssFunction(`rem(something)`)).toBeFalsy();
  });
});

describe("Sass - isCssPropertyValue", () => {
  it("uppercase is a css property value", () => {
    expect(isCssPropertyValue(`uppercase`)).toBeTruthy();
  });
  it("lowercase is a css property value", () => {
    expect(isCssPropertyValue(`lowercase`)).toBeTruthy();
  });
  it("capitalize is a css property value", () => {
    expect(isCssPropertyValue(`capitalize`)).toBeTruthy();
  });
});

describe("Sass - isCssNumber", () => {
  it('"0" is a css number', () => {
    expect(isCssNumber("0")).toBeTruthy();
  });
  it("0 is a css number", () => {
    expect(isCssNumber(0)).toBeTruthy();
  });
  it("'0.5' is a css number", () => {
    expect(isCssNumber("0.5")).toBeTruthy();
  });
  it('"5" is a css number', () => {
    expect(isCssNumber("5")).toBeTruthy();
  });
  it("'a' is not a css number", () => {
    expect(isCssNumber("a")).toBeFalsy();
  });
});
describe("Sass - isCssUnit", () => {
  it('"0" is not a css number', () => {
    expect(isCssUnit("0")).toBeFalsy();
  });
  it("0 is not css number", () => {
    expect(isCssUnit(0)).toBeFalsy();
  });
  it("'0.5' is not a css number", () => {
    expect(isCssUnit("0.5")).toBeFalsy();
  });
  it('"5" is not a css number', () => {
    expect(isCssUnit("5")).toBeFalsy();
  });
  it("'a' is not a css number", () => {
    expect(isCssUnit("a")).toBeFalsy();
  });
  it("'Arem' is not a css number", () => {
    expect(isCssUnit("arem")).toBeFalsy();
  });
  it("'1rem' is not a css number", () => {
    expect(isCssUnit("1rem")).toBeTruthy();
  });
  it("'1%' is not a css number", () => {
    expect(isCssUnit("1%")).toBeTruthy();
  });
  it("'0%' is not a css number", () => {
    expect(isCssUnit("0%")).toBeTruthy();
  });
  it("'0deg' is not a css number", () => {
    expect(isCssUnit("0deg")).toBeTruthy();
  });
  it("'0.5rem' is not a css number", () => {
    expect(isCssUnit("0.5rem")).toBeTruthy();
  });
  it("'-0.5rem' is not a css number", () => {
    expect(isCssUnit("-0.5rem")).toBeTruthy();
  });
});

describe("Sass - isCssBoolean", () => {
  it('"true" is a css boolean', () => {
    expect(isCssBoolean("true")).toBeTruthy();
  });
  it('"false" is a css boolean', () => {
    expect(isCssBoolean("false")).toBeTruthy();
  });
  it('"falsy" is a css boolean', () => {
    expect(isCssBoolean("falsy")).toBeFalsy();
  });
});

describe("Sass - SassValue", () => {
  it('"true" to become a sass value', () => {
    expect(SassValue("true")).toBe("true");
  });
  it('"test" to become a sass value', () => {
    expect(SassValue("test")).toBe('"test"');
  });
  it('"0" to become a sass value', () => {
    expect(SassValue("0")).toBe("0");
  });
  it("0 to become a sass value", () => {
    expect(SassValue(0)).toBe("0");
  });
  it("true to become a sass value", () => {
    expect(SassValue(true)).toBe("true");
  });
  it("['test','of','array'] to become a sass value", () => {
    expect(SassValue(["test", "of", "array"])).toBe(`(test, of, array)`);
  });
  it("Converts an object to a color - hsla", () => {
    expect(SassValue({ h: 0, s: 0, l: 0 })).toBe("hsl(0deg, 0%, 0%)");
  });
});
