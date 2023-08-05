import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { addComasToStr, calcColorChange, stringToFixed } from "../../utils";
import AddModal from "../AddModal";
import Button from "../Button";
import cls from "./CryptoInfo.module.scss";
import { ApiService } from "../../ApiService";
import Loader from "../Loader";

const initialState: CryptoType = {
  id: "",
  rank: "",
  symbol: "",
  name: "",
  supply: "",
  maxSupply: "",
  marketCapUsd: "",
  volumeUsd24Hr: "",
  priceUsd: "",
  changePercent24Hr: "",
  vwap24Hr: "",
};

export default function CryptoInfo() {
  const [crypto, setCrypto] = useState<CryptoType>(initialState);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      ApiService.getCryptoById(id).then((res) => {
        setCrypto(res);
        setLoading(false);
      });
    }
  }, [id]);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal: React.MouseEventHandler = (e) => {
    setOpen(false);
  };

  if (loading) return <Loader />;
  return (
    <div className={cls.info}>
      <div className={cls.primary}>
        <div>
          <div>
            {crypto.name}{" "}
            <span className={cls.symbol}>{crypto.symbol}</span>
          </div>
          <div className={cls.price}>
            ${stringToFixed(crypto.priceUsd, 4)}
          </div>
          <div
            className={cls.change}
            style={{ color: calcColorChange(crypto.changePercent24Hr) }}
          >
            {stringToFixed(crypto.changePercent24Hr, 2)}% (24h)
          </div>
        </div>
        <Button onClick={openModal}>Add</Button>
      </div>
      <div className={cls.row}>
        <span className={cls.text}>VWAP</span>
        {addComasToStr(stringToFixed(crypto.vwap24Hr, 4))}
      </div>
      <div className={cls.row}>
        <span className={cls.text}>Market cap</span> ${" "}
        {addComasToStr(stringToFixed(crypto.marketCapUsd, 2))}
      </div>
      <div className={cls.row}>
        <span className={cls.text}>Volume</span>${" "}
        {addComasToStr(stringToFixed(crypto.volumeUsd24Hr, 2))}
      </div>
      <div className={cls.row}>
        <span className={cls.text}>Supply</span>
        {addComasToStr(String(Number(crypto.supply)))} {crypto.symbol}
      </div>
      <div className={cls.row}>
        <span className={cls.text}>Max supply</span>
        {addComasToStr(String(Number(crypto.maxSupply)))} {crypto.symbol}
      </div>
      <AddModal close={closeModal} {...crypto} opened={open} />
    </div>
  );
}
