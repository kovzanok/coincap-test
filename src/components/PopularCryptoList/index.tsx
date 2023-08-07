import { useState } from "react";
import { useFetching } from "../../hooks";
import { calcBgChange, calcColorChange, formatCryptoData } from "../../utils";
import cls from "./PopularCryptoList.module.scss";
import { ApiService } from "../../ApiService";
import HorizontalLoader from "../HorizontalLoader";

export default function PopularCryptoList() {
  const [popularCrypto, setPopularCrypto] = useState<CryptoType[]>([]);

  useFetching(
    (signal) => ApiService.getAllCrypto({ signal, limit: 3 }),
    setPopularCrypto,
    []
  );

  if (popularCrypto.length === 0) return <HorizontalLoader />;
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
