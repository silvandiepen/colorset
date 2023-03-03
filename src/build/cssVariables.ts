import { ColorData } from "./types";
import { SassValue } from "../helpers/sass";
import {
  isHSL,
  isRGB,
  isRGBA,
  isHSLA,
  isHSV,
  isHSVA,
  toRGBA,
  toHSLA,
  toHSVA,
} from "@sil/color";

interface CssVariablesArgs {
  data: ColorData;
  prefix?: string;
  colorToProps?: boolean;
}
const defaultCssVariablesArgs = {
  data: {},
  prefix: "",
  colorToProps: true,
};

export const colorToCustomProperties = (key: string, value: string) => {
  if (isRGB(value) || isRGBA(value)) {
    const c = toRGBA(value);
    return `rgba(var(--${key}-r, ${c.r}),var(--${key}-g, ${c.g}),var(--${key}-b, ${c.b}),var(--${key}-a, ${c.a}))`;
  }
  if (isHSL(value) || isHSLA(value)) {
    const c = toHSLA(value);
    return `hsla(var(--${key}-h, ${c.h}deg),var(--${key}-s, ${c.s}%),var(--${key}-l, ${c.l}%),var(--${key}-a, ${c.a}))`;
  }
  if (isHSV(value) || isHSVA(value)) {
    const c = toHSVA(value);
    return `hsva(var(--${key}-h, ${c.h}deg),var(--${key}-s, ${c.s}%),var(--${key}-v, ${c.v}%),var(--${key}-a, ${c.a}))`;
  }
   return SassValue(value);
};

const isEqual = (object1: Object, object2: Object): boolean =>
  JSON.stringify(object1) == JSON.stringify(object2);

export const cssVariables = (args: CssVariablesArgs): string => {
  const config = { ...defaultCssVariablesArgs, ...args };

  let vars: [string, string][] = [];

  const dark = config.data?.dark;
  const light = config.data?.light;

  const createProps = true;
  Object.keys(config.data).forEach((key: string) => {
    let cssCustomProperty = "";

    if (isEqual(config.data[key], dark) || isEqual(config.data[key], light)) {
      if (isEqual(config.data[key], dark) && key !== "dark")
        cssCustomProperty = `var(--dark, ${SassValue(dark)})`;
      if (isEqual(config.data[key], light) && key !== "light")
        cssCustomProperty = `var(--light, ${SassValue(light)})`;
    }

    vars.push([
      `${key}`,
      cssCustomProperty
        ? cssCustomProperty
        : createProps
        ? `${colorToCustomProperties(key, SassValue(config.data[key]))}`
        : `${SassValue(config.data[key])}`,
    ]);
  });

  let varString = ``;
  vars.forEach((v: [string, string]) => {
    varString += `--${v[0]}: ${v[1]};\n`;
  });


  return varString;
};
