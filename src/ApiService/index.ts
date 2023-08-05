export class ApiService {
  static BASE_URL = "https://api.coincap.io";
  static LIMIT = 20;

  static async getAllCrypto(
    page: number,
    limit = ApiService.LIMIT
  ): Promise<CryptoType[]> {
    const url = new URL("/v2/assets", ApiService.BASE_URL);
    const searchParams = new URLSearchParams([
      ["limit", String(limit)],
      ["offset", `${limit * page}`],
    ]);
    const res = await fetch(`${url}?${searchParams.toString()}`);
    const { data }: { data: CryptoType[]; timestamp: number } =
      await res.json();
    return data;
  }

  static async getCryptoById(id: string): Promise<CryptoType> {
    const url = new URL(`/v2/assets/${id}`, ApiService.BASE_URL);
    const res = await fetch(url);
    const { data }: { data: CryptoType; timestamp: number } = await res.json();
    return data;
  }
}
