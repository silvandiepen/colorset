import { defineBackAndForeground } from "./defineBackAndForeground";

describe("Background and Foreground", () => {
  it("Should have a background and foreground", () => {
    const baseColors = {
      dark: "#111111",
      light: "#fafafa",
      primary: "#ff0000",
      secondary: "#00ff00",
    };

    const input = defineBackAndForeground({
      data: baseColors,
      mix: ["#000000", "#ffffff"],
    });

    expect(input).toEqual({
      background: "#111111",
      foreground: "#fafafa",
    });
  });
});
