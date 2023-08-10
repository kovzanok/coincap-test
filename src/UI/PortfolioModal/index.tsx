import { useContext, useEffect } from "react";
import Button from "../../UI/Button";
import cls from "./PorfolioModal.module.scss";
import { portfolioContext } from "../../providers/PorfolioProvider";
import { formatCryptoData, getPorfolioSum } from "../../utils";

type PortfolioModalProps = {
  toggleModal: () => void;
};

export default function PortfolioModal({ toggleModal }: PortfolioModalProps) {
  const { portfolio, setPortfolio } = useContext(portfolioContext);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const sum = getPorfolioSum(portfolio);

  const removeCrypto = (id: string) => {
    setPortfolio(portfolio.filter((item) => item.id !== id));
  };

  let content;

  if (portfolio.length === 0) {
    content = <div className={cls.empty}>Portfolio is empty.</div>;
  } else {
    content = (
      <>
        <h2 className={cls.sum}>Total: ${formatCryptoData(String(sum))}</h2>
        <ul className={cls.list}>
          {portfolio.map(({ name, symbol, priceUsd, amount, id }) => (
            <li className={cls.item} key={id}>
              <div className={cls.info}>
                <div className={cls.name}>{name}</div>
                <div className={cls.price}>${formatCryptoData(priceUsd)}</div>
              </div>
              <div>
                <div className={cls.amount}>
                  {amount} {symbol}
                </div>
                <div className={cls.total}>
                  ${formatCryptoData(String(+priceUsd * amount))}
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
        <Button width='80px' height='40px' onClick={toggleModal}>
          Back
        </Button>
      </div>
    </div>
  );
}
