import { addComasToStr, calcColorChange, formatCryptoData } from "../../utils";
import Button from "../../UI/Button";
import cls from "./CryptoInfo.module.scss";

type CryptoInfoProps = {
  crypto: CryptoType;
  openModal: (data: CryptoData) => void;
};

export default function CryptoInfo({
  crypto: {
    vwap24Hr,
    volumeUsd24Hr,
    priceUsd,
    name,
    id,
    marketCapUsd,
    maxSupply,
    supply,
    symbol,
    changePercent24Hr,
  },
  openModal,
}: CryptoInfoProps) {
  return (
    <div className={cls.info}>
      <div className={cls.primary}>
        <div>
          <div>
            {name} <span className={cls.symbol}>{symbol}</span>
          </div>
          <div className={cls.price}>${formatCryptoData(priceUsd)}</div>
          <div
            className={cls.change}
            style={{ color: calcColorChange(changePercent24Hr) }}
          >
            {formatCryptoData(changePercent24Hr)}% (24h)
          </div>
        </div>
        <Button
          width='170px'
          height='50px'
          onClick={() => openModal({ name, id, priceUsd, symbol })}
        >
          Add to portfolio
        </Button>
      </div>
      <div className={cls.secondary}>
        <div className={cls.row}>
          <span className={cls.text}>VWAP</span>
          {addComasToStr(formatCryptoData(vwap24Hr))}
        </div>
        <div className={cls.row}>
          <span className={cls.text}>Market cap</span> $
          {addComasToStr(formatCryptoData(marketCapUsd))}
        </div>
        <div className={cls.row}>
          <span className={cls.text}>Volume</span>$
          {addComasToStr(formatCryptoData(volumeUsd24Hr))}
        </div>
        <div className={cls.row}>
          <span className={cls.text}>Supply</span>
          {addComasToStr(formatCryptoData(supply))} {symbol}
        </div>
        <div className={cls.row}>
          <span className={cls.text}>Max supply</span>
          {addComasToStr(formatCryptoData(maxSupply))} {symbol}
        </div>
      </div>
    </div>
  );
}
