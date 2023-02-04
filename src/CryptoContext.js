import React, { createContext, useState, useContext, useEffect } from "react";
/* export */ const Crypto = createContext();
const CryptoContext = ({ children }) => {
  /* what is children here */
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");
  //   useEffect(() => {
  //     currency === "INR" ? setSymbol("₹") : setSymbol("$");
  //   }, [currency]);
  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");
  }, [currency]);
  return (
    <Crypto.Provider value={{ currency, symbol, setCurrency }}>
      {children}
    </Crypto.Provider>
  );
};
export const CryptoState = () => useContext(Crypto);

export default CryptoContext;
