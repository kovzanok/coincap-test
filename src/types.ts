type CryptoType = {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: string | null;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Hr: string | null;
  vwap24Hr: string;
};

type CryptoHistoryTimeStamp = {
  priceUsd: string;
  time: string;
};

type PortfolioCrypto = Pick<CryptoType, "id"> & {
  amount: number;
};

type AllCryptoRequestParams = {
  signal: AbortSignal;
  page?: number;
  ids?: string[];
  limit?: number | "max";
};

type PortfolioCryptoInfo = Pick<CryptoType, "name" | "symbol" | "priceUsd"> &
  PorfolioCrypto;
