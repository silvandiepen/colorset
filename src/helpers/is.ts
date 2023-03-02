export const isObject = (input: any) => {
  return typeof input === "object" && !Array.isArray(input) && input !== null;
};

export const isString = (input: any) => {
  return typeof input == "string";
};
