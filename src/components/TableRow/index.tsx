import { useNavigate } from "react-router-dom";
import cls from "./TableRow.module.scss";
import {
  calcColorChange,
  formatCryptoData,
  shortenMillionNumber,
} from "../../utils";
import Button from "../../UI/Button";

type TableRowProps = {
  openModal: (data: CryptoData) => void;
  crypto: CryptoType;
};

export default function TableRow({
  crypto: {
    id,
    symbol,
    name,
    rank,
    priceUsd,
    supply,
    maxSupply,
    marketCapUsd,
    volumeUsd24Hr,
    changePercent24Hr,
    vwap24Hr,
  },
  openModal,
}: TableRowProps) {
  const navigate = useNavigate();
  return (
    <tr onClick={() => navigate(id)} className={cls.row} key={id}>
      <td className={cls.cell}>{rank}</td>
      <td className={cls.cell}>
        {name}
        <span className={cls["cell__symbol"]}>{symbol}</span>
      </td>
      <td className={cls.cell}>{formatCryptoData(priceUsd)}$</td>
      <td
        className={cls.cell}
        style={{
          color: calcColorChange(changePercent24Hr),
        }}
      >
        {formatCryptoData(changePercent24Hr)}%
      </td>
      <td className={cls.cell}>{formatCryptoData(vwap24Hr)}</td>
      <td className={cls.cell}>{shortenMillionNumber(marketCapUsd)}$</td>
      <td className={cls.cell}>{shortenMillionNumber(volumeUsd24Hr)}$</td>

      <td className={cls.cell}>
        {shortenMillionNumber(supply)} {symbol}
      </td>
      <td className={cls.cell}>
        {Number(maxSupply)
          ? `${shortenMillionNumber(maxSupply)} ${symbol}`
          : "-"}
      </td>
      <td className={cls.cell}>
        <Button
          width='1px'
          height='20px'
          onClick={(e) => {
            e.stopPropagation();
            openModal({ priceUsd, name, id, symbol });
          }}
        >
          +
        </Button>
      </td>
    </tr>
  );
}
