import TableRow from "../TableRow";
import cls from "./Table.module.scss";

type TableProps = {
  cryptoArr: CryptoType[];
  openModal: (data: CryptoData) => void;
};

export default function Table({ cryptoArr, openModal }: TableProps) {
  const tableHead: string[] = [
    "#",
    "Name",
    "Price USD",
    "24h %",
    "VWAP",
    "Market Cap USD",
    "Volume(24h)",
    "Supply",
    "Max supply",
    "Add",
  ];

  return (
    <>
      <table className={cls.table}>
        <thead>
          <tr className={cls.row}>
            {tableHead.map((headerName, idx) => (
              <th key={idx} className={cls["head-cell"]}>
                {headerName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cryptoArr.map((crypto) => (
            <TableRow key={crypto.id} openModal={openModal} crypto={crypto} />
          ))}
        </tbody>
      </table>
    </>
  );
}
