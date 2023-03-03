import { ColorData, COLOR, ColorMode } from "./types";
import { toType, mix, ColorType, toRGB, getLightness, RGB } from "@sil/color";

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
  mix: [RGB, RGB];
}): [RGB, RGB] => {
  let mixBase = args.mix[0];
  let mixAlt = args.mix[1];

  const mode =
    getLightness(mixBase) > getLightness(mixAlt)
      ? ColorMode.LIGHT
      : ColorMode.DARK;

  if (
    args.data.dark &&
    args.data.light &&
    mixBase == defaultShadeColorsArgs.mix[0] &&
    mixAlt == defaultShadeColorsArgs.mix[1]
  ) {
    const dark = toRGB(args.data.dark as COLOR);
    const light = toRGB(args.data.light as COLOR);

    switch (mode) {
      case ColorMode.DARK:
        return [dark, light];
      case ColorMode.LIGHT:
        return [light, dark];
    }
  }

  return args.mix;
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
      mix: [toRGB(config.mix[0]), toRGB(config.mix[1])],
    });

    const colorValue = toRGB(config.data[color] as COLOR);
    let mixColor = toRGB(mixColors[0] as COLOR);

    if (JSON.stringify(mixColor) == JSON.stringify(colorValue))
      mixColor = toRGB(mixColors[1] as COLOR);

    config.shades.forEach((shade) => {
      shapeData[`${color}-${shade}`] = toType(
        mix(mixColor, toRGB(colorValue), shade),
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
