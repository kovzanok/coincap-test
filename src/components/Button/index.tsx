import { PropsWithChildren } from "react";
import cls from "./Button.module.scss";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  width?: string;
  height?: string;
};

export default function Button({
  children,
  width,
  height,
  onClick,
}: PropsWithChildren<ButtonProps>) {
  return (
    <button style={{ width, height }} className={cls.button} onClick={onClick}>
      {children}
    </button>
  );
}
