type CryptoListType = Pick<
  CryptoType,
  "name" | "symbol" | "priceUsd" | "id"
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
