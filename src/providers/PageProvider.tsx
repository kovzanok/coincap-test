import { createContext, useState, PropsWithChildren } from "react";

type PageContextType = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const initialPageContext: PageContextType = {
  page: 0,
  setPage: () => {},
};

export const pageContext = createContext<PageContextType>(initialPageContext);

export default function PageProvider({ children }: PropsWithChildren) {
  const [page, setPage] = useState(0);
  const { Provider } = pageContext;
  return <Provider value={{ page, setPage }}>{children}</Provider>;
}
