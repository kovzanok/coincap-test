export const stringToFixed = (string: string | null, fixed: number): string => {
  if (!string) return "-";
  return Number(string).toFixed(fixed);
};

export const calcColorChange = (str: string | null): "red" | "green" => {
  return Number(str) >= 0 ? "green" : "red";
};
