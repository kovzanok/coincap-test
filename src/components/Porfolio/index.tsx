import { useContext, useState } from "react";
import cls from "./Porfolio.module.scss";
import { portfolioContext } from "../../providers/PorfolioProvider";
import { useFetching } from "../../hooks";
import { ApiService } from "../../ApiService";
import PortfolioModal from "../PortfolioModal";
import Loader from "../Loader";
import {
  calcColorChange,
  formatCryptoData,
  getPorfolioSum,
  shortenMillionNumber,
} from "../../utils";

export default function Portfolio() {
  const { portfolio } = useContext(portfolioContext);
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
    [ids.length]
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

  const initialSum = getPorfolioSum(portfolio);
  const newSum = getPorfolioSum(crypto);
  const diff = newSum - initialSum;
  const percentDiff = (diff * 100) / initialSum;
  const toggleModal = () => {
    setOpen(!open);
  };

  const content = (
    <>
      <div className={cls.title}>Your portfolio</div>
      <span className={cls.initial}>
        ${shortenMillionNumber(String(newSum))}
      </span>
      {initialSum !== 0 && (
        <>
          {diff >= 0 ? " + " : " "}
          <span className={cls["portfolio__add"]}>
            {shortenMillionNumber(String(diff))}
          </span>
          <span style={{ color: calcColorChange(String(diff)) }}>
            ({formatCryptoData(String(percentDiff))}%)
          </span>
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
