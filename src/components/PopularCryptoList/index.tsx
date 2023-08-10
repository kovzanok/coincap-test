import { calcBgChange, calcColorChange, formatCryptoData } from "../../utils";
import cls from "./PopularCryptoList.module.scss";
import HorizontalLoader from "../HorizontalLoader";

type PopularCryptoListProps = {
  popularCrypto: CryptoType[];
};

export default function PopularCryptoList({
  popularCrypto,
}: PopularCryptoListProps) {
  if (!popularCrypto || popularCrypto.length === 0) return <HorizontalLoader />;
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
              <div>${formatCryptoData(priceUsd)}</div>
              <div style={{ color: calcColorChange(changePercent24Hr) }}>
                {formatCryptoData(changePercent24Hr)}%
              </div>
            </div>
          </li>
        )
      )}
    </ul>
  );
}
