import { calcBgChange, calcColorChange, stringToFixed } from "../../utils";
import cls from "./PopularCryptoList.module.scss";

export default function PopularCryptoList() {
  const popularCrypto: CryptoListType[] = [
    {
      id: "bitcoin",
      name: "Bitcoin",
      symbol: "BTC",
      priceUsd: "6929.8217756835584756",
      changePercent24Hr: "-0.81",
    },
    {
      id: "ethereum",
      symbol: "ETH",
      name: "Ethereum",
      priceUsd: "404.9774667045200896",
      changePercent24Hr: "1.2",
    },
    {
      id: "bitcoin",
      name: "XRP",
      symbol: "XRP",
      priceUsd: "0.4202870472643482",
      changePercent24Hr: "-0.2",
    },
  ];

  return (
    <ul className={cls["list"]}>
      {popularCrypto.map(
        ({ name, symbol, priceUsd, changePercent24Hr }, idx) => (
          <li className={cls["list__item"]} key={idx}>
            <div>{name}</div>
            <div className={cls["list__symbol"]}>{symbol}</div>
            <div
              style={{
                backgroundColor: calcBgChange(changePercent24Hr),
              }}
              className={cls["list__money"]}
            >
              <div>${stringToFixed(priceUsd, 3)}</div>
              <div style={{ color: calcColorChange(changePercent24Hr) }}>
                {changePercent24Hr}%
              </div>
            </div>
          </li>
        )
      )}
    </ul>
  );
}
