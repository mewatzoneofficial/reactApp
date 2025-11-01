import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";

import UserList from "./users/Listing";
import UserCreate from "./users/Create";
import UserEdit from "./users/Edit";

import StaffList from "./staffs/Listing.tsx";
import StaffCreate from "./staffs/Create.tsx";
import StaffEdit from "./staffs/Edit.tsx";

import EmployerList from "./employers/Listing";
import EmployerCreate from "./employers/Create";
import EmployerEdit from "./employers/Edit";

import JobList from "./jobs/Listing";
import JobCreate from "./jobs/Create";
import JobEdit from "./jobs/Edit";

import Setting from "./components/Setting";
import AuthAdmin from "./middleware/AuthAdmin";
import Order from "./components/Order";
import NotFound from "./components/NotFound";
import Dashboard from "./dashboard/Dashboard.js";
import UserProfile from "./dashboard/UserProfile.tsx";
import ChatBox from "./auth/Chat.js";
import Register from "./auth/Register.jsx";
import Login from "./auth/Login.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
              <AuthAdmin>
                <AdminLayout />
              </AuthAdmin>
            }
          >
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="dashboard" element={<Dashboard />} />

          <Route path="users">
            <Route index element={<UserList />} />
            <Route path="create" element={<UserCreate />} />
            <Route path="edit/:id" element={<UserEdit />} />
          </Route>

          <Route path="staffs">
            <Route index element={<StaffList />} />
            <Route path="create" element={<StaffCreate />} />
            <Route path="edit/:id" element={<StaffEdit />} />
          </Route>

          <Route path="employers">
            <Route index element={<EmployerList />} />
            <Route path="create" element={<EmployerCreate />} />
            <Route path="edit/:id" element={<EmployerEdit />} />
          </Route>

          <Route path="jobs">
            <Route index element={<JobList />} />
            <Route path="create" element={<JobCreate />} />
            <Route path="edit/:id" element={<JobEdit />} />
          </Route>

          <Route path="chats" element={<ChatBox />} />
          <Route path="settings" element={<Setting />} />
          <Route path="orders" element={<Order />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
