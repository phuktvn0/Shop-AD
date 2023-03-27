import React from "react";
import { useParams } from "react-router-dom";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import EditProductMain from "../components/products/EditProductMain";

const ProductEditScreen = () => {
  const { id } = useParams();
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <EditProductMain productId={id} />
      </main>
    </>
  );
};

export default ProductEditScreen;
