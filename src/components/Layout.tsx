import { useContext } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import { portfolioContext } from "../providers/PorfolioProvider";
import { useFetching } from "../hooks";
import { ApiService } from "../ApiService";

export default function Layout() {
  const { portfolio } = useContext(portfolioContext);
  useFetching(
    (signal) => {
      const ids = portfolio.map(({ id }) => id);
      if (ids.length === 0) return Promise.resolve([]);
      return ApiService.getAllCrypto({ signal, ids, limit: "max" });
    },
    (res: CryptoType[]) => {
      const newPortfolioToSave = res.map(({ id, priceUsd }) => {
        const crypto = portfolio.find((crypto) => crypto.id === id);
        if (crypto) return { ...crypto, priceUsd };
      });
      window.onunload = () => {
        localStorage.setItem("portfolio", JSON.stringify(newPortfolioToSave));
      };
    },
    [portfolio]
  );

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
