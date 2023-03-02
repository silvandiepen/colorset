import { COLOR, ColorType } from "@sil/color";
import { convertToType } from "./convertColors";
import { asyncDefineBackAndForeground } from "./defineBackAndForeground";
import { asyncShadeColors } from "./shadeColors";
import { asyncSplitColors } from "./splitColors";
import { asyncTextColors } from "./textColors";

import { ColorData } from "./types";

interface CreateColorSetArgs {
  data: ColorData;
  type: ColorType;
  mix?: [COLOR, COLOR];
  shades: number[];
  split?: {
    shades: boolean;
    text: boolean;
  };
}
const defaultCreateColorSet: CreateColorSetArgs = {
  data: {},
  type: ColorType.HSLA,
  mix: ["#ffffff", "#000000"],
  shades: [],
  split: {
    shades: false,
    text: false,
  },
};

const hello = async (...args: any) => {
  return args;
};

export const createColorSet = async (
  args: CreateColorSetArgs
): Promise<ColorData> => {
  const config = { ...defaultCreateColorSet, ...args };

  const colorSet = await hello()
    .then(async () => {
      const colors = { ...config.data };
      const groundData = await asyncDefineBackAndForeground({
        data: colors,
        mix: config.mix,
      });
      return { ...colors, ...groundData };
    })
    .then(async (data) => {
      const colors = { ...config.data, ...data };
      const shadeColors = await asyncShadeColors({
        data: colors,
        shades: config.shades,
      });
      return { ...colors, ...shadeColors };
    })
    .then(async (data) => {
      const colors = { ...config.data, ...data };
      const textData = await asyncTextColors({ data: colors });
      return { ...colors, ...textData };
    })
    .then((data) => {
      return convertToType({ data, type: args.type });
    })
    .then(async (data) => {
      const filters = [];
      if (!config.split.shades)
        filters.push(...config.shades.map((s) => `-${s}`));
      if (!config.split.text) filters.push("-text");

      const splitData = await asyncSplitColors({ data, filters });
      return { ...data, ...splitData };
    });
  return colorSet;
};
