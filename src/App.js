import React, { useEffect } from "react";
import "./App.css";
import "./responsive.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/productScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderDetailScreen from "./screens/OrderDetailScreen";
import AddProduct from "./screens/AddProduct";
import Login from "./screens/LoginScreen";
import UsersScreen from "./screens/UsersScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import NotFound from "./screens/NotFound";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "./Redux/Actions/ProductActions";
import { listOrders } from "./Redux/Actions/OrderActions";
import { Navigate } from "react-router";

function App() {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const routerGuard = () => {
    const token = window.localStorage.getItem("userInfo");
    return token;
  };

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts());
      dispatch(listOrders());
    }
  }, [dispatch, userInfo]);

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              routerGuard() ? <HomeScreen /> : <Navigate replace to="/login" />
            }
            exact
          />
          <Route
            path="/products"
            element={
              routerGuard() ? (
                <ProductScreen />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route
            path="/orders"
            element={
              routerGuard() ? <OrderScreen /> : <Navigate replace to="/login" />
            }
          />
          <Route
            path="/order/:id"
            element={
              routerGuard() ? (
                <OrderDetailScreen />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route
            path="/addproduct"
            element={
              routerGuard() ? <AddProduct /> : <Navigate replace to="/login" />
            }
          />
          <Route
            path="/users"
            element={
              routerGuard() ? <UsersScreen /> : <Navigate replace to="/login" />
            }
          />
          <Route
            path="/product/:id/edit"
            element={
              routerGuard() ? (
                <ProductEditScreen />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
