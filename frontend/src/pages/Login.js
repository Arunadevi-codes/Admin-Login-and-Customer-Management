import React, { useState } from "react";
import API from "../services/api";
import { setToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        username,
        password
      });

      setToken(res.data.token);

      navigate("/dashboard");

    } catch (error) {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">

        <h2>Admin Login</h2>

        <form onSubmit={handleLogin}>

          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>

        </form>

      </div>
    </div>
  );
};

export default Login;