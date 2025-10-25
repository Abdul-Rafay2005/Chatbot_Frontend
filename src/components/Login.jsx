

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images__1_-removebg-preview.png"; // ✅ Import your logo image

// Mock login logic
const mockLogin = ({ role, username, password }) => {
  if (role === "admin" && username === "rameez" && password === "rameez123") {
    return { success: true, role: "admin", userId: "admin-rameez" };
  }
  if (role === "employee" && username === "user" && password === "user123") {
    return { success: true, role: "employee", userId: "employee-user" };
  }
  return { success: false };
};

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("employee");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const result = mockLogin({ role, username, password });

    if (result.success) {
      const userData = { username, role: result.role, userId: result.userId };
      localStorage.setItem("mockAuth", JSON.stringify(userData));
      navigate("/"); // redirect to home
    } else {
      setError("Invalid credentials. Try admin/rameez123 or user/user123");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-800 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute w-[400px] h-[400px] bg-emerald-600 rounded-full opacity-20 blur-[150px] top-[-150px] left-[-150px]" />
      <div className="absolute w-[300px] h-[300px] bg-teal-500 rounded-full opacity-20 blur-[120px] bottom-[-100px] right-[-100px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="z-10 w-full max-w-md p-10 bg-white rounded-3xl shadow-2xl border border-gray-100"
      >
        {/* ✅ Logo Section */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <img
            src={logo}
            alt="CETE Logo"
            className="w-28 h-auto drop-shadow-[0_0_8px_rgba(0,132,61,0.3)]"
          />
        </motion.div>

        {/* Title & Subtitle */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-emerald-800 mb-2">
            THE AGHA KHAN UNIVERSITY
          </h2>
          <p className="text-gray-500 text-sm">
            Please sign in to access your dashboard
          </p>
        </div>

        {/* Role Tabs */}
        <div className="flex border border-gray-300 rounded-lg overflow-hidden mb-5">
          {["Employee", "Admin"].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setRole(tab.toLowerCase())}
              className={`flex-1 py-2 font-medium transition-colors ${
                role === tab.toLowerCase()
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-white text-gray-600 hover:bg-emerald-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-700 outline-none text-gray-800 placeholder-gray-400"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-700 outline-none text-gray-800 placeholder-gray-400"
          />

          {error && (
            <p className="text-red-600 bg-red-100 border border-red-300 rounded-lg p-2 text-sm text-center">
              {error}
            </p>
          )}

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-emerald-700 text-white p-3 rounded-lg font-semibold shadow-md hover:bg-emerald-800 transition"
          >
            Sign In
          </motion.button>
        </form>

        {/* Demo Credentials */}
        <div className="text-sm text-gray-600 text-center mt-6">
          <p>Demo Credentials:</p>
          <p className="font-mono mt-1">
            user / user123 <span className="text-gray-400">|</span> rameez /
            rameez123
          </p>
        </div>
      </motion.div>
    </div>
  );
}
