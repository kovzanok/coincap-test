import cls from "./PopularCryptoList.module.scss";

export default function PopularCryptoList() {
  const popularCrypto: CryptoListType[] = [
    {
      id: "bitcoin",
      name: "Bitcoin",
      symbol: "BTC",
      changePercent24Hr: "-0.8101417214350335",
    },
    {
      id: "ethereum",
      symbol: "ETH",
      name: "Ethereum",
      changePercent24Hr: "-0.0999626159535347",
    },
    {
      id: "bitcoin",
      name: "XRP",
      symbol: "XRP",
      changePercent24Hr: "-1.9518258685302665",
    },
  ];

  return (
    <ul className={cls["list"]}>
      {popularCrypto.map(({ name, symbol, changePercent24Hr }, idx) => (
        <li className={cls["list__item"]} key={idx}>
          <div className={cls["list__name"]}>{name}</div>
          <div className={cls["list__symbol"]}>{symbol}</div>
          <div
            style={{
              color: Number(changePercent24Hr) >= 0 ? "green" : "red",
            }}
            className={cls["list__change"]}
          >
            {Number(changePercent24Hr).toFixed(5)}%
          </div>
        </li>
      ))}
    </ul>
  );
}
