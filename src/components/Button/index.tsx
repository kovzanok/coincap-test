import { PropsWithChildren } from "react";
import cls from "./Button.module.scss";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  onClick,
}: PropsWithChildren<ButtonProps>) {
  return (
    <button className={cls.button} onClick={onClick}>
      {children}
    </button>
  );
}
