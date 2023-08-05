import cls from "./Porfolio.module.scss";

export default function Portfolio() {
  const initialSum = 134.32;
  const add = 2.38;
  const diff = ((add) * 100) / initialSum;

  return (
    <div className={cls.portfolio}>
      <div className={cls.title}>Your portfolio</div>
      <span className={cls.initial}>$ {initialSum}</span> +{" "}
      <span className={cls["portfolio__add"]}>{add}</span>{" "}
      <span className={cls.diff}>{diff.toFixed(2)}%</span>
    </div>
  );
}
