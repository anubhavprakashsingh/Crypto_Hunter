import axios from "axios";
import React, { useEffect, useState } from "react";
import { HistoricalChart } from "../config/api";
import { CryptoState } from "../CryptoContext";
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import { chartDays } from "../config/btnData";
import classnames from "classnames";

const CoinChart = ({ coin }) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const { currency, symbol } = CryptoState();
  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setHistoricData(data.prices);
  };
  useEffect(() => {
    fetchHistoricData();
  }, [currency, days]);
  // console.log(historicData);
  return historicData ? (
    <div className="coin-chart-container">
      <Line
        data={{
          labels: historicData.map((coin) => {
            let date = new Date(coin[0]);
            let time =
              date.getHours() > 12
                ? `${date.getHours() - 12}:${
                    date.getMinutes() < 10
                      ? `0${date.getMinutes()}`
                      : date.getMinutes()
                  } PM`
                : `${date.getHours() < 1 ? 12 : date.getHours()}:${
                    date.getMinutes() < 10
                      ? `0${date.getMinutes()}`
                      : date.getMinutes()
                  } AM`;
            return days === 1 ? time : date.toLocaleDateString();
          }),

          datasets: [
            {
              data: historicData.map((coin) => coin[1]),
              label: `Price in ${currency}`,
              borderColor: "gold",
            },
          ],
        }}
        options={{
          elements: {
            point: {
              radius: 1,
            },
          },
        }}
      />
      <div className="day-btns">
        {chartDays.map((day) => (
          <button
            className={classnames("btn", { selected: days === day.value })}
            key={day.value}
            onClick={() => setDays(day.value)}
          >
            {day.label}
          </button>
        ))}
      </div>
    </div>
  ) : (
    <div>loading...</div>
  );
};

export default CoinChart;
