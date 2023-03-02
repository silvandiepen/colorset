import { shadeColors } from "./shadeColors";
import { ColorData } from "./types";

const colors: ColorData = {
  primary: "#000fff",
  secondary: "fff000",
  dark: "#111111",
  light: "#f0f0f0",
};

describe("Shades", () => {
  it("Should create shapes", async () => {
    const input = await shadeColors({
      data: colors,
      shades: [10, 30, 60],
      mix: ["#111111", "#ffffff"],
    });
    expect(input).toEqual({
      "dark-10": {
        h: 0,
        l: 16,
        s: 0,
        a: 1
      },
      "dark-30": {
        h: 0,
        l: 35,
        s: 0,
        a: 1
      },
      "dark-60": {
        h: 0,
        l: 63,
        s: 0,
        a: 1
      },
      "light-10": {
        h: 0,
        l: 85,
        s: 0,
        a: 1
      },
      "light-30": {
        h: 0,
        l: 68,
        s: 0,
        a: 1
      },
      "light-60": {
        h: 0,
        l: 42,
        s: 0,
        a: 1
      },
      "primary-10": {
        h: 236,
        l: 46,
        s: 83,
        a: 1
      },
      "primary-30": {
        h: 236,
        l: 37,
        s: 56,
        a: 1
      },
      "primary-60": {
        h: 236,
        l: 24,
        s: 26,
        a: 1
      },
      "secondary-10": {
        h: 0,
        l: 1,
        s: 0,
        a: 1
      },
      "secondary-30": {
        h: 0,
        l: 2,
        s: 0,
        a: 1
      },
      "secondary-60": {
        h: 0,
        l: 4,
        s: 0,
        a: 1
      },
    });
  });

  it("Should create shapes - Automatically use dark and light",  () => {
    const input =  shadeColors({
      data: colors,
      shades: [50],
    });

    expect(input).toEqual({
      "dark-50": {
        h: 0,
        l: 51,
        s: 0,
        a: 1
      },
      "light-50": {
        h: 0,
        l: 51,
        s: 0,
        a: 1
      },
      "primary-50": {
        h: 236,
        l: 29,
        s: 35,
        a: 1
      },
      "secondary-50": {
        h: 0,
        l: 4,
        s: 0,
        a: 1
      },
    });
  });
});
