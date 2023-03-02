import { ColorType } from "@sil/color";
import { createColorSet } from "./createColorSet";
import { cssVariables } from "./cssVariables";

describe("Css Variables", () => {
  const baseColors = {
    dark: "#111111",
    light: "#fafafa",
    primary: "#ff0000",
    secondary: "#00ff00",
    tertiary: "#3a5a6a",
  };

  it("Should convert all colors to css Variables", async () => {
    const data = await createColorSet({
      data: baseColors,
      shades: [10],
      type: ColorType.HSLA,
    });
    const input = cssVariables({ data });

    const expected = `--dark: hsla(var(--dark-h, 0),var(--dark-s, 0),var(--dark-l, 0),var(--dark-a, 1));
--light: hsla(var(--light-h, 0),var(--light-s, 0),var(--light-l, 0),var(--light-a, 1));
--primary: hsla(var(--primary-h, 0),var(--primary-s, 0),var(--primary-l, 0),var(--primary-a, 1));
--secondary: hsla(var(--secondary-h, 0),var(--secondary-s, 0),var(--secondary-l, 0),var(--secondary-a, 1));
--tertiary: hsla(var(--tertiary-h, 0),var(--tertiary-s, 0),var(--tertiary-l, 0),var(--tertiary-a, 1));
--background: var(--light, hsla(0, 0, 98, 1));
--foreground: var(--dark, hsla(0, 0, 7, 1));
--dark-10: hsla(var(--dark-10-h, 0),var(--dark-10-s, 0),var(--dark-10-l, 0),var(--dark-10-a, 1));
--light-10: hsla(var(--light-10-h, 0),var(--light-10-s, 0),var(--light-10-l, 0),var(--light-10-a, 1));
--primary-10: hsla(var(--primary-10-h, 0),var(--primary-10-s, 0),var(--primary-10-l, 0),var(--primary-10-a, 1));
--secondary-10: hsla(var(--secondary-10-h, 0),var(--secondary-10-s, 0),var(--secondary-10-l, 0),var(--secondary-10-a, 1));
--tertiary-10: hsla(var(--tertiary-10-h, 0),var(--tertiary-10-s, 0),var(--tertiary-10-l, 0),var(--tertiary-10-a, 1));
--background-10: hsla(var(--background-10-h, 0),var(--background-10-s, 0),var(--background-10-l, 0),var(--background-10-a, 1));
--foreground-10: hsla(var(--foreground-10-h, 0),var(--foreground-10-s, 0),var(--foreground-10-l, 0),var(--foreground-10-a, 1));
--dark-text: var(--light, hsla(0, 0, 98, 1));
--light-text: var(--dark, hsla(0, 0, 7, 1));
--primary-text: var(--dark, hsla(0, 0, 7, 1));
--secondary-text: var(--dark, hsla(0, 0, 7, 1));
--tertiary-text: var(--light, hsla(0, 0, 98, 1));
--background-text: var(--dark, hsla(0, 0, 7, 1));
--foreground-text: var(--light, hsla(0, 0, 98, 1));
--dark-10-text: var(--light, hsla(0, 0, 98, 1));
--light-10-text: var(--dark, hsla(0, 0, 7, 1));
--primary-10-text: var(--light, hsla(0, 0, 98, 1));
--secondary-10-text: var(--dark, hsla(0, 0, 7, 1));
--tertiary-10-text: var(--light, hsla(0, 0, 98, 1));
--background-10-text: var(--dark, hsla(0, 0, 7, 1));
--foreground-10-text: var(--light, hsla(0, 0, 98, 1));
--dark-h: 0;
--dark-s: 0;
--dark-l: 7;
--dark-a: 1;
--light-h: 0;
--light-s: 0;
--light-l: 98;
--light-a: 1;
--primary-h: 0;
--primary-s: 100;
--primary-l: 50;
--primary-a: 1;
--secondary-h: 120;
--secondary-s: 100;
--secondary-l: 50;
--secondary-a: 1;
--tertiary-h: 202;
--tertiary-s: 14;
--tertiary-l: 33;
--tertiary-a: 1;
--background-h: 0;
--background-s: 0;
--background-l: 98;
--background-a: 1;
--foreground-h: 0;
--foreground-s: 0;
--foreground-l: 7;
--foreground-a: 1;
`;

    expect(input).toBe(expected);
  });
});
