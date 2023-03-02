import { ColorType, toHSLA } from "@sil/color";
import { convertToType } from "./convertColors";

describe("Convert To Type", () => {
  it("Should convert a whole map of Color Data to a certain type", async () => {
    const dark = "#000000";
    const light = "#ffffff";
    const primary = "#ff0000";
    const secondary = "#0000ff";

    const input = await convertToType({
      data: {
        dark,
        light,
        primary,
        secondary,
      },
      type: ColorType.HSLA,
    });

    const expected = {
      dark: toHSLA(dark),
      light: toHSLA(light),
      primary: toHSLA(primary),
      secondary: toHSLA(secondary),
    };

    expect(input).toEqual(expected);
  });
});
