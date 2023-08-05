import { useState, useEffect, useContext } from "react";
import { pageContext } from "../../providers/PageProvider";
import {
  calcColorChange,
  shortenMillionNumber,
  stringToFixed,
} from "../../utils";
import Button from "../Button";
import Container from "../Container";
import cls from "./Table.module.scss";
import { useNavigate } from "react-router-dom";
import AddModal from "../AddModal";
import { ApiService } from "../../ApiService";
import Loader from "../Loader";

type CryptoData = Pick<CryptoType, "name" | "symbol" | "id">;

export default function Table() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [cryptoData, setCryptoData] = useState<CryptoData>({
    name: "",
    symbol: "",
    id: "",
  });
  const [cryptoArr, setCryptoArr] = useState<CryptoType[]>([]);
  const [loading, setLoading] = useState(true);
  const { page, setPage } = useContext(pageContext);

  useEffect(() => {
    ApiService.getAllCrypto(page).then((res) => {
      setCryptoArr(res);
      setLoading(false);
    });
  }, [page]);

  const openModal = ({ name, symbol, id }: CryptoData) => {
    setOpen(true);
    setCryptoData({ name, id, symbol });
  };

  const closeModal = () => {
    setOpen(false);
    setCryptoData({ name: "", id: "", symbol: "" });
  };

  return (
    <main>
      <Container className={cls.container}>
        <h1>Today's Cryptocurrency Prices</h1>
        <div className={cls.wrapper}>
          <table className={cls.table}>
            {loading ? (
              <Loader />
            ) : (
              <>
                {" "}
                <thead>
                  <tr className={cls.row}>
                    <th className={cls["head-cell"]}>#</th>
                    <th className={cls["head-cell"]}>Name</th>
                    <th className={cls["head-cell"]}>Price USD</th>
                    <th className={cls["head-cell"]}>24h %</th>
                    <th className={cls["head-cell"]}>VWAP</th>
                    <th className={cls["head-cell"]}>Market Cap USD</th>
                    <th className={cls["head-cell"]}>Volume(24h)</th>
                    <th className={cls["head-cell"]}>Supply</th>
                    <th className={cls["head-cell"]}>Max supply</th>
                    <th className={cls["head-cell"]}>Add</th>
                  </tr>
                </thead>
                <tbody>
                  {cryptoArr.map(
                    ({
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
                    }) => (
                      <tr
                        onClick={() => navigate(id)}
                        className={cls.row}
                        key={id}
                      >
                        <td className={cls.cell}>{rank}</td>
                        <td className={cls.cell}>
                          {name}
                          <span className={cls["cell__symbol"]}>{symbol}</span>
                        </td>
                        <td className={cls.cell}>
                          {stringToFixed(priceUsd, 6)} $
                        </td>
                        <td
                          className={cls.cell}
                          style={{
                            color: calcColorChange(changePercent24Hr),
                          }}
                        >
                          {stringToFixed(changePercent24Hr, 2)} %
                        </td>
                        <td className={cls.cell}>
                          {stringToFixed(vwap24Hr, 2)}
                        </td>
                        <td className={cls.cell}>
                          {shortenMillionNumber(marketCapUsd)} $
                        </td>
                        <td className={cls.cell}>
                          {shortenMillionNumber(volumeUsd24Hr)} $
                        </td>

                        <td className={cls.cell}>
                          {shortenMillionNumber(supply)}
                        </td>
                        <td className={cls.cell}>
                          {Number(maxSupply)
                            ? `${shortenMillionNumber(maxSupply)} ${symbol}`
                            : "-"}
                        </td>
                        <td className={cls.cell}>
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              openModal({ name, symbol, id });
                            }}
                          >
                            +
                          </Button>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </>
            )}
          </table>
        </div>
        <div className={cls.pagination}>
          <Button onClick={() => setPage(page - 1)} disabled={page === 0}>
            {"<"}
          </Button>
          Page#{page + 1}
          <Button onClick={() => setPage(page + 1)}>{">"}</Button>
        </div>
      </Container>
      <AddModal close={closeModal} {...cryptoData} opened={open} />
    </main>
  );
}
