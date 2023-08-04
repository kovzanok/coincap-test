import Button from "../Button";
import cls from "./AddModal.module.scss";

export default function AddModal() {
  const name = "Bitcoin";
  const symbol = "BTC";
  return (
    <div className={cls.modal}>
      <div className={cls["modal__body"]}>
        <h1 className={cls["modal__title"]}>Add {name} to portfolio</h1>
        <form className={cls["modal__form"]}>
          <label className={cls["modal__label"]}>
            <input className={cls["modal__input"]} min={0} type='number' />
            {symbol}
          </label>
          <Button>Add crypto</Button>
        </form>
        <div className={cls["modal__button"]}>
          <Button>Back</Button>
        </div>
      </div>
    </div>
  );
}
