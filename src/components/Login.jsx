
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "../firebase";
import logo from "../assets/images__1_-removebg-preview.png"; // ✅ Your logo

export default function Login() {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [role, setRole] = useState("employee");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }

      const userData = { email, role };
      localStorage.setItem("authUser", JSON.stringify(userData));
      navigate("/");
    } catch (err) {
      setError(err.message);
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
            {isRegister ? "Create your account" : "Please sign in to access your dashboard"}
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
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
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
            {isRegister ? "Sign Up" : "Sign In"}
          </motion.button>
        </form>

        {/* Toggle Sign In / Sign Up */}
        <div className="text-center mt-4">
          <p
            className="text-emerald-700 cursor-pointer text-sm hover:underline"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? "Already have an account? Sign In" : "New user? Create an account"}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
