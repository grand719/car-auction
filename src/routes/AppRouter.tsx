import React from "react";
import { Route, Routes } from "react-router-dom";

import AddCarPost from "../Cars/AddCarPost";
import CarsPage from "../Cars/CarsPage";
import UserDetailsPage from "../Users/UserDetailsPage";

const AppRouter = () => (
  <main style={{ flexGrow: 1, backgroundColor: "#424141" }}>
    <Routes>
      <Route path="/" element={<CarsPage />} />
      <Route path="/createPost" element={<AddCarPost />} />
      <Route path="/userDetails" element={<UserDetailsPage />} />
    </Routes>
  </main>
);

export default AppRouter;
