import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Chatbot from "../chatbot/Chatbot";

const CommonLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Chatbot />
    </>
  );
};

export default CommonLayout;
