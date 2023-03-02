import { ColorType } from "@sil/color";
import { splitColors } from "./splitColors";

describe("Split Colors", () => {
  it("Should split the colors into all fractions", () => {
    const input = splitColors({
      data: {
        primary: {
          h: 10,
          s: 20,
          l: 30,
          a: 1
        },
        "primary-50": {
          h: 10,
          s: 20,
          l: 30,
          a: 1
        },
      },
      type: ColorType.HSLA,
    });
    expect(input).toEqual({
      "primary-h": "10deg",
      "primary-s": "20%",
      "primary-l": "30%",
      "primary-a": 1,
      "primary-50-h": "10deg",
      "primary-50-s": "20%",
      "primary-50-l": "30%",
      "primary-50-a": 1,
    });
  });

  it("Should split the colors into all fractions - converted to RGB",  () => {
    const input = splitColors({
      data: {
        primary: {
          h: 10,
          s: 20,
          l: 30,
          a: 1
        },
        "primary-50": {
          h: 10,
          s: 20,
          l: 30,
          a: 1
        },
      },
      type: ColorType.RGBA,
    });
    expect(input).toEqual({
      "primary-r": 92,
      "primary-g": 66,
      "primary-b": 61,
      "primary-a": 1,
      "primary-50-r": 92,
      "primary-50-g": 66,
      "primary-50-b": 61,
      "primary-50-a": 1,
    });
  });
  it("Should split the colors into all fractions - converted to HEX",  () => {
    const input = splitColors({
      data: {
        primary: {
          h: 10,
          s: 20,
          l: 30,
          a: 1
        },
        "primary-50": {
          h: 10,
          s: 20,
          l: 30,
          a: 1
        },
      },
      type: ColorType.HEX,
    });
    expect(input).toEqual({});
  });
});
