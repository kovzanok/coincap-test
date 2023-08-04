import cls from "./Porfolio.module.scss";

export default function Portfolio() {
  const prevSum = 134.32;
  const add = 2.38;
  const diff = prevSum / (prevSum + add);

  return (
    <div className={cls.portfolio}>
      {prevSum} USD + <span className={cls['portfolio__add']}>{add}</span> ({diff.toFixed(2)}%)
    </div>
  );
}
