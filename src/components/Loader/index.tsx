import cls from "./Loader.module.scss";

type LoaderProps = {
  width?: string;
  height?: string;
};

export default function Loader({ width, height }: LoaderProps) {
  return <div style={{ width, height }} className={cls.loader}></div>;
}
