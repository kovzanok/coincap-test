export const stringToFixed = (string: string | null, fixed: number): string => {
  if (!string) return "-";
  return Number(string).toFixed(fixed);
};

export const calcColorChange = (str: string | null): "red" | "green" => {
  return Number(str) >= 0 ? "green" : "red";
};

export const calcBgChange = (
  str: string | null
): "rgb(255 0 0 / 40%)" | "rgb(0 255 0 / 40%)" => {
  return Number(str) >= 0 ? "rgb(0 255 0 / 40%)" : "rgb(255 0 0 / 40%)";
};

export const addComasToStr = (str: string): string => {
  if (str[0] === "0") return str;
  if (str === "0") return "-";
  let strToSeparate = "";
  let endOfStr = "";
  if (str.includes(".")) {
    const dot = str.indexOf(".");
    strToSeparate = str.slice(0, dot);
    endOfStr = str.slice(dot);
  } else {
    strToSeparate = str;
  }
  const separatedArr = separateArr(strToSeparate);
  return separatedArr.reverse().join("") + endOfStr;
};

const separateArr = (str: string): string[] =>
  str
    .split("")
    .reverse()
    .map((item, index) => {
      if ((index + 1) % 3 === 0 && index + 1 !== str.length) {
        return "," + item;
      }
      return item;
    });

export const shortenMillionNumber = (str: string | null): string => {
  if (!str) return "-";
  const integerPart = Number(str).toFixed(0);
  switch (true) {
    case integerPart.length > 12:
      return integerPart.split("").reverse().slice(12).reverse().join("") + "T";
    case integerPart.length > 9:
      return integerPart.split("").reverse().slice(9).reverse().join("") + "B";
    case integerPart.length > 6:
      return integerPart.split("").reverse().slice(6).reverse().join("") + "M";
    default:
      return formatCryptoData(str);
  }
};

export const getPageFromSearchParams = (searchParams: URLSearchParams) => {
  const pageStr = searchParams.get("page");
  if (!pageStr) return 0;
  return Number(pageStr) - 1;
};

export const formatCryptoData = (price: string | null): string => {
  if (!price) return "-";
  const dotIndex = price.indexOf(".");
  const integerPart = Number(price).toFixed(0);
  const fractialPart = price.slice(dotIndex + 1);
  if (
    fractialPart[1] !== "0" ||
    fractialPart[0] !== "0" ||
    integerPart !== "0"
  ) {
    return stringToFixed(price, 2);
  }
  let fixedNum = 0;
  for (const num of fractialPart) {
    fixedNum += 1;
    if (num !== "0") break;
  }
  return stringToFixed(price, fixedNum);
};

export const getPorfolioSum = (
  portfolio: (PortfolioCrypto | PorfolioCryptoCostInfo)[]
): number => {
  return portfolio.reduce(
    (sum, { priceUsd, amount }) => (sum += amount * Number(priceUsd)),
    0
  );
};
