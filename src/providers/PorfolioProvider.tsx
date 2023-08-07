import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";

type PortfolioContext = {
  portfolio: PortfolioCrypto[];
  lastCrypto: PortfolioCrypto;
  setPortfolio: Dispatch<SetStateAction<PortfolioCrypto[]>>;
  setLastCrypto: Dispatch<SetStateAction<PortfolioCrypto>>;
};

const portfolioStr = localStorage.getItem("portfolio");
const lastCryptoStr = localStorage.getItem("lastCrypto");

const initialPortfolio = portfolioStr
  ? (JSON.parse(portfolioStr) as PortfolioCrypto[])
  : [];

const initialLastCrypto = lastCryptoStr
  ? (JSON.parse(lastCryptoStr) as PortfolioCrypto)
  : { id: "", amount: 0 };

const contextInitialValue: PortfolioContext = {
  portfolio: initialPortfolio,
  lastCrypto: initialLastCrypto,
  setPortfolio: () => {},
  setLastCrypto: () => {},
};

export const portfolioContext =
  createContext<PortfolioContext>(contextInitialValue);

export default function PortfolioProvider({ children }: PropsWithChildren) {
  const [portfolio, setPortfolio] =
    useState<PortfolioCrypto[]>(initialPortfolio);
  const [lastCrypto, setLastCrypto] =
    useState<PortfolioCrypto>(initialLastCrypto);
  const { Provider } = portfolioContext;
  return (
    <Provider value={{ portfolio, setPortfolio, lastCrypto, setLastCrypto }}>
      {children}
    </Provider>
  );
}
