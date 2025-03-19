import React from "react";
import Header from "../Components/layout/Header";
import Footer from "../Components/layout/Footer";
import { Outlet } from "react-router-dom";
function Main() {
  return (
    <div>
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  );
}

export default Main;
