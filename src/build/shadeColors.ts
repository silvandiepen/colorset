import { ColorData, COLOR, ColorMode } from "./types";
import { toType, mix, ColorType, toRGB, getLightness } from "@sil/color";

interface ShadeColorsArgs {
  data: ColorData;
  shades: number[];
  mix?: [COLOR, COLOR];
  type?: ColorType;
}

const defaultShadeColorsArgs: ShadeColorsArgs = {
  data: {},
  shades: [],
  mix: ["#000000", "#ffffff"],
  type: ColorType.HSLA,
};

const defineMixColor = (args: {
  data: ColorData;
  mixInput: [COLOR, COLOR];
}) => {
  let mix = args.mixInput[0];
  let altMix = args.mixInput[1];

  const mode =
    getLightness(mix) > getLightness(altMix) ? ColorMode.LIGHT : ColorMode.DARK;

  if (
    args.data.dark &&
    args.data.light &&
    mix == defaultShadeColorsArgs.mix[0] &&
    altMix == defaultShadeColorsArgs.mix[1]
  ) {
    switch (mode) {
      case ColorMode.DARK:
        return [args.data.dark, args.data.light];
      case ColorMode.LIGHT:
        return [args.data.light, args.data.dark];
    }
  }

  return [mix, altMix];
};

/*

Create all shapes based on your colors. 

Mix color is defined based on variables set, or when dark and light are 
set in the colorset. These will be used ias the mix color

*/

export const shadeColors = (args: ShadeColorsArgs): ColorData => {
  const config = { ...defaultShadeColorsArgs, ...args };
  if (!config.shades.length) return config.data;

  let shapeData: ColorData = {};

  Object.keys(config.data).forEach((color) => {
    const mixColors = defineMixColor({
      data: config.data,
      mixInput: config.mix,
    });

    const colorValue = toType(config.data[color] as COLOR, config.type);
    let mixColor = toType(mixColors[0] as COLOR, config.type);
    if (JSON.stringify(mixColor) == JSON.stringify(colorValue))
      mixColor = toType(mixColors[1] as COLOR, config.type);

    config.shades.forEach((shade) => {
      shapeData[`${color}-${shade}`] = toType(
        mix(toRGB(colorValue), toRGB(mixColor), shade),
        config.type
      );
    });
  });
  return shapeData;
};

export const asyncShadeColors = async (
  args: ShadeColorsArgs
): Promise<ColorData> => {
  const data = shadeColors(args);
  return data;
};
