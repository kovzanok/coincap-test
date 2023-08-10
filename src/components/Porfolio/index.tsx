import { useContext } from "react";
import cls from "./Porfolio.module.scss";
import { portfolioContext } from "../../providers/PorfolioProvider";
import Loader from "../Loader";
import {
  calcColorChange,
  formatCryptoData,
  getPorfolioSum,
  shortenMillionNumber,
} from "../../utils";

type PortfolioProps = {
  loading: boolean;
  toggleModal: () => void;
  currentCrypto: PorfolioCryptoCostInfo[];
};

export default function Portfolio({
  toggleModal,
  loading,
  currentCrypto,
}: PortfolioProps) {
  const { portfolio } = useContext(portfolioContext);
  const ids = portfolio.map(({ id }) => id);
  const newSum = ids.reduce((acc, id) => {
    const p = portfolio.find((item) => item.id === id);
    const cr = currentCrypto.find((item) => item.id === id);
    if (p && cr) {
      return acc + p.amount * Number(cr.priceUsd);
    }
    return acc + 0;
  }, 0);

  const oldSum = ids.reduce((acc, id) => {
    const p = portfolio.find((item) => item.id === id);
    const cr = currentCrypto.find((item) => item.id === id);
    if (p && cr) {
      return acc + p.amount * Number(p.priceUsd);
    }
    return acc + 0;
  }, 0);

  const portfolioSum = getPorfolioSum(portfolio);
  const diff = newSum - oldSum;
  const percentDiff = (diff * 100) / portfolioSum;

  return (
    <div>
      {loading ? (
        <Loader width='37px' height='37px' />
      ) : (
        <div onClick={toggleModal} className={cls.portfolio}>
          <div className={cls.title}>Your portfolio</div>
          <span className={cls.initial}>
            ${shortenMillionNumber(String(portfolioSum))}
          </span>
          {newSum !== 0 && diff !== 0 && (
            <>
              {diff > 0 ? " + " : " "}
              <span className={cls["portfolio__add"]}>
                {formatCryptoData(String(diff))}
              </span>
              <span style={{ color: calcColorChange(String(diff)) }}>
                ({formatCryptoData(String(percentDiff))}%)
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
}
