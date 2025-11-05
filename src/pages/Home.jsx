import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5001/login", { username, password });
      if (res.data.success) {
        alert(res.data.message);
        navigate("/Mainpage");
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      if (err.response && err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert("Server error. Try again later.");
      }
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: "url('/images/bg.jpeg')", 
      }}
    >

      <div className="absolute inset-0 bg-black/25"></div>

      <div className="text-center mb-10 relative z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
          Welcome to Gamma Laundry & Dry Cleaning Center
        </h1>
        <p className="text-gray-100 mt-3 text-lg drop-shadow">
          Quick, Reliable, Affordable Laundry Service
        </p>
      </div>

      <div className="relative z-10 bg-white/95 shadow-2xl rounded-2xl p-8 w-80 md:w-96">
        <h2 className="text-2xl font-semibold text-blue-600 mb-6 text-center">
          Login to Continue
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-left text-gray-700 mb-1">Username</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </div>

          <div>
            <label className="block text-left text-gray-700 mb-1">Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 active:scale-95 transition-transform shadow-md"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline font-semibold">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
