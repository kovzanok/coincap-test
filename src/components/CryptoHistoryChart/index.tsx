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

  if (loading || !history || !history.length) return null;

  const data = history.map(({ priceUsd, time }) => ({
    price: Number(priceUsd),
    time: new Date(time).toISOString().slice(0, 10),
  }));

  const isSmallNumbers = data.some(({ price }) => {
    Number(price) < 1;
  });

  return (
    <div className={cls.chart}>
      <div className={cls.title}>Price history</div>
      <ResponsiveContainer width='100%' height={300}>
        <LineChart margin={{ right: 0 }} data={data}>
          <CartesianGrid />
          <XAxis tickMargin={10} minTickGap={40} dataKey='time' />
          <Tooltip />
          <YAxis width={isSmallNumbers ? 90 : 60} type='number' unit='$' />
          <Line dot={false} type='monotone' dataKey='price' stroke='#7979f0' />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
