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
  const { id } = useParams();

  useFetching(
    (signal) => {
      if (id) {
        return ApiService.getPriceHistoryById(id, signal);
      }
    },
    setHistory,
    [id]
  );
  const priceArr = history.map((item) => Math.round(Number(item.priceUsd)));

  return (
    <div className={cls.chart}>
      <h2 className={cls.title}>Price history</h2>
      {history.length === 0 ? (
        <Loader />
      ) : (
        <ResponsiveContainer width='100%' height={300}>
          <LineChart
            margin={{ right: 0 }}
            width={700}
            height={300}
            data={history.map(({ priceUsd, time }) => ({
              price: stringToFixed(priceUsd, 2),
              time: new Date(time).toISOString().slice(0, 10),
            }))}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis tickMargin={10} minTickGap={40} dataKey='time' />
            <Tooltip />
            <YAxis
              tickMargin={10}
              domain={[Math.min(...priceArr), Math.max(...priceArr)]}
              unit='$'
            />
            <Line
              dot={false}
              type='monotone'
              dataKey='price'
              stroke='#6868d9'
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
