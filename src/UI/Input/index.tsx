import cls from "./Input.module.scss";

type InputProps = {
  value?: string;
  changeValue?: React.ChangeEventHandler<HTMLInputElement>;
  type?: React.HTMLInputTypeAttribute;
  name?: string;
  min?: number;
  max?: number;
  step?: number | string;
};

export default function Input({
  value,
  changeValue,
  type,
  name,
  max,
  min,
  step,
}: InputProps) {
  return (
    <input
      required
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={changeValue}
      name={name}
      className={cls.input}
      type={type}
    />
  );
}
