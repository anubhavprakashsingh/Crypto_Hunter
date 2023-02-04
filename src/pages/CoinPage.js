import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../config/api";
import CoinChart from "../components/CoinChart";
import { CryptoState } from "../CryptoContext";
import { numberWithCommas } from "../components/Banner/Carousel";
const CoinPage = () => {
  const { id } = useParams({});
  const [coin, setCoin] = useState();
  const { currency, symbol } = CryptoState();
  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };
  useEffect(() => {
    fetchCoin();
  }, []);
  // console.log(coin);
  if (!coin) {
    return <div>loading...</div>;
  }
  return (
    <div className="coinpage-container">
      <div className="sidebar">
        <img src={coin?.image.large} alt={coin?.symbol} height={200} />
        <h1 style={{ fontSize: 48, textAlign: "center" }}>{coin?.name}</h1>
        <div className="crypto-info">
          <p
            className="desc"
            dangerouslySetInnerHTML={{
              __html: `${coin?.description.en.split(". ")[0]}.`,
            }}
          ></p>
          <ul className="crypto-data">
            <li className="crypto-data-list">
              <span className="data-heading">Rank:</span>{" "}
              {coin?.market_cap_rank}
            </li>
            <li className="crypto-data-list">
              <span className="data-heading">Current Price:</span> {symbol}{" "}
              {numberWithCommas(
                coin?.market_data?.current_price[
                  currency.toLowerCase()
                ].toFixed(2)
              )}
            </li>
            <li className="crypto-data-list">
              <span className="data-heading">Market Cap:</span> {symbol}{" "}
              {numberWithCommas(
                coin?.market_data?.market_cap[currency.toLowerCase()]
                  ?.toString()
                  .slice(0, -6)
              )}
              M
            </li>
          </ul>
        </div>
      </div>
      <hr />
      <CoinChart coin={coin} />
    </div>
  );
};

export default CoinPage;
