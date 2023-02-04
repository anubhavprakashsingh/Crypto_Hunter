import React, { useEffect, useState, useMemo } from "react";
import { CoinList } from "../config/api.js";
import { CryptoState } from "../CryptoContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { numberWithCommas } from "./Banner/Carousel";
import Pagination from "./Pagination";
const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const { currency, symbol } = CryptoState();
  const [currentPage, setCurrentPage] = useState(1);
  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency)); //why use coinlist instead of trending coins
    setCoins(data);
    setLoading(false);
  };
  useEffect(() => {
    fetchCoins();
  }, [currency]);
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);
  const navigate = useNavigate();
  const PageSize = 10;
  // console.log(coins);
  // const currentTableData = useMemo(() => {
  //   const firstPageIndex = (currentPage - 1) * PageSize;
  //   const lastPageIndex = firstPageIndex + PageSize;
  //   return data.slice(firstPageIndex, lastPageIndex);
  // }, [currentPage]);
  function handleSearch() {
    return coins.filter((coin) => {
      return (
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
      );
    });
  }
  const searchedCoins = useMemo(() => {
    return handleSearch();
  }, [search, []]);
  // const searchedCoins = handleSearch();

  const paginatedCoins = useMemo(() => {
    /* can we return useMemo */
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return searchedCoins.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, /* search, */ []]);

  return (
    <div className="coins-table-container">
      <p style={{ fontSize: 40 }}>Cryptocurrency Prices By Market Cap</p>
      <form>
        <input
          className="search-bar"
          type="text"
          placeholder="Search for a Crypto... "
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      <table className="coins-table-data">
        <thead>
          <tr>
            {["Coin", "Price", "24h Change", "Market Cap"].map((head) => {
              return (
                <th
                  key={head}
                  /* does th has a key attribute */ style={{
                    width: head === "Coin" ? "30vw" : "20vw",
                  }}
                >
                  {head}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {paginatedCoins.map((row) => {
            return (
              <tr onClick={() => navigate(`/coins/${row.id}`)} key={row.name}>
                <td
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    // width: "30vw",
                  }}
                >
                  <img
                    src={row?.image}
                    alt={row.symbol}
                    height="50"
                    style={{ margin: 10 }}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <span style={{ fontSize: 22, textTransform: "uppercase" }}>
                      {row.symbol}
                    </span>
                    <span style={{ fontSize: 14, color: "gray" }}>
                      {row.name}
                    </span>
                  </div>
                </td>
                <td style={{ textAlign: "center" /* , width: "20vw" */ }}>
                  {symbol} {numberWithCommas(row.current_price.toFixed(2))}
                </td>
                <td
                  style={{
                    color:
                      row.price_change_percentage_24h >= 0
                        ? "rgb(0, 175, 73)"
                        : "#ff0000",
                    textAlign: "center",
                    /* width: "20vw", */
                  }}
                >
                  {row.price_change_percentage_24h >= 0 ? "+" : ""}
                  {row.price_change_percentage_24h.toFixed(2)}
                </td>
                <td style={{ textAlign: "center" /* , width: "20vw" */ }}>
                  {symbol}{" "}
                  {numberWithCommas(row.market_cap.toString().slice(0, -6))}M
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={searchedCoins.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default CoinsTable;
