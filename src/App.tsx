import React from "react";

import AppRouter from "./routes/AppRouter";
import MainHeader from "./components/Navigation/MainHeader";
import Footer from "./components/Footer/Footer";

import "./App.css";

function App() {
  return (
    <>
      <MainHeader />
      <AppRouter />
      <Footer>
        <p style={{ height: 50 }}></p>
      </Footer>
    </>
  );
}

export default App;
