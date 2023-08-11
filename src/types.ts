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

type PortfolioCrypto = Pick<
  CryptoType,
  "id" | "priceUsd" | "symbol" | "name"
> & {
  amount: number;
  portfolioId: string;
};

type LastAddedCrypto = Pick<CryptoType, "id">;

type AllCryptoRequestParams = {
  signal: AbortSignal;
  page?: number;
  ids?: string[];
  limit?: number | "max";
};

type PorfolioCryptoCostInfo = Omit<
  PortfolioCrypto,
  "name" | "symbol" | "amount"
>;

type CryptoData = Pick<CryptoType, "name" | "symbol" | "id" | "priceUsd">;
