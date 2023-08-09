export class ApiService {
  static BASE_URL = "https://api.coincap.io";
  static LIMIT = 10;

  static async getAllCrypto({
    page = 0,
    signal,
    ids = [],
    limit = ApiService.LIMIT,
  }: AllCryptoRequestParams): Promise<CryptoType[]> {
    const url = new URL("/v2/assets", ApiService.BASE_URL);
    const searchParams = new URLSearchParams([["ids", ids.toString()]]);
    if (limit !== "max") {
      searchParams.append("limit", String(limit));
      searchParams.append("offset", `${limit * page}`);
    }
    const res = await fetch(`${url}?${searchParams.toString()}`, { signal });
    const { data }: { data: CryptoType[]; timestamp: number } =
      await res.json();
    return data;
  }

  static async getCryptoById(
    id: string,
    signal: AbortSignal
  ): Promise<CryptoType> {
    const url = new URL(`/v2/assets/${id}`, ApiService.BASE_URL);
    const res = await fetch(url, { signal });
    const { data }: { data: CryptoType; timestamp: number } = await res.json();
    return data;
  }

  static async getPriceHistoryById(id: string, signal: AbortSignal) {
    const url = new URL(
      `/v2/assets/${id}/history?interval=h12`,
      ApiService.BASE_URL
    );
    const res = await fetch(url, { signal });
    const { data }: { data: CryptoHistoryTimeStamp[]; timestamp: number } =
      await res.json();
    return data;
  }
}
