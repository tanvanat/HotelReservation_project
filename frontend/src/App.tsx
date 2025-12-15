import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import HotelListPage from "./pages/HotelListPage";
import HotelDetailPage from "./pages/HotelDetailPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HotelListPage />} />
        <Route path="/hotels/:id" element={<HotelDetailPage />} />
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
};

export default App;
