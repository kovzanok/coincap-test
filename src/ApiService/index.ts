export class ApiService {
  static BASE_URL = "https://api.coincap.io";
  static LIMIT = "20";

  static async getAllCrypto(page: number): Promise<CryptoType[]> {
    const url = new URL("/v2/assets", ApiService.BASE_URL);
    const searchParams = new URLSearchParams([
      ["limit", ApiService.LIMIT],
      ["offset", `${+ApiService.LIMIT * page}`],
    ]);
    const res = await fetch(`${url}?${searchParams.toString()}`);
    const { data }: { data: CryptoType[]; timestamp: number } =
      await res.json();
    return data;
  }
}
