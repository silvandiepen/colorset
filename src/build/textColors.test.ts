import { toHSLA } from "@sil/color";
import { textColors } from "./textColors";

describe("textColors", () => {
  it("Should create all text colors", () => {
    const dark = "#0a0a0a";
    const light = "#fafafa";
    expect(
      textColors({
        data: {
          primary: "#ff00ff",
          secondary: "#ff00ff",
          tertiary: "#3a5a6a",
          dark,
          light,
        },
      })
    ).toEqual({
      "primary-text": toHSLA(dark),
      "secondary-text": toHSLA(dark),
      "tertiary-text": toHSLA(light),
      "dark-text": toHSLA(light),
      "light-text": toHSLA(dark),
    });
  });
});
