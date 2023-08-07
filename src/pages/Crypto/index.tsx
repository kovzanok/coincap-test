import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Container from "../../components/Container";
import CryptoHistoryChart from "../../components/CryptoHistoryChart";
import CryptoInfo from "../../components/CryptoInfo";
import cls from "./Crypto.module.scss";

export default function Crypto() {
  const navigate = useNavigate();
  return (
    <>
      <Container>
        <div title='Text' className={cls.layout}>
          <CryptoInfo />
          <CryptoHistoryChart />
        </div>
        <div className={cls.button}>
          <Button onClick={() => navigate("/")}>Back to Main</Button>
        </div>
      </Container>
    </>
  );
}
