import { calcColorChange, stringToFixed } from "../../utils";
import Button from "../Button";
import cls from "./CryptoInfo.module.scss";

export default function CryptoInfo() {
  const crypto: CryptoType = {
    id: "bitcoin",
    rank: "1",
    symbol: "BTC",
    name: "Bitcoin",
    supply: "17193925.0000000000000000",
    maxSupply: "21000000.0000000000000000",
    marketCapUsd: "119179791817.6740161068269075",
    volumeUsd24Hr: "2928356777.6066665425687196",
    priceUsd: "6931.5058555666618359",
    changePercent24Hr: "-0.8101417214350335",
    vwap24Hr: "7175.0663247679233209",
  };
  return (
    <div className={cls.info}>
      <div className={cls["info__primary"]}>
        <div>
          <div>
            {crypto.name}{" "}
            <span className={cls["info__symbol"]}>{crypto.symbol}</span>
          </div>
          <div className={cls["info__price"]}>
            ${stringToFixed(crypto.priceUsd, 2)}
          </div>
          <div
            className={cls["info__change"]}
            style={{ color: calcColorChange(crypto.changePercent24Hr) }}
          >
            {stringToFixed(crypto.changePercent24Hr, 2)}% (24h)
          </div>
        </div>
        <Button>Add to portfolio</Button>
      </div>
      <div className={cls["info__row"]}>
        <span className={cls["info__text"]}>Market cap</span>{" "}
        {stringToFixed(crypto.marketCapUsd, 2)}$
      </div>
      <div className={cls["info__row"]}>
        <span className={cls["info__text"]}>Volume</span>{" "}
        {stringToFixed(crypto.volumeUsd24Hr, 2)}$
      </div>
      <div className={cls["info__row"]}>
        <span className={cls["info__text"]}>Supply</span>
        {Number(crypto.supply)} {crypto.symbol}
      </div>
      <div className={cls["info__row"]}>
        <span className={cls["info__text"]}>Max supply</span>{" "}
        {Number(crypto.maxSupply)} {crypto.symbol}
      </div>
    </div>
  );
}
