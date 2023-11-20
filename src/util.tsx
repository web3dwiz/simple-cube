import { Color } from "three";

export const getRandomColor = () => {
  const color = new Color();
  color.setHex(Math.floor(Math.random() * 16777215));
  return color;
};
