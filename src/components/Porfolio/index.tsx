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

  let oldSum = 0;
  let newSum = 0;

  currentCrypto.forEach(({ id, priceUsd }) => {
    const crypto = portfolio.find((item) => item.id === id);
    if (crypto) {
      oldSum += crypto.amount * Number(crypto.priceUsd);
      newSum += crypto.amount * Number(priceUsd);
    }
  });

  const portfolioSum = getPorfolioSum(portfolio);
  const diff = newSum - oldSum;
  const percentDiff = (diff * 100) / portfolioSum;
  console.log(newSum, oldSum);
  console.log(diff);
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
          {diff !== 0 && (
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
