import { ColorType } from "@sil/color";
import { createColorSet } from "./createColorSet";
import { cssVariables } from "./cssVariables";

const baseColors = {
  dark: "#111111",
  light: "#fafafa",
  primary: "#ff0000",
  secondary: "#00ff00",
  tertiary: "#3a5a6a",
};

describe("Css Variables", () => {
  it("Should convert a basic set of colors", async () => {
    const data = await createColorSet({
      data: {
        primary: baseColors.primary,
      },
      shades: [50],
      type: ColorType.HSLA,
      mix: [baseColors.dark, baseColors.light],
    });

    // Check if the color is correct
    expect(baseColors.primary).toBe("#ff0000");

    // Check the colorset
    expect(data).toEqual({
      primary: {
        a: 1,
        h: 0,
        l: 50,
        s: 100,
      },
      "primary-50": {
        a: 1,
        h: 0,
        l: 29,
        s: 34,
      },
      "primary-50-text": {
        a: 1,
        h: 0,
        l: 100,
        s: 0,
      },
      "primary-a": 1,
      "primary-h": "0deg",
      "primary-l": "50%",
      "primary-s": "100%",
      "primary-text": {
        a: 1,
        h: 0,
        l: 0,
        s: 0,
      },
    });

    // Check the variables to be the same as the output of colorset
    const input = cssVariables({ data });

    const expected = `--primary: hsla(var(--primary-h, ${
      data["primary-h"]
    }),var(--primary-s, ${data["primary-s"]}),var(--primary-l, ${
      data["primary-l"]
    }),var(--primary-a, ${data["primary-a"]}));
--primary-50: hsla(var(--primary-50-h, ${
      (data["primary-50"] as any).h
    }deg),var(--primary-50-s, ${
      (data["primary-50"] as any).s
    }%),var(--primary-50-l, ${
      (data["primary-50"] as any).l
    }%),var(--primary-50-a, ${(data["primary-50"] as any).a}));
--primary-text: hsla(var(--primary-text-h, ${
      (data["primary-text"] as any).h
    }deg),var(--primary-text-s, ${
      (data["primary-text"] as any).s
    }%),var(--primary-text-l, ${
      (data["primary-text"] as any).l
    }%),var(--primary-text-a, ${(data["primary-text"] as any).a}));
--primary-50-text: hsla(var(--primary-50-text-h, ${
      (data["primary-50-text"] as any).h
    }deg),var(--primary-50-text-s, ${
      (data["primary-50-text"] as any).s
    }%),var(--primary-50-text-l, ${
      (data["primary-50-text"] as any).l
    }%),var(--primary-50-text-a, ${(data["primary-50-text"] as any).a}));
--primary-h: ${data["primary-h"]};
--primary-s: ${data["primary-s"]};
--primary-l: ${data["primary-l"]};
--primary-a: ${data["primary-a"]};
`;

    expect(input).toEqual(expected);
  });

  it("Should convert all colors to css Variables - Darkmode", async () => {
    const data = await createColorSet({
      data: baseColors,
      shades: [10],
      type: ColorType.HSLA,
      mix: [baseColors.dark, baseColors.light],
    });
    const input = cssVariables({ data });
    const expected = `--dark: hsla(var(--dark-h, 0deg),var(--dark-s, 0%),var(--dark-l, 7%),var(--dark-a, 1));
--light: hsla(var(--light-h, 0deg),var(--light-s, 0%),var(--light-l, 98%),var(--light-a, 1));
--primary: hsla(var(--primary-h, 0deg),var(--primary-s, 100%),var(--primary-l, 50%),var(--primary-a, 1));
--secondary: hsla(var(--secondary-h, 120deg),var(--secondary-s, 100%),var(--secondary-l, 50%),var(--secondary-a, 1));
--tertiary: hsla(var(--tertiary-h, 202deg),var(--tertiary-s, 14%),var(--tertiary-l, 33%),var(--tertiary-a, 1));
--background: var(--dark, hsla(0deg, 0%, 7%, 1));
--foreground: var(--light, hsla(0deg, 0%, 98%, 1));
--dark-10: hsla(var(--dark-10-h, 0deg),var(--dark-10-s, 0%),var(--dark-10-l, 89%),var(--dark-10-a, 1));
--light-10: hsla(var(--light-10-h, 0deg),var(--light-10-s, 0%),var(--light-10-l, 16%),var(--light-10-a, 1));
--primary-10: hsla(var(--primary-10-h, 0deg),var(--primary-10-s, 6%),var(--primary-10-l, 11%),var(--primary-10-a, 1));
--secondary-10: hsla(var(--secondary-10-h, 120deg),var(--secondary-10-s, 6%),var(--secondary-10-l, 11%),var(--secondary-10-a, 1));
--tertiary-10: hsla(var(--tertiary-10-h, 210deg),var(--tertiary-10-s, 1%),var(--tertiary-10-l, 9%),var(--tertiary-10-a, 1));
--background-10: hsla(var(--background-10-h, 0deg),var(--background-10-s, 0%),var(--background-10-l, 89%),var(--background-10-a, 1));
--foreground-10: hsla(var(--foreground-10-h, 0deg),var(--foreground-10-s, 0%),var(--foreground-10-l, 16%),var(--foreground-10-a, 1));
--dark-text: var(--light, hsla(0deg, 0%, 98%, 1));
--light-text: var(--dark, hsla(0deg, 0%, 7%, 1));
--primary-text: var(--dark, hsla(0deg, 0%, 7%, 1));
--secondary-text: var(--dark, hsla(0deg, 0%, 7%, 1));
--tertiary-text: var(--light, hsla(0deg, 0%, 98%, 1));
--background-text: var(--light, hsla(0deg, 0%, 98%, 1));
--foreground-text: var(--dark, hsla(0deg, 0%, 7%, 1));
--dark-10-text: var(--dark, hsla(0deg, 0%, 7%, 1));
--light-10-text: var(--light, hsla(0deg, 0%, 98%, 1));
--primary-10-text: var(--light, hsla(0deg, 0%, 98%, 1));
--secondary-10-text: var(--light, hsla(0deg, 0%, 98%, 1));
--tertiary-10-text: var(--light, hsla(0deg, 0%, 98%, 1));
--background-10-text: var(--dark, hsla(0deg, 0%, 7%, 1));
--foreground-10-text: var(--light, hsla(0deg, 0%, 98%, 1));
--dark-h: 0deg;
--dark-s: 0%;
--dark-l: 7%;
--dark-a: 1;
--light-h: 0deg;
--light-s: 0%;
--light-l: 98%;
--light-a: 1;
--primary-h: 0deg;
--primary-s: 100%;
--primary-l: 50%;
--primary-a: 1;
--secondary-h: 120deg;
--secondary-s: 100%;
--secondary-l: 50%;
--secondary-a: 1;
--tertiary-h: 202deg;
--tertiary-s: 14%;
--tertiary-l: 33%;
--tertiary-a: 1;
--background-h: 0deg;
--background-s: 0%;
--background-l: 7%;
--background-a: 1;
--foreground-h: 0deg;
--foreground-s: 0%;
--foreground-l: 98%;
--foreground-a: 1;
`;

    expect(input).toBe(expected);
  });
  it("Should convert all colors to css Variables - Lightmode", async () => {
    const data = await createColorSet({
      data: baseColors,
      shades: [10],
      type: ColorType.HSLA,
      mix: [baseColors.light, baseColors.dark],
    });
    const input = cssVariables({ data }); 
    const expected = `--dark: hsla(var(--dark-h, 0deg),var(--dark-s, 0%),var(--dark-l, 7%),var(--dark-a, 1));
--light: hsla(var(--light-h, 0deg),var(--light-s, 0%),var(--light-l, 98%),var(--light-a, 1));
--primary: hsla(var(--primary-h, 0deg),var(--primary-s, 100%),var(--primary-l, 50%),var(--primary-a, 1));
--secondary: hsla(var(--secondary-h, 120deg),var(--secondary-s, 100%),var(--secondary-l, 50%),var(--secondary-a, 1));
--tertiary: hsla(var(--tertiary-h, 202deg),var(--tertiary-s, 14%),var(--tertiary-l, 33%),var(--tertiary-a, 1));
--background: var(--light, hsla(0deg, 0%, 98%, 1));
--foreground: var(--dark, hsla(0deg, 0%, 7%, 1));
--dark-10: hsla(var(--dark-10-h, 0deg),var(--dark-10-s, 0%),var(--dark-10-l, 89%),var(--dark-10-a, 1));
--light-10: hsla(var(--light-10-h, 0deg),var(--light-10-s, 0%),var(--light-10-l, 16%),var(--light-10-a, 1));
--primary-10: hsla(var(--primary-10-h, 0deg),var(--primary-10-s, 71%),var(--primary-10-l, 93%),var(--primary-10-a, 1));
--secondary-10: hsla(var(--secondary-10-h, 120deg),var(--secondary-10-s, 71%),var(--secondary-10-l, 93%),var(--secondary-10-a, 1));
--tertiary-10: hsla(var(--tertiary-10-h, 210deg),var(--tertiary-10-s, 13%),var(--tertiary-10-l, 92%),var(--tertiary-10-a, 1));
--background-10: hsla(var(--background-10-h, 0deg),var(--background-10-s, 0%),var(--background-10-l, 16%),var(--background-10-a, 1));
--foreground-10: hsla(var(--foreground-10-h, 0deg),var(--foreground-10-s, 0%),var(--foreground-10-l, 89%),var(--foreground-10-a, 1));
--dark-text: var(--light, hsla(0deg, 0%, 98%, 1));
--light-text: var(--dark, hsla(0deg, 0%, 7%, 1));
--primary-text: var(--dark, hsla(0deg, 0%, 7%, 1));
--secondary-text: var(--dark, hsla(0deg, 0%, 7%, 1));
--tertiary-text: var(--light, hsla(0deg, 0%, 98%, 1));
--background-text: var(--dark, hsla(0deg, 0%, 7%, 1));
--foreground-text: var(--light, hsla(0deg, 0%, 98%, 1));
--dark-10-text: var(--dark, hsla(0deg, 0%, 7%, 1));
--light-10-text: var(--light, hsla(0deg, 0%, 98%, 1));
--primary-10-text: var(--dark, hsla(0deg, 0%, 7%, 1));
--secondary-10-text: var(--dark, hsla(0deg, 0%, 7%, 1));
--tertiary-10-text: var(--dark, hsla(0deg, 0%, 7%, 1));
--background-10-text: var(--light, hsla(0deg, 0%, 98%, 1));
--foreground-10-text: var(--dark, hsla(0deg, 0%, 7%, 1));
--dark-h: 0deg;
--dark-s: 0%;
--dark-l: 7%;
--dark-a: 1;
--light-h: 0deg;
--light-s: 0%;
--light-l: 98%;
--light-a: 1;
--primary-h: 0deg;
--primary-s: 100%;
--primary-l: 50%;
--primary-a: 1;
--secondary-h: 120deg;
--secondary-s: 100%;
--secondary-l: 50%;
--secondary-a: 1;
--tertiary-h: 202deg;
--tertiary-s: 14%;
--tertiary-l: 33%;
--tertiary-a: 1;
--background-h: 0deg;
--background-s: 0%;
--background-l: 98%;
--background-a: 1;
--foreground-h: 0deg;
--foreground-s: 0%;
--foreground-l: 7%;
--foreground-a: 1;
`;

    expect(input).toBe(expected);
  });
});

describe("Compare dark and lightmode", () => {
  let inputDarkmode = null;
  let inputLightmode = null;
  let dataDarkmode = null;
  let dataLightmode = null;

  beforeAll(async () => {
    dataDarkmode = await createColorSet({
      data: baseColors,
      shades: [10,90],
      type: ColorType.HSLA,
      mix: [baseColors.light, baseColors.dark],
    });
    inputDarkmode = cssVariables({ data: dataDarkmode });
    dataLightmode = await createColorSet({
      data: baseColors,
      shades: [10,90],
      type: ColorType.HSLA,
      mix: [baseColors.dark, baseColors.light],
    });
    inputLightmode = cssVariables({ data: dataLightmode });
  });

  it("Dark !== Light", () => {
    expect(dataDarkmode).not.toEqual(dataLightmode);
  });
  it("Dark !== Light", () => {
    expect(inputDarkmode).not.toEqual(inputLightmode);
  });
  it("dark.background !== light.background", () => {
    expect(dataDarkmode["background"]).not.toEqual(dataLightmode["background"]);
  });
  it("dark.background == light.foreground", () => {
    expect(dataDarkmode["background"]).toEqual(dataLightmode["foreground"]);
  });
  it("dark.background == light.foreground", () => {
    expect(dataDarkmode["foreground"]).toEqual(dataLightmode["background"]);
  });
  it("dark.primary == light.primary", () => {
    expect(dataDarkmode["primary"]).toEqual(dataLightmode["primary"]);
  });
  it("dark.primary.10 !== light.primary.10", () => {
    expect(dataDarkmode["primary-10"]).not.toEqual(dataLightmode["primary-10"]);
  });
});
