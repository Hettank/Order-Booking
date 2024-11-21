import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateProduct from "./components/Products/CreateProduct";
import UpdateProduct from "./components/Products/UpdateProduct";
import ProductDetails from "./pages/ProductDetails";

import ProtectedRoutes from "./components/ProtectedRoutes";
import Bookings from "./pages/Bookings";
import MyBookings from "./pages/MyBookings";
import BookProduct from "./pages/BookProduct";
import UpdateBooking from "./pages/UpdateBooking";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="products" element={<Products />} />
              <Route
                path="products/create-product"
                element={<CreateProduct />}
              />

              <Route
                path="products/product-details"
                element={<ProductDetails />}
              />

              <Route
                path="products/product-update"
                element={<UpdateProduct />}
              />

              <Route path="bookings" element={<Bookings />} />
              <Route path="my-bookings" element={<MyBookings />} />
              <Route path="book-product" element={<BookProduct />} />
              <Route path="update-booking" element={<UpdateBooking />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
