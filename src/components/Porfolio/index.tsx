import { useContext, useState } from "react";
import cls from "./Porfolio.module.scss";
import { portfolioContext } from "../../providers/PorfolioProvider";
import { useFetching } from "../../hooks";
import { ApiService } from "../../ApiService";
import PortfolioModal from "../PortfolioModal";
import Loader from "../Loader";

export default function Portfolio() {
  const [crypto, setCrypto] = useState<
    ({ amount: number } & Pick<CryptoType, "priceUsd" | "id">)[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const { portfolio, lastCrypto } = useContext(portfolioContext);
  const ids = portfolio.map(({ id }) => id);
  useFetching(
    (signal) => ApiService.getAllCrypto({ signal, ids }),
    (res: CryptoType[]) => {
      setCrypto(
        portfolio.length
          ? res.map(({ priceUsd, id }, idx) => ({
              priceUsd,
              id,
              amount: portfolio[idx].amount,
            }))
          : []
      );
      setLoading(false);
    },
    [ids.length, lastCrypto]
  );
  const sum = crypto.reduce(
    (sum, { priceUsd, amount }) => (sum += amount * Number(priceUsd)),
    0
  );

  const lastCryptoObj = crypto.find(({ id }) => id === lastCrypto.id);

  const add = lastCryptoObj
    ? lastCrypto.amount * Number(lastCryptoObj.priceUsd)
    : 0;

  const initialSum = sum - add;
  const diff = (add * 100) / initialSum;

  const toggleModal = () => setOpen(!open);

  return (
    <div onClick={toggleModal} className={cls.portfolio}>
      {loading ? (
        <Loader width='20px' height='20px' />
      ) : (
        <>
          <div className={cls.title}>Your portfolio</div>
          {initialSum === 0 ? (
            <>
              <span className={cls.initial}>$ {sum.toFixed(2)}</span>
            </>
          ) : (
            <>
              <span className={cls.initial}>$ {initialSum.toFixed(2)}</span> +{" "}
              <span className={cls["portfolio__add"]}>{add.toFixed(4)}</span>{" "}
              <span className={cls.diff}>({diff.toFixed(4)}%)</span>
            </>
          )}
          {open && <PortfolioModal toggleModal={toggleModal} />}
        </>
      )}
    </div>
  );
}
