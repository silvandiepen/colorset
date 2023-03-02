import { ColorType, toHSLA } from "@sil/color";
import { createColorSet } from "./createColorSet";

describe("Create Color Set", () => {
  const baseColors = {
    dark: "#111111",
    light: "#fafafa",
    primary: "#ff0000",
    secondary: "#00ff00",
    tertiary: "#3a5a6a",
  };

  const shades = [50];

  const expectedDefault = {
    dark: toHSLA(baseColors.dark),
    "dark-text": toHSLA(baseColors.light),
    "dark-50": {
      h: 0,
      s: 0,
      l: 53,
      a: 1,
    },
    "dark-50-text": toHSLA(baseColors.dark),
    "dark-h": toHSLA(baseColors.dark).h,
    "dark-s": toHSLA(baseColors.dark).s,
    "dark-l": toHSLA(baseColors.dark).l,
    "dark-a": toHSLA(baseColors.dark).a,
    background: toHSLA(baseColors.dark),
    "background-text": toHSLA(baseColors.light),
    "background-50": {
      h: 0,
      s: 0,
      l: 53,
      a: 1,
    },
    "background-50-text": toHSLA(baseColors.dark),
    "background-h": toHSLA(baseColors.dark).h,
    "background-s": toHSLA(baseColors.dark).s,
    "background-l": toHSLA(baseColors.dark).l,
    "background-a": toHSLA(baseColors.dark).a,

    light: toHSLA(baseColors.light),
    "light-text": toHSLA(baseColors.dark),
    "light-50": {
      h: 0,
      s: 0,
      l: 53,
      a: 1,
    },
    "light-50-text": toHSLA(baseColors.dark),
    "light-h": toHSLA(baseColors.light).h,
    "light-s": toHSLA(baseColors.light).s,
    "light-l": toHSLA(baseColors.light).l,
    "light-a": toHSLA(baseColors.light).a,
    foreground: toHSLA(baseColors.light),
    "foreground-text": toHSLA(baseColors.dark),
    "foreground-50": {
      h: 0,
      s: 0,
      l: 53,
      a: 1,
    },
    "foreground-50-text": toHSLA(baseColors.dark),
    "foreground-h": toHSLA(baseColors.light).h,
    "foreground-s": toHSLA(baseColors.light).s,
    "foreground-l": toHSLA(baseColors.light).l,
    "foreground-a": toHSLA(baseColors.light).a,

    primary: toHSLA(baseColors.primary),
    "primary-text": toHSLA(baseColors.dark),
    "primary-50": {
      h: 0,
      s: 35,
      l: 29,
      a: 1,
    },
    "primary-50-text": toHSLA(baseColors.light),
    "primary-h": toHSLA(baseColors.primary).h,
    "primary-s": toHSLA(baseColors.primary).s,
    "primary-l": toHSLA(baseColors.primary).l,
    "primary-a": toHSLA(baseColors.primary).a,
    secondary: toHSLA(baseColors.secondary),
    "secondary-text": toHSLA(baseColors.dark),
    "secondary-h": toHSLA(baseColors.secondary).h,
    "secondary-s": toHSLA(baseColors.secondary).s,
    "secondary-l": toHSLA(baseColors.secondary).l,
    "secondary-a": toHSLA(baseColors.secondary).a,
    "secondary-50": {
      h: 120,
      s: 35,
      l: 29,
      a: 1,
    },
    "secondary-50-text": toHSLA(baseColors.light),
    tertiary: toHSLA(baseColors.tertiary),
    "tertiary-text": toHSLA(baseColors.light),
    "tertiary-50": {
      h: 195,
      s: 3,
      l: 20,
      a: 1,
    },
    "tertiary-50-text": toHSLA(baseColors.light),
    "tertiary-h": toHSLA(baseColors.tertiary).h,
    "tertiary-s": toHSLA(baseColors.tertiary).s,
    "tertiary-l": toHSLA(baseColors.tertiary).l,
    "tertiary-a": toHSLA(baseColors.tertiary).a,
  };

  const expectedFull = {
    ...expectedDefault,   
    "dark-50-h": 0,
    "dark-50-s": 0,
    "dark-50-l": 53,
    "dark-50-a": 1,
    "dark-text-h": toHSLA(baseColors.light).h,
    "dark-text-s": toHSLA(baseColors.light).s,
    "dark-text-l": toHSLA(baseColors.light).l,
    "dark-text-a": toHSLA(baseColors.light).a,
    "dark-50-text-h": toHSLA(baseColors.dark).h,
    "dark-50-text-s": toHSLA(baseColors.dark).s,
    "dark-50-text-l": toHSLA(baseColors.dark).l,
    "dark-50-text-a": toHSLA(baseColors.dark).a,
    "background-50-h": 0,
    "background-50-s": 0,
    "background-50-l": 53,
    "background-50-a": 1,
    "background-text-h": toHSLA(baseColors.light).h,
    "background-text-s": toHSLA(baseColors.light).s,
    "background-text-l": toHSLA(baseColors.light).l,
    "background-text-a": toHSLA(baseColors.light).a,
    "background-50-text-h": toHSLA(baseColors.dark).h,
    "background-50-text-s": toHSLA(baseColors.dark).s,
    "background-50-text-l": toHSLA(baseColors.dark).l,
    "background-50-text-a": toHSLA(baseColors.dark).a,
    "light-50-h": 0,
    "light-50-s": 0,
    "light-50-l": 53,
    "light-50-a": 1,
    "light-text-h": toHSLA(baseColors.dark).h,
    "light-text-s": toHSLA(baseColors.dark).s,
    "light-text-l": toHSLA(baseColors.dark).l,
    "light-text-a": toHSLA(baseColors.dark).a,
    "light-50-text-h": toHSLA(baseColors.dark).h,
    "light-50-text-s": toHSLA(baseColors.dark).s,
    "light-50-text-l": toHSLA(baseColors.dark).l,
    "light-50-text-a": toHSLA(baseColors.dark).a,    
    "foreground-50-h": 0,
    "foreground-50-s": 0,
    "foreground-50-l": 53,
    "foreground-50-a": 1,
    "foreground-text-h": toHSLA(baseColors.dark).h,
    "foreground-text-s": toHSLA(baseColors.dark).s,
    "foreground-text-l": toHSLA(baseColors.dark).l,
    "foreground-text-a": toHSLA(baseColors.dark).a,
    "foreground-50-text-h": toHSLA(baseColors.dark).h,
    "foreground-50-text-s": toHSLA(baseColors.dark).s,
    "foreground-50-text-l": toHSLA(baseColors.dark).l,
    "foreground-50-text-a": toHSLA(baseColors.dark).a,    
    "primary-50-h": 0,
    "primary-50-s": 35,
    "primary-50-l": 29,
    "primary-50-a": 1,
    "primary-text-h": toHSLA(baseColors.dark).h,
    "primary-text-s": toHSLA(baseColors.dark).s,
    "primary-text-l": toHSLA(baseColors.dark).l,
    "primary-text-a": toHSLA(baseColors.dark).a,
    "primary-50-text-h": toHSLA(baseColors.light).h,
    "primary-50-text-s": toHSLA(baseColors.light).s,
    "primary-50-text-l": toHSLA(baseColors.light).l,
    "primary-50-text-a": toHSLA(baseColors.light).a,    
    "secondary-50-h": 120,
    "secondary-50-s": 35,
    "secondary-50-l": 29,
    "secondary-50-a": 1,
    "secondary-text-h": toHSLA(baseColors.dark).h,
    "secondary-text-s": toHSLA(baseColors.dark).s,
    "secondary-text-l": toHSLA(baseColors.dark).l,
    "secondary-text-a": toHSLA(baseColors.dark).a,
    "secondary-50-text-h": toHSLA(baseColors.light).h,
    "secondary-50-text-s": toHSLA(baseColors.light).s,
    "secondary-50-text-l": toHSLA(baseColors.light).l,
    "secondary-50-text-a": toHSLA(baseColors.light).a,
    "tertiary-50-h": 195,
    "tertiary-50-s": 3,
    "tertiary-50-l": 20,
    "tertiary-50-a": 1,
    "tertiary-text-h": toHSLA(baseColors.light).h,
    "tertiary-text-s": toHSLA(baseColors.light).s,
    "tertiary-text-l": toHSLA(baseColors.light).l,
    "tertiary-text-a": toHSLA(baseColors.light).a,
    "tertiary-50-text-h": toHSLA(baseColors.light).h,
    "tertiary-50-text-s": toHSLA(baseColors.light).s,
    "tertiary-50-text-l": toHSLA(baseColors.light).l,
    "tertiary-50-text-a": toHSLA(baseColors.light).a,
  };

  it("Should convert have the same amount of colors", async () => {
    const input = await createColorSet({
      data: baseColors,
      shades,
      type: ColorType.HSLA,
      mix: ["#111111", "#ffffff"], // Darkmode, because dark is first
    });
    expect(Object.keys(input).length).toBe(Object.keys(expectedDefault).length);
  });

  it("Should convert a basic set to a full scale colorset", async () => {
    const input = await createColorSet({
      data: baseColors,
      shades,
      type: ColorType.HSLA,
      mix: ["#111111", "#ffffff"], // Darkmode, because dark is first
    });
    expect(input).toEqual(expectedDefault);
  });

    it("Should convert have the same amount of limited colors", async () => {
      const input = await createColorSet({
        data: baseColors,
        shades,
        type: ColorType.HSLA,
        mix: ["#111111", "#ffffff"], // Darkmode, because dark is first
        split: {
          shades: true,
          text: true,
        },
      });
      expect(Object.keys(input).length).toBe(Object.keys(expectedFull).length);
    });
    it("Should convert a basic set to a limited scale colorset", async () => {
      const input = await createColorSet({
        data: baseColors,
        shades,
        type: ColorType.HSLA,
        mix: ["#111111", "#ffffff"], // Darkmode, because dark is first
        split: {
          shades: true,
          text: true,
        },
      });
      expect(input).toEqual(expectedFull);
    });
});
