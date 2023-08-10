import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import cls from "./Main.module.scss";
import { getPageFromSearchParams } from "../../utils";
import { ApiService } from "../../ApiService";
import { useFetching } from "../../hooks";
import Table from "../../components/Table";
import Loader from "../../components/Loader";
import Paginataion from "../../components/Pagination";
import Container from "../../UI/Container";
import AddModal from "../../UI/AddModal";

export default function Main() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = getPageFromSearchParams(searchParams);
  const [open, setOpen] = useState(false);
  const [cryptoData, setCryptoData] = useState<CryptoData>({
    name: "",
    symbol: "",
    id: "",
    priceUsd: "",
  });
  const [cryptoArr, setCryptoArr] = useState<CryptoType[]>([]);
  const [loading, setLoading] = useState(true);

  useFetching(
    (signal) => ApiService.getAllCrypto({ page, signal }),
    (res) => {
      setCryptoArr(res);
      setLoading(false);
    },
    [page]
  );

  const openModal = ({ name, symbol, id, priceUsd }: CryptoData) => {
    setOpen(true);
    setCryptoData({ name, id, symbol, priceUsd });
  };

  const closeModal = () => {
    setOpen(false);
    setCryptoData({ name: "", id: "", symbol: "", priceUsd: "" });
  };

  const handleNextPage = () => {
    setLoading(true);
    setSearchParams(new URLSearchParams(`page=${page + 2}`));
  };

  const handlePrevPage = () => {
    setLoading(true);
    setSearchParams(new URLSearchParams(`page=${page}`));
  };

  return (
    <>
      <Container className={cls.container}>
        <h1>Today's Cryptocurrency Prices</h1>
        {loading ? (
          <div className={cls.loader}>
            <Loader />
          </div>
        ) : (
          <Table openModal={openModal} cryptoArr={cryptoArr} />
        )}
        <Paginataion
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
          page={page}
        />
      </Container>
      {open && <AddModal close={closeModal} {...cryptoData} />}
    </>
  );
}
