import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import cls from "./CryptoHistoryChart.module.scss";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useFetching } from "../../hooks";
import { ApiService } from "../../ApiService";
import Loader from "../Loader";
import { stringToFixed } from "../../utils";

export default function CryptoHistoryChart() {
  const [history, setHistory] = useState<CryptoHistoryTimeStamp[]>([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useFetching(
    (signal) => {
      if (id) {
        return ApiService.getPriceHistoryById(id, signal);
      }
    },
    (res: CryptoHistoryTimeStamp[]) => {
      setHistory(res);
      setLoading(false);
    },
    [id]
  );

  const data = history.map(({ priceUsd, time }) => ({
    price: Number(stringToFixed(priceUsd, 5)),
    time: new Date(time).toISOString().slice(0, 10),
  }));

  return (
    <div className={cls.chart}>
      <h2 className={cls.title}>Price history</h2>
      {loading ? (
        <Loader />
      ) : (
        <ResponsiveContainer width='100%' height={300}>
          <LineChart
            margin={{ right: 0 }}
            width={1000}
            height={300}
            data={data}
          >
            <CartesianGrid/>
            <XAxis tickMargin={10} minTickGap={40} dataKey='time' />
            <Tooltip />
            <YAxis type='number' unit='$' />
            <Line
              dot={false}
              type='monotone'
              dataKey='price'
              stroke='#7979f0'
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
