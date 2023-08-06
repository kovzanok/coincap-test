import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";

type PortfolioContext = {
  portfolio: PorfolioCrypto[];
  lastCrypto: PorfolioCrypto;
  setPortfolio: Dispatch<SetStateAction<PorfolioCrypto[]>>;
  setLastCrypto: Dispatch<SetStateAction<PorfolioCrypto>>;
};

const portfolioStr = localStorage.getItem("portfolio");
const lastCryptoStr = localStorage.getItem("lastCrypto");

const initialPortfolio = portfolioStr
  ? (JSON.parse(portfolioStr) as PorfolioCrypto[])
  : [];

const initialLastCrypto = lastCryptoStr
  ? (JSON.parse(lastCryptoStr) as PorfolioCrypto)
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
    useState<PorfolioCrypto[]>(initialPortfolio);
  const [lastCrypto, setLastCrypto] =
    useState<PorfolioCrypto>(initialLastCrypto);
  const { Provider } = portfolioContext;
  return (
    <Provider value={{ portfolio, setPortfolio, lastCrypto, setLastCrypto }}>
      {children}
    </Provider>
  );
}
