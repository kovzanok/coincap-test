import { useContext, useState, useEffect } from "react";
import Button from "../Button";
import cls from "./PorfolioModal.module.scss";
import { portfolioContext } from "../../providers/PorfolioProvider";
import { useFetching } from "../../hooks";
import { ApiService } from "../../ApiService";
import { stringToFixed } from "../../utils";
import Loader from "../Loader";

type PortfolioModalProps = {
  toggleModal: () => void;
};

export default function PortfolioModal({ toggleModal }: PortfolioModalProps) {
  const [crypto, setCrypto] = useState<PortfolioCryptoInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const { portfolio, setPortfolio } = useContext(portfolioContext);

  const ids = portfolio.map(({ id }) => id);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);
  useFetching(
    (signal) => {
      if (ids.length === 0) return Promise.resolve([]);
      return ApiService.getAllCrypto({ signal, ids, limit: "max" });
    },
    (res: CryptoType[]) => {
      setCrypto(res.map(getPortfolioCryptoInfo));
      setLoading(false);
    },
    [ids.length]
  );

  function getPortfolioCryptoInfo({
    name,
    symbol,
    priceUsd,
    id,
  }: CryptoType): PortfolioCryptoInfo {
    const portfolioInfo = portfolio.find(
      (item) => item.id === id
    ) as PortfolioCrypto;
    return {
      name,
      symbol,
      priceUsd,
      ...portfolioInfo,
    };
  }

  const sum = crypto.reduce(
    (sum, { priceUsd, amount }) => (sum += amount * Number(priceUsd)),
    0
  );

  const removeCrypto = (id: string) => {
    setPortfolio(portfolio.filter((item) => item.id !== id));
    setLoading(true);
  };

  let content;

  if (loading) {
    content = <Loader />;
  } else if (portfolio.length === 0) {
    content = <div className={cls.empty}>Portfolio is empty.</div>;
  } else {
    content = (
      <>
        <h2 className={cls.sum}>Total: ${sum.toFixed(3)}</h2>
        <ul className={cls.list}>
          {crypto.map(({ name, symbol, priceUsd, amount, id }) => (
            <li className={cls.item} key={id}>
              <div className={cls.info}>
                <div className={cls.name}>{name}</div>
                <div className={cls.price}>${stringToFixed(priceUsd, 3)}</div>
              </div>
              <div>
                <div className={cls.amount}>
                  {amount} {symbol}
                </div>
                <div className={cls.total}>
                  ${stringToFixed(String(+priceUsd * amount), 3)}
                </div>
              </div>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  removeCrypto(id);
                }}
                width='40px'
                height='40px'
              >
                X
              </Button>
            </li>
          ))}
        </ul>
      </>
    );
  }

  return (
    <div className={cls.modal}>
      <div className={cls["modal__body"]}>
        {content}
        <Button onClick={toggleModal}>Back</Button>
      </div>
    </div>
  );
}
