import { COLOR, textColor, ColorType, toType } from "@sil/color";
import { ColorData } from "./types";

interface TextColorsArgs {
  data: ColorData;
  type?: ColorType;
}
const defaultTextColorsArgs: TextColorsArgs = {
  data: {},
  type: ColorType.HSLA,
};

export const textColors = (args: TextColorsArgs): ColorData => {
  const config = { ...defaultTextColorsArgs, ...args };

  const textData: ColorData = {};

  const darkColor = config.data.dark
    ? toType(config.data.dark as COLOR, config.type)
    : toType("#000000", config.type);
  const lightColor = config.data.light
    ? toType(config.data.light as COLOR, config.type)
    : toType("#ffffff", config.type);

  Object.keys(config.data).forEach((color) => {
    textData[`${color}-text`] = textColor(config.data[color] as COLOR, {
      dark: darkColor,
      light: lightColor,
      offset: 50,
    });
  });
  return textData;
};

export const asyncTextColors = async (
  args: TextColorsArgs
): Promise<ColorData> => {
  const data = textColors(args);
  return data;
};
