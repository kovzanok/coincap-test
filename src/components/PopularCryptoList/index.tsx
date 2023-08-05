import { useEffect, useState } from "react";
import { calcBgChange, calcColorChange, stringToFixed } from "../../utils";
import cls from "./PopularCryptoList.module.scss";
import { ApiService } from "../../ApiService";
import HorizontalLoader from "../HorizontalLoader";

export default function PopularCryptoList() {
  const [popularCrypto, setPopularCrypto] = useState<CryptoType[]>([]);

  useEffect(() => {
    ApiService.getAllCrypto(0, 3).then(setPopularCrypto);
  }, []);

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
              <div>${stringToFixed(priceUsd, 3)}</div>
              <div style={{ color: calcColorChange(changePercent24Hr) }}>
                {stringToFixed(changePercent24Hr, 3)}%
              </div>
            </div>
          </li>
        )
      )}
    </ul>
  );
}
