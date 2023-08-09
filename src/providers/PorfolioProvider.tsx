import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";

type PortfolioContext = {
  portfolio: PortfolioCrypto[];
  setPortfolio: Dispatch<SetStateAction<PortfolioCrypto[]>>;
};

const portfolioStr = localStorage.getItem("coincap-portfolio");

const initialPortfolio = portfolioStr
  ? (JSON.parse(portfolioStr) as PortfolioCrypto[])
  : [];

const contextInitialValue: PortfolioContext = {
  portfolio: initialPortfolio,
  setPortfolio: () => {},
};

export const portfolioContext =
  createContext<PortfolioContext>(contextInitialValue);

export default function PortfolioProvider({ children }: PropsWithChildren) {
  const [portfolio, setPortfolio] =
    useState<PortfolioCrypto[]>(initialPortfolio);

  const { Provider } = portfolioContext;
  return <Provider value={{ portfolio, setPortfolio }}>{children}</Provider>;
}
