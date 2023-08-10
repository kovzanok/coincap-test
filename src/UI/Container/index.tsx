import cls from "./Container.module.scss";
import { PropsWithChildren } from "react";

type ContainerProps = {
  className?: string;
};

export default function Container({
  children,
  className = "",
}: PropsWithChildren<ContainerProps>) {
  const classNames = `${className} ${cls.container}`.split(" ");
  return <div className={classNames.join(" ")}>{children}</div>;
}
