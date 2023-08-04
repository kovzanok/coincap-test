import PopularCryptoList from "../PopularCryptoList";
import Portfolio from "../Porfolio";
import cls from "./Header.module.scss";



export default function Header() {
  return (
    <header className={cls.header}>
      <PopularCryptoList />
      <Portfolio/>
    </header>
  );
}
