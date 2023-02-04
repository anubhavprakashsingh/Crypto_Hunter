import React from "react";
import { useNavigate } from "react-router-dom";
import { /* Crypto, */ CryptoState } from "../CryptoContext";

const Header = () => {
  const navigate = useNavigate();
  const { currency, setCurrency } = CryptoState();
  // const { currency, setCurrency } = useContext(Crypto);

  return (
    <div className="Header">
      <div className="title" onClick={() => navigate("/")}>
        Crypto Hunter
      </div>
      <div className="select">
        <select
          name=""
          id=""
          value={currency}
          onChange={(e) => {
            setCurrency(e.target.value);
          }}
        >
          <option value="USD">USD</option>
          <option value="INR">INR</option>
        </select>
      </div>
    </div>
  );
};

export default Header;
