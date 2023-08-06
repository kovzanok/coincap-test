import { useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import { portfolioContext } from "../providers/PorfolioProvider";

export default function Layout() {
  const { portfolio, lastCrypto } = useContext(portfolioContext);

  useEffect(() => {
    window.onunload = () => {
      localStorage.setItem("portfolio", JSON.stringify(portfolio));
      localStorage.setItem("lastCrypto", JSON.stringify(lastCrypto));
    };
  }, [portfolio, lastCrypto]);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
