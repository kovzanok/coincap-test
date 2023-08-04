import cls from "./PopularCryptoList.module.scss";

export default function PopularCryptoList() {
  const popularCrypto: CryptoListType[] = [
    {
      id: "bitcoin",
      name: "Bitcoin",
      symbol: "BTC",
      priceUsd: "6929.8217756835584756",
    },
    {
      id: "ethereum",
      symbol: "ETH",
      name: "Ethereum",
      priceUsd: "404.9774667045200896",
    },
    {
      id: "bitcoin",
      name: "XRP",
      symbol: "XRP",
      priceUsd: "0.4202870472643482",
    },
  ];

  return (
    <ul className={cls["list"]}>
      {popularCrypto.map(({ name, symbol, priceUsd }, idx) => (
        <li className={cls["list__item"]} key={idx}>
          <div className={cls["list__name"]}>{name}</div>
          <div className={cls["list__symbol"]}>{symbol}</div>
          <div className={cls["list__change"]}>
            {Number(priceUsd).toFixed(5)}$
          </div>
        </li>
      ))}
    </ul>
  );
}
