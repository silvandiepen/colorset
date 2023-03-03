import { COLOR, HEX, hexToHsl, mix, toHSLA, toRGB } from "@sil/color";
import { shadeColors } from "./shadeColors";
import { ColorData, ColorType } from "./types";

const colors: ColorData = {
  primary: "#0000ff",
  secondary: "#ff0000",
  dark: "#111111",
  light: "#f0f0f0",
};

describe("Shades", () => {
  it("Should do the basics - hex to RGB mix", () => {
    const mixColor = toRGB("#000000");
    expect(mixColor).toEqual({ r: 0, g: 0, b: 0 });
  });
  it("Should do the basics - hex to RGB primary", () => {
    const baseColor = toRGB(colors.primary as COLOR);
    expect(baseColor).toEqual({ r: 0, g: 0, b: 255 });
  });
  it("Should do the basics - hex to RGB secondary", () => {
    const baseColor = toRGB(colors.secondary as COLOR);
    expect(baseColor).toEqual({ r: 255, g: 0, b: 0 });
  });
  it("Should do the basics - hex to RGB secondary", () => {
    const baseColor = colors.secondary;
    expect(baseColor).toEqual("#ff0000");
  });
  it("Should do the basics - mix red with black 50%", () => {
    const mixColor = toRGB("#000000");
    const baseColor = toRGB(colors.secondary as COLOR);
    const mixedColor = mix(mixColor, baseColor, 50);

    expect(mixColor).toEqual({ r: 0, g: 0, b: 0 });
    expect(baseColor).toEqual({ r: 255, g: 0, b: 0 });
    expect(mixedColor).toEqual({ r: 127, g: 0, b: 0 });
  });

  it("Should create shades", async () => {
    const input = shadeColors({
      data: {
        primary: colors.primary,
        secondary: colors.secondary,
      },
      shades: [25, 50, 75],
      mix: ["#000000", "#ffffff"],
    });

    const mixColor = toRGB("#000000");

    const expected = {
      "primary-25": toHSLA(mix(mixColor, toRGB(colors.primary as COLOR), 25)),
      "primary-50": toHSLA(mix(mixColor, toRGB(colors.primary as COLOR), 50)),
      "primary-75": toHSLA(mix(mixColor, toRGB(colors.primary as COLOR), 75)),
      "secondary-25": toHSLA(
        mix(mixColor, toRGB(colors.secondary as COLOR), 25)
      ),
      "secondary-50": toHSLA(
        mix(mixColor, toRGB(colors.secondary as COLOR), 50)
      ),
      "secondary-75": toHSLA(
        mix(mixColor, toRGB(colors.secondary as COLOR), 75)
      ),
    };

    expect(input).toEqual(expected);
  });
});

describe("Shades", () => {
  it("Should create shapes", async () => {
    const input = shadeColors({
      data: colors,
      shades: [10, 30, 60],
      mix: ["#111111", "#ffffff"],
    });
    expect(input).toEqual({
      "dark-10": {
        h: 0,
        s: 0,
        l: 91,
        a: 1,
      },
      "dark-30": {
        h: 0,
        s: 0,
        l: 72,
        a: 1,
      },
      "dark-60": {
        h: 0,
        l: 44,
        s: 0,
        a: 1,
      },
      "light-10": {
        h: 0,
        l: 15,
        s: 0,
        a: 1,
      },
      "light-30": {
        h: 0,
        l: 33,
        s: 0,
        a: 1,
      },
      "light-60": {
        h: 0,
        l: 59,
        s: 0,
        a: 1,
      },
      "primary-10": {
        h: 240,
        l: 11,
        s: 6,
        a: 1,
      },
      "primary-30": {
        h: 240,
        l: 20,
        s: 19,
        a: 1,
      },
      "primary-60": {
        h: 240,
        l: 33,
        s: 45,
        a: 1,
      },
      "secondary-10": {
        h: 0,
        l: 11,
        s: 6,
        a: 1,
      },
      "secondary-30": {
        h: 0,
        l: 20,
        s: 19,
        a: 1,
      },
      "secondary-60": {
        h: 0,
        l: 33,
        s: 45,
        a: 1,
      },
    });
  });

  it("Should create shapes - Automatically use dark and light", () => {
    const input = shadeColors({
      data: colors,
      shades: [50],
    });

    expect(input).toEqual({
      "dark-50": {
        h: 0,
        l: 4,
        s: 0,
        a: 1,
      },
      "light-50": {
        h: 0,
        l: 47,
        s: 0,
        a: 1,
      },
      "primary-50": {
        h: 240,
        l: 25,
        s: 33,
        a: 1,
      },
      "secondary-50": {
        h: 0,
        l: 25,
        s: 33,
        a: 1,
      },
    });
  });

  it("Dark and light mode shouldn't be the same", async () => {
    const inputDarkmode = shadeColors({
      data: colors,
      shades: [10, 30, 60],
      mix: [hexToHsl("#111111"), hexToHsl("#ffffff")],
      type: ColorType.HSLA,
    });
    const inputLightmode = shadeColors({
      data: colors,
      shades: [10, 30, 60],
      mix: [hexToHsl("#ffffff"), hexToHsl("#111111")],
      type: ColorType.HSLA,
    });
    expect(inputDarkmode).not.toEqual(inputLightmode);
  });
});
