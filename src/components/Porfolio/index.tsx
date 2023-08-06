import { useContext, useState } from "react";
import cls from "./Porfolio.module.scss";
import { portfolioContext } from "../../providers/PorfolioProvider";
import { useFetching } from "../../hooks";
import { ApiService } from "../../ApiService";
import PortfolioModal from "../PortfolioModal";
import Loader from "../Loader";

type PorfolioCryptoCostInfo = { amount: number } & Pick<
  CryptoType,
  "priceUsd" | "id"
>;

export default function Portfolio() {
  const { portfolio, lastCrypto } = useContext(portfolioContext);
  const ids = portfolio.map(({ id }) => id);
  const [crypto, setCrypto] = useState<PorfolioCryptoCostInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  useFetching(
    (signal) => {
      setLoading(true);
      if (ids.length === 0) return Promise.resolve([]);
      return ApiService.getAllCrypto({ signal, ids, limit: "max" });
    },
    (res: CryptoType[]) => {
      const newCryptoList = portfolio.length ? res.map(getCryptoCostInfo) : [];
      setCrypto(newCryptoList);
      setLoading(false);
    },
    [ids.length, lastCrypto]
  );

  function getCryptoCostInfo({
    priceUsd,
    id,
  }: CryptoType): PorfolioCryptoCostInfo {
    const portfolioInfo = portfolio.find(
      (item) => item.id === id
    ) as PortfolioCrypto;
    return {
      priceUsd,
      id,
      amount: portfolioInfo.amount,
    };
  }

  const sum = crypto.reduce(
    (sum, { priceUsd, amount }) => (sum += amount * Number(priceUsd)),
    0
  );
  const lastCryptoCost = crypto.find(({ id }) => id === lastCrypto.id);
  const add = lastCryptoCost
    ? lastCrypto.amount * Number(lastCryptoCost.priceUsd)
    : 0;
  const initialSum = sum - add;
  const diff = (add * 100) / initialSum;
  const toggleModal = () => {
    setOpen(!open);
  };

  const content = (
    <>
      <div className={cls.title}>Your portfolio</div>
      {initialSum === 0 ? (
        <span className={cls.initial}>${sum.toFixed(2)}</span>
      ) : (
        <>
          <span className={cls.initial}>${initialSum.toFixed(2)}</span> +{" "}
          <span className={cls["portfolio__add"]}>{add.toFixed(4)}</span>{" "}
          <span className={cls.diff}>({diff.toFixed(4)}%)</span>
        </>
      )}
    </>
  );

  return (
    <div>
      {loading ? (
        <Loader width='37px' height='37px' />
      ) : (
        <div onClick={toggleModal} className={cls.portfolio}>
          {content}
        </div>
      )}
      {open && <PortfolioModal toggleModal={toggleModal} />}
    </div>
  );
}
