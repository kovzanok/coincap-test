import { useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import { portfolioContext } from "../providers/PorfolioProvider";

export default function Layout() {
  const { portfolio } = useContext(portfolioContext);

  useEffect(() => {
    window.onunload = () => {
      localStorage.setItem("portfolio", JSON.stringify(portfolio));
    };
  }, [portfolio]);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
