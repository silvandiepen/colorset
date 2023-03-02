import { COLOR, ColorType, HSLA, RGBA, CMYK, toType, HSVA } from "@sil/color";
import { ColorData } from "./types";

interface SplitColorsArgs {
  data: ColorData;
  type?: ColorType;
  filters?: string[];
}
const defaultSplitColorsArgs = {
  data: {},
  type: ColorType.HSLA,
  filters: [],
} as SplitColorsArgs;

export const splitColors = (args: SplitColorsArgs): ColorData => {
  const config = { ...defaultSplitColorsArgs, ...args };

  let splitData: ColorData = {};

  Object.keys(config.data).forEach((key) => {
    const filtered = config.filters.some((filter) => key.endsWith(filter));

    if (!filtered) {
      const c = toType(config.data[key] as COLOR, config.type);

      switch (config.type) {
        case ColorType.HSLA:
          splitData[`${key}-h`] = `${(c as HSLA).h}deg`;
          splitData[`${key}-s`] = `${(c as HSLA).s}%`;
          splitData[`${key}-l`] = `${(c as HSLA).l}%`;
          if ((c as HSLA).a) splitData[`${key}-a`] = (c as HSLA).a;
          break;
        case ColorType.RGBA:
          splitData[`${key}-r`] = (c as RGBA).r;
          splitData[`${key}-g`] = (c as RGBA).g;
          splitData[`${key}-b`] = (c as RGBA).b;
          if ((c as RGBA).a) splitData[`${key}-a`] = (c as RGBA).a;
          break;
        case ColorType.CMYK:
          splitData[`${key}-c`] = (c as CMYK).c;
          splitData[`${key}-m`] = (c as CMYK).m;
          splitData[`${key}-y`] = (c as CMYK).y;
          splitData[`${key}-k`] = (c as CMYK).k;
          break;
        case ColorType.HSVA:
          splitData[`${key}-h`] = `${(c as HSVA).h}deg`;
          splitData[`${key}-s`] = `${(c as HSVA).s}%`;
          splitData[`${key}-v`] = `${(c as HSVA).v}%`;
          if ((c as HSVA).a) splitData[`${key}-a`] = (c as HSVA).a;
          break;
        default:
          console.log(`${config.type} is not supported to be split`);
          break;
      }
    }
  });

  return splitData;
};

export const asyncSplitColors = async (
  args: SplitColorsArgs
): Promise<ColorData> => {
  const data = splitColors(args);
  return data;
};
