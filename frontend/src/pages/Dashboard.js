import React from "react";
import { logout } from "../utils/auth";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import "../styles/dashboardHome.css";

const Dashboard = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (

    <Layout>

      <div className="dashboard-container">

        <h1 className="dashboard-title">👋 Welcome Admin</h1>
        <p className="dashboard-subtitle">
          Manage your customers and system easily
        </p>

        

        <button
          className="dashboard-btn manage-btn"
          onClick={() => navigate("/customers")}
        >
          Manage Customers
        </button>

        <button
          className="dashboard-btn logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </Layout>
  );
};

export default Dashboard;