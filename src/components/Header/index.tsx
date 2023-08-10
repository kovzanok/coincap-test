import Container from "../../UI/Container";
import PopularCryptoList from "../PopularCryptoList";
import Portfolio from "../Porfolio";
import cls from "./Header.module.scss";

type HeaderProps = {
  popularCrypto: CryptoType[];
  toggleModal: () => void;
  loading: boolean;
  currentCrypto: PorfolioCryptoCostInfo[];
};

export default function Header({
  loading,
  currentCrypto,
  popularCrypto,
  toggleModal,
}: HeaderProps) {
  return (
    <header className={cls.header}>
      <Container className={cls["header__container"]}>
        <PopularCryptoList popularCrypto={popularCrypto} />
        <Portfolio
          loading={loading}
          currentCrypto={currentCrypto}
          toggleModal={toggleModal}
        />
      </Container>
    </header>
  );
}
