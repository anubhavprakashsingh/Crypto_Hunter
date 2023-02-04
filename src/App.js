import { Route, Routes } from "react-router-dom";
// import React from "react";
import "./App.css";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import CoinPage from "./pages/CoinPage";
function App() {
  // const useStyles = makeStyles({
  //   App: {
  //     backgroundColor: "#14161a",
  //     color: "white",
  //     minHeight: "100vh",
  //   },
  // });
  // const classes = useStyles();
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/coins/:id" element={<CoinPage />} />
      </Routes>
    </div>
  );
}

export default App;
