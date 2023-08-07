import { useParams } from "react-router-dom";
import { useState } from "react";
import { addComasToStr, calcColorChange, formatCryptoData } from "../../utils";
import AddModal from "../AddModal";
import Button from "../Button";
import cls from "./CryptoInfo.module.scss";
import { ApiService } from "../../ApiService";
import Loader from "../Loader";
import { useFetching } from "../../hooks";
import NotFound from "../NotFound";

export default function CryptoInfo() {
  const [crypto, setCrypto] = useState<CryptoType | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const { id } = useParams();

  useFetching(
    (signal) => {
      if (id) {
        return ApiService.getCryptoById(id, signal);
      }
    },
    (res) => {
      setCrypto(res);
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

  if (loading)
    return (
      <div className={cls.loader}>
        <Loader />
      </div>
    );

  if (!crypto) return <NotFound id={id} />;

  return (
    <div className={cls.info}>
      {" "}
      <div className={cls.primary}>
        <div>
          <div>
            {crypto.name} <span className={cls.symbol}>{crypto.symbol}</span>
          </div>
          <div className={cls.price}>${formatCryptoData(crypto.priceUsd)}</div>
          <div
            className={cls.change}
            style={{ color: calcColorChange(crypto.changePercent24Hr) }}
          >
            {formatCryptoData(crypto.changePercent24Hr)}% (24h)
          </div>
        </div>
        <Button width='170px' height='50px' onClick={openModal}>
          Add to portfolio
        </Button>
      </div>
      <div className={cls.secondary}>
        <div className={cls.row}>
          <span className={cls.text}>VWAP</span>
          {addComasToStr(formatCryptoData(crypto.vwap24Hr))}
        </div>
        <div className={cls.row}>
          <span className={cls.text}>Market cap</span> $
          {addComasToStr(formatCryptoData(crypto.marketCapUsd))}
        </div>
        <div className={cls.row}>
          <span className={cls.text}>Volume</span>$
          {addComasToStr(formatCryptoData(crypto.volumeUsd24Hr))}
        </div>
        <div className={cls.row}>
          <span className={cls.text}>Supply</span>
          {addComasToStr(formatCryptoData(crypto.supply))} {crypto.symbol}
        </div>
        <div className={cls.row}>
          <span className={cls.text}>Max supply</span>
          {addComasToStr(formatCryptoData(crypto.maxSupply))} {crypto.symbol}
        </div>
      </div>
      {open && <AddModal close={closeModal} {...crypto} />}
    </div>
  );
}
