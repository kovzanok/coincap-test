import { useContext, useEffect, useState } from "react";
import Button from "../Button";
import cls from "./AddModal.module.scss";
import { portfolioContext } from "../../providers/PorfolioProvider";

type AddModalProps = {
  name: string;
  symbol: string;
  id: string;
  close: () => void;
};

export default function AddModal({ name, symbol, id, close }: AddModalProps) {
  const [value, setValue] = useState("");
  const { portfolio, setPortfolio, setLastCrypto } =
    useContext(portfolioContext);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const closeModal = () => {
    setValue("");
    close();
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const addedCryptoIndex = portfolio.findIndex((item) => item.id === id);
    if (addedCryptoIndex !== -1) {
      const addedCrypto = portfolio[addedCryptoIndex];
      setPortfolio([
        ...portfolio.slice(0, addedCryptoIndex),
        { id, amount: Number(value) + addedCrypto.amount },
        ...portfolio.slice(addedCryptoIndex + 1),
      ]);
    } else {
      setPortfolio([...portfolio, { id, amount: Number(value) }]);
    }
    setLastCrypto({ id, amount: Number(value) });
    closeModal();
  };

  return (
    <div className={cls.modal}>
      <div className={cls.body}>
        <h1 className={cls.title}>Add {name} to portfolio</h1>
        <form onSubmit={handleSubmit} className={cls.form}>
          <label className={cls.label}>
            <input
              required
              min={0.0001}
              max={10000}
              step='0.0001'
              value={value}
              onChange={(e) => setValue(e.target.value)}
              name='amount'
              className={cls.input}
              type='number'
            />
            <span className={cls.symbol}>{symbol}</span>
          </label>
          <Button>Add crypto</Button>
        </form>
        <div className={cls.button}>
          <Button onClick={closeModal}>Back</Button>
        </div>
      </div>
    </div>
  );
}
