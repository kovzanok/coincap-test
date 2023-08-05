import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";

type PortfolioContext = {
  portfolio: PorfolioCrypto[];
  setPortfolio: Dispatch<SetStateAction<PorfolioCrypto[]>>;
};

const portfolioStr = localStorage.getItem("portfolio");
const initialPortfolio = portfolioStr
  ? (JSON.parse(portfolioStr) as PorfolioCrypto[])
  : [];

const contextInitialValue: PortfolioContext = {
  portfolio: initialPortfolio,
  setPortfolio: () => {},
};

export const portfolioContext =
  createContext<PortfolioContext>(contextInitialValue);

export default function PortfolioProvider({ children }: PropsWithChildren) {
  const [portfolio, setPortfolio] = useState<PorfolioCrypto[]>(initialPortfolio);
  const { Provider } = portfolioContext;
  return <Provider value={{ portfolio, setPortfolio }}>{children}</Provider>;
}
