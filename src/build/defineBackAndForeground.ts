import { COLOR, getLightness } from "@sil/color";
import { ColorData } from "./types";

interface DefineBackAndForegroundArgs {
  data: ColorData;
  mix: [COLOR, COLOR];
}
const defaultDefineBackAndForegroundArgs: DefineBackAndForegroundArgs = {
  data: {},
  mix: ["#ffffff", "#000000"],
};

export const defineBackAndForeground = (
  args: DefineBackAndForegroundArgs
): ColorData => {
  const config = { ...defaultDefineBackAndForegroundArgs, ...args };

  let dark = config.data.dark;
  let light = config.data.light;

  if (!dark || !light) {
    dark = "#000000";
    light = "#ffffff";
    return config.data;
  }

  const mode =
    getLightness(config.mix[0]) > getLightness(config.mix[1])
      ? "lightmode"
      : "darkmode";

  return {
    background: mode === "darkmode" ? dark : light,
    foreground: mode === "darkmode" ? light : dark,
  };
};

export const asyncDefineBackAndForeground = async (
  args: DefineBackAndForegroundArgs
): Promise<ColorData> => {
  const data = defineBackAndForeground(args);
  return data;
};
