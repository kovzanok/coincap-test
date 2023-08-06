import { useContext, useRef } from "react";
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
  const inputRef = useRef<HTMLInputElement>(null);
  const { portfolio, setPortfolio, setLastCrypto } =
    useContext(portfolioContext);

  const closeModal = () => {
    if (inputRef.current) inputRef.current.value = "";
    inputRef.current?.setCustomValidity("");
    close();
  };

  const validateInput = () => {
    const input = inputRef.current;
    if (!input) return;
    const value = input.value;
    if (value.length === 0) {
      input.setCustomValidity("Amount is required");
    } else if (Number(value) <= 0) {
      input.setCustomValidity("Amount must be greater than zero");
    } else {
      input.setCustomValidity("");
    }
    input.reportValidity();
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    validateInput();
    const input = inputRef.current;
    if (!input) return;
    if (input.validity.valid) {
      const value = input.value;
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
    }
  };

  return (
    <div className={cls.modal}>
      <div className={cls.body}>
        <h1 className={cls.title}>Add {name} to portfolio</h1>
        <form onSubmit={handleSubmit} className={cls.form}>
          <label className={cls.label}>
            <input
              step='any'
              onChange={validateInput}
              name='amount'
              ref={inputRef}
              className={cls.input}
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
