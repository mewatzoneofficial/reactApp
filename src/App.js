import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import AdminLayouts from "./layouts/AdminLayouts";

import Dashboard from "./Dashboard";
import UserList from "./users/Listing";
import UserCreate from "./users/Create";
import UserEdit from "./users/Edit";
import ProductList from "./products/Listing";
import ProductCreate from "./products/Create";
import ProductEdit from "./products/Edit";
import Setting from "./components/Setting";
import StaffList from "./staffs/Listing";
import AuthAdmin from "./middleware/AuthAdmin";
import Login from "./Login";
import Order from "./components/Order";

function App() {

  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthAdmin isAuthenticated={isAuthenticated} />}>
          <Route path="/" element={<AdminLayout />}>
            <Route index element={<Navigate to="/dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users">
              <Route index element={<UserList />} />
              <Route path="create" element={<UserCreate />} />
              <Route path="edit/:id" element={<UserEdit />} />
            </Route>
            <Route path="products">
              <Route index element={<ProductList />} />
              <Route path="create" element={<ProductCreate />} />
              <Route path="edit/:id" element={<ProductEdit />} />
            </Route>
            <Route path="settings" element={<Setting />} />
            <Route path="staffs" element={<StaffList />} />
          </Route>
          <Route path="orders" element={<AdminLayouts />}>
             <Route index element={<Navigate to="/orders" />} />
             <Route path="orders" element={<Order/>} />
          </Route>
        </Route>
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
