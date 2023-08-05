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
    <div className={cls.modal}>
      <div className={cls.body}>
        <h1 className={cls.title}>Add {name} to portfolio</h1>
        <form className={cls.form}>
          <label className={cls.label}>
            <input className={cls.input} min={0} type='number' />
            {symbol}
          </label>
          <Button>Add crypto</Button>
        </form>
        <div className={cls.button}>
          <Button onClick={close}>Back</Button>
        </div>
      </div>
    </div>
  );
}
