type CryptoListType = Pick<
  CryptoType,
  "name" | "symbol" | "priceUsd" | "id" | "changePercent24Hr"
>;

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

type PorfolioCrypto = Pick<CryptoType, "id"> & {
  amount: number;
};

type AllCryptoRequestParams = {
  signal: AbortSignal;
  page?: number;
  ids?: string[];
  limit?: number;
};
