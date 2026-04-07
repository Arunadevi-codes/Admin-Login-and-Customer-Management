import React, { useState } from "react";
import API from "../services/api";
import { setToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Form Validation
    if (!username || !password) {
      setError("Username and Password are required");
      return;
    }

    try {

      const res = await API.post("/auth/login", {
        username,
        password
      });

      setToken(res.data.token);
      navigate("/dashboard");

    } catch (error) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">

      {/* LEFT SIDE LOGIN */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100 p-6">

        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">

          {/* LOGO */}
          <div className="text-center mb-6">

            <div className="flex justify-center mb-4">
              <img
                src="/images/logo.png"
                alt="InApp Logo"
                className="w-40 h-auto"
              />
            </div>

            <p className="text-gray-600">
              Sign in to your account
            </p>

          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">
              {error}
            </p>
          )}

          {/* FORM */}
          <form onSubmit={handleLogin} className="space-y-5">

            {/* USERNAME */}
            <div>

              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>

              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            {/* PASSWORD */}
            <div>

              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-md transition"
            >
              Sign in
            </button>

          </form>

        </div>

      </div>


      {/* RIGHT SIDE IMAGE */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50 p-6">

        <img
          src="/images/login_image.jpg"
          alt="Worker"
          className="w-full max-w-md h-auto object-cover rounded-2xl shadow-lg"
        />

      </div>

    </div>
  );
};

export default Login;