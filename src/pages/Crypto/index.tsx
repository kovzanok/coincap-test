import CryptoHistoryChart from "../../components/CryptoHistoryChart";
import CryptoInfo from "../../components/CryptoInfo";
import cls from "./Crypto.module.scss";

export default function Crypto() {
  return (
    <div className={cls.layout}>
      <CryptoInfo />
      <CryptoHistoryChart />
    </div>
  );
}
