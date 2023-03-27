import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import OrderDetailmain from "../components/orders/OrderDetailmain";
import { useParams } from "react-router";

const OrderDetailScreen = () => {
  const { id } = useParams();
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <OrderDetailmain orderId={id} />
      </main>
    </>
  );
};

export default OrderDetailScreen;
