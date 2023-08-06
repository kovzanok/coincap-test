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
            data={history.map(({ priceUsd, time }) => ({
              price: +stringToFixed(priceUsd, 3),
              time: new Date(time).toISOString().slice(0, 10),
            }))}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis tickMargin={10} minTickGap={40} dataKey='time' />
            <Tooltip />
            <YAxis
              type='number'
              domain={["dataMin", "dataMax"]}
              tickMargin={1}
              unit='$'
            />
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
