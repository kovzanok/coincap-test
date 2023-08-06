import { useContext, useState } from "react";
import Button from "../Button";
import cls from "./AddModal.module.scss";
import { portfolioContext } from "../../providers/PorfolioProvider";

type AddModalProps = {
  opened: boolean;
  name: string;
  symbol: string;
  id: string;
  close: () => void;
};

export default function AddModal({
  name,
  symbol,
  id,
  opened,
  close,
}: AddModalProps) {
  const [value, setValue] = useState("");
  const { portfolio, setPortfolio, setLastCrypto } =
    useContext(portfolioContext);

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

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  if (!opened) return null;

  return (
    <div className={cls.modal}>
      <div className={cls.body}>
        <h1 className={cls.title}>Add {name} to portfolio</h1>
        <form onSubmit={handleSubmit} className={cls.form}>
          <label className={cls.label}>
            <input
              step='any'
              name='amount'
              value={value}
              onChange={handleChange}
              className={cls.input}
              min={0}
              type='number'
            />
            {symbol}
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
