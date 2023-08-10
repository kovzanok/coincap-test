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

type CryptoHistoryChartProps = {
  history: CryptoHistoryTimeStamp[];
};

export default function CryptoHistoryChart({
  history,
}: CryptoHistoryChartProps) {
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
          <Line
            isAnimationActive={false}
            dot={false}
            type='monotone'
            dataKey='price'
            stroke='#7979f0'
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
