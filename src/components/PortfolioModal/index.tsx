import Button from "../Button";
import cls from "./PorfolioModal.module.scss";

export default function PortfolioModal() {
  const prices: number[] = [100, 200, 300];
  const crypto: PorfolioCrypto[] = [
    {
      id: "bitcoin",
      symbol: "BTC",
      name: "Bitcoin",
      amount: 2,
    },
    {
      id: "ethereum",
      symbol: "ETH",
      name: "Ethereum",
      amount: 3,
    },
    {
      id: "ripple",

      symbol: "XRP",
      name: "XRP",
      amount: 4,
    },
  ];

  const sum = prices.reduce(
    (sum, item, idx) => (sum += crypto[idx].amount * item),
    0
  );
  return (
    <div className={cls.modal}>
      <div className={cls["modal__body"]}>
        <h2 className={cls.sum}>Total: ${sum.toFixed(2)}</h2>
        <ul className={cls.list}>
          {crypto.map(({ amount, id, name, symbol }, idx) => (
            <li className={cls.item} key={id}>
              <div className={cls.info}>
                <div className={cls.name}>{name}</div>
                <div className={cls.price}>${prices[idx]}</div>
              </div>
              <div>
                <div className={cls.amount}>{amount} {symbol}</div>
                <div className={cls.total}>${prices[idx]*amount}</div>
              </div>
              <Button width="40px" height="40px">X</Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
