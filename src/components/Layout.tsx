import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import { portfolioContext } from "../providers/PorfolioProvider";
import { useFetching } from "../hooks";
import { ApiService } from "../ApiService";
import PortfolioModal from "../UI/PortfolioModal";
import { nanoid } from "nanoid";

export default function Layout() {
  const { portfolio } = useContext(portfolioContext);
  const [open, setOpen] = useState(false);
  const ids = Array.from(new Set(portfolio.map(({ id }) => id)));
  const [currentCrypto, setCrypto] = useState<PorfolioCryptoCostInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [popularCrypto, setPopularCrypto] = useState<CryptoType[]>([]);

  useEffect(() => {
    window.onunload = () => {
      localStorage.setItem("coincap-portfolio", JSON.stringify(portfolio));
    };
  }, [portfolio]);

  useFetching(
    (signal) => {
      setLoading(true);
      if (ids.length === 0)
        return Promise.all([
          Promise.resolve([]),
          ApiService.getAllCrypto({ signal, limit: 3 }),
        ]);
      return Promise.all([
        ApiService.getAllCrypto({ signal, ids, limit: "max" }),
        ApiService.getAllCrypto({ signal, limit: 3 }),
      ]);
    },
    ([currentPortfolioCrypto, popularCrypto]: [CryptoType[], CryptoType[]]) => {
      setPopularCrypto(popularCrypto);
      const newCryptoList = portfolio.length
        ? currentPortfolioCrypto.map(({ id, priceUsd }) => ({
            id,
            priceUsd,
            portfolioId: nanoid(),
          }))
        : [];
      setCrypto(newCryptoList);
      setLoading(false);
    },
    []
  );

  const toggleModal = () => {
    setOpen(!open);
  };

  return (
    <>
      <Header
        loading={loading}
        currentCrypto={currentCrypto}
        toggleModal={toggleModal}
        popularCrypto={popularCrypto}
      />
      <main>
        <Outlet />
        {open && <PortfolioModal toggleModal={toggleModal} />}
      </main>
    </>
  );
}
