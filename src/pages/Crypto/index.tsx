import CryptoHistoryChart from "../../components/CryptoHistoryChart";
import CryptoInfo from "../../components/CryptoInfo";
import Header from "../../components/Header";
import PortfolioModal from "../../components/PortfolioModal";
import cls from "./Crypto.module.scss";

export default function Crypto() {
  return (
    <>
      <Header />
      <div className={cls.layout}>
        <CryptoInfo />
        <CryptoHistoryChart />
      </div>
      <PortfolioModal/>
    </>
  );
}
