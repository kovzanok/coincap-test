import Container from "../Container";
import PopularCryptoList from "../PopularCryptoList";
import Portfolio from "../Porfolio";
import cls from "./Header.module.scss";

export default function Header() {
  return (
    <header className={cls.header}>
      <Container className={cls['header__container']}>
        <PopularCryptoList />
        <Portfolio />
      </Container>
    </header>
  );
}
