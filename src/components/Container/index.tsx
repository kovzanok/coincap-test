import cls from "./Container.module.scss";
import { PropsWithChildren } from "react";

export default function Container({ children }: PropsWithChildren) {
  return <div className={cls.container}>{children}</div>;
}
