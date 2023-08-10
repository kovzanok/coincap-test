import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Button from "../../UI/Button";
import Container from "../../UI/Container";
import CryptoHistoryChart from "../../components/CryptoHistoryChart";
import CryptoInfo from "../../components/CryptoInfo";
import cls from "./Crypto.module.scss";
import AddModal from "../../UI/AddModal";
import { ApiService } from "../../ApiService";
import Loader from "../../components/Loader";
import { useFetching } from "../../hooks";
import NotFound from "../../components/NotFound";

export default function Crypto() {
  const navigate = useNavigate();
  const [crypto, setCrypto] = useState<CryptoType | null>(null);
  const [history, setHistory] = useState<CryptoHistoryTimeStamp[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const { id } = useParams();

  useFetching(
    async (signal) => {
      if (id) {
        const cryptoPromise = await ApiService.getCryptoById(id, signal);
        const historyPromise = await ApiService.getPriceHistoryById(id, signal);
        return Promise.resolve([cryptoPromise, historyPromise]);
      }
    },
    ([crypto, history]: [CryptoType, CryptoHistoryTimeStamp[]]) => {
      setCrypto(crypto);
      setHistory(history);
      setLoading(false);
    },
    [id]
  );

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  let content: JSX.Element;

  if (loading) {
    content = (
      <div className={cls.loader}>
        <Loader />
      </div>
    );
  } else if (crypto) {
    content = content = (
      <>
        <CryptoInfo crypto={crypto} openModal={openModal} />{" "}
        <CryptoHistoryChart history={history} />
      </>
    );
  } else {
    content = <NotFound id={id} />;
  }

  return (
    <>
      <Container>
        <div title='Text' className={cls.layout}>
          {content}
        </div>
        <div className={cls.button}>
          <Button onClick={() => navigate("/")}>Back to Main</Button>
        </div>
      </Container>
      {open && crypto && <AddModal close={closeModal} {...crypto} />}
    </>
  );
}
