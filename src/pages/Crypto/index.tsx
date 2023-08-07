import { useNavigate } from "react-router-dom";
import CryptoHistoryChart from "../../components/CryptoHistoryChart";
import CryptoInfo from "../../components/CryptoInfo";
import cls from "./Crypto.module.scss";

export default function Crypto() {
  const navigate = useNavigate();
  return (
        <Button onClick={() => navigate("/")}>Back to Main</Button>
  );
}
