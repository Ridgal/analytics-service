/* eslint-disable @typescript-eslint/no-explicit-any */
import dataAdverts from "@/shared/data/dataExpenses.json";
import dataOrders from "@/shared/data/dataOrders.json";
import { formatDateToYMD } from "@/shared/utils/utils";
import { useEffect, useState } from "react";

type DateSumMap = {
  [date: string]: number;
};

const TableComponent = () => {
  const [dates, setDates] = useState<string[]>([]);
  const [orderSums, setOrderSums] = useState<DateSumMap>({});
  const [advertSums, setAdvertSums] = useState<DateSumMap>({});

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

    const uniqueDates = Array.from(
      new Set([...Object.keys(orderMap), ...Object.keys(advertMap)])
    ).sort();

    setDates(uniqueDates);
    setOrderSums(orderMap);
    setAdvertSums(advertMap);
  }, []);


  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-20">
      <table className="w-full text-sm text-left text-gray-500">
        <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-gray-100 dark:text-white dark:bg-gray-800">
          Статистика заказов и рекламы по датам
          <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
            Значения суммируются по `ordersSumRub` и `sum` в рамках одной даты.
          </p>
        </caption>
        <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3"></th>
            {dates.map((date) => (
              <th key={date} className="px-6 py-3">
                {date}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>

          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              Заказы
            </th>
            {dates.map((date) => (
              <td key={date} className="px-6 py-4">
                {orderSums[date]?.toFixed(2) || "—"}
              </td>
            ))}
          </tr>


          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              Реклама
            </th>
            {dates.map((date) => (
              <td key={date} className="px-6 py-4">
                {advertSums[date]?.toFixed(2) || "—"}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export { TableComponent };
