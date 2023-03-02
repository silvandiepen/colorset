import { COLOR, ColorType, toType } from "@sil/color";
import { ColorData } from "./types";

interface ConvertToTypeArgs {
  data: ColorData;
  type: ColorType;
}
const defaultConvertToTypeArgs = {
  data: {},
  type: ColorType.HSLA,
};

export const convertToType = (args: ConvertToTypeArgs): ColorData => {
  const config = { ...defaultConvertToTypeArgs, ...args };

  let converted: ColorData = {};
  Object.keys(config.data).forEach((key, index) => {
    converted[key] = toType(config.data[key] as COLOR, config.type);
  });

  return converted;
};
