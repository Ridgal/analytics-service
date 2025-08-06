/* eslint-disable @typescript-eslint/no-explicit-any */
import dataAdverts from "@/shared/data/dataExpenses.json";
import dataOrders from "@/shared/data/dataOrders.json";
import { formatDateToYMD } from "@/shared/utils/utils";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type DateSumMap = {
  [date: string]: number;
};

type ChartEntry = {
  date: string;
  orders: number;
  ads: number;
  scaledAds?: number;
};

const ChartComponent = () => {
  const [chartData, setChartData] = useState<ChartEntry[]>([]);

  useEffect(() => {
    const orderMap: DateSumMap = {};
    const advertMap: DateSumMap = {};

    dataOrders.forEach((entry: any) => {
      const cards = entry?.data?.cards ?? [];
      cards.forEach((card: any) => {
        const selected = card?.statistics?.selectedPeriod;
        const previous = card?.statistics?.previousPeriod;
        if (!selected?.begin) return;

        const date = selected.begin.slice(0, 10);
        const sum =
          (selected.ordersSumRub || 0) + (previous?.ordersSumRub || 0);
        orderMap[date] = (orderMap[date] || 0) + sum;
      });
    });

    dataAdverts.forEach((item: any) => {
      const date = formatDateToYMD(item.date);
      advertMap[date] = (advertMap[date] || 0) + (item.sum || 0);
    });

    const allDates = Array.from(
      new Set([...Object.keys(orderMap), ...Object.keys(advertMap)])
    ).sort();

    const combinedData: ChartEntry[] = allDates.map((date) => ({
      date,
      orders: orderMap[date] || 0,
      ads: advertMap[date] || 0,
    }));

    setChartData(combinedData);
  }, []);

  const maxValue = Math.max(
    ...chartData.map((d) => Math.max(d.orders, d.ads)),
    1
  );

  return (
    <div className="w-full h-[500px]">
      <h2 className="text-xl font-semibold text-center mb-4 pb-2 border-b border-gray-200">
        Динамика заказов и рекламных расходов
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis
            domain={[0, maxValue * 1.1]}
            tickFormatter={(value) =>
              new Intl.NumberFormat("ru-RU").format(value)
            }
          />
          <Tooltip
            formatter={(value, name) => [
              new Intl.NumberFormat("ru-RU").format(Number(value)),
              name,
            ]}
            labelFormatter={(label) => `Дата: ${label}`}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="orders"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
            name="Заказы (руб)"
          />
          <Line
            type="monotone"
            dataKey="ads"
            stroke="#f97316"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
            name="Реклама (руб)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export { ChartComponent };
