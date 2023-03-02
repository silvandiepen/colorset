import { COLOR } from "@sil/color";
export { ColorType, COLOR } from "@sil/color";

export interface ColorData {
  [key: string]: COLOR | number;
}

export const ColorMode = {
  DARK: "dark",
  LIGHT: "light",
};
type ColorMode = typeof ColorMode[keyof typeof ColorMode];
