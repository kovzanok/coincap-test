import Button from "../Button";
import cls from "./AddModal.module.scss";

type AddModalProps = {
  opened: boolean;
  name: string;
  symbol: string;
  id: string;
  close: React.MouseEventHandler;
};

export default function AddModal({
  name,
  symbol,
  id,
  opened,
  close,
}: AddModalProps) {
  if (!opened) return null;

  return (
    <div onClick={close} className={cls.modal}>
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
          <Button onClick={close}>Back</Button>
        </div>
      </div>
    </div>
  );
}
