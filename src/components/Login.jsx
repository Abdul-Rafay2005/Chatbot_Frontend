// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";

// // MOCK: Shared key with Home.jsx for user persistence
// const MOCK_AUTH_KEY = "mockAuth";

// // ✅ FIXED: Updated role check to match "employee"
// const login = ({ role, username, password }) => {
//   if (role === "admin" && username === "rameez" && password === "rameez123") {
//     return true;
//   }
//   if (role === "employee" && username === "user" && password === "user123") {
//     return true;
//   }
//   return false;
// };
// // END MOCK

// export default function Login() {
//   const [role, setRole] = useState("employee");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError("");
//     const ok = login({ role, username, password });

//     if (ok) {
//       const userData = { username, role };
//       localStorage.setItem(MOCK_AUTH_KEY, JSON.stringify(userData));
//       navigate("/");
//     } else {
//       setError("Invalid credentials. Try admin/rameez123 or user/user123");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-emerald-800">
//       {/* Background Blobs */}
//       <div className="absolute w-[400px] h-[400px] rounded-full bg-emerald-600 opacity-20 blur-[150px] top-[-150px] left-[-150px] animate-pulse"></div>
//       <div className="absolute w-[300px] h-[300px] rounded-full bg-teal-500 opacity-20 blur-[120px] bottom-[-100px] right-[-100px] animate-pulse"></div>

//       {/* Login Card */}
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="w-full max-w-md p-10 rounded-3xl shadow-2xl bg-white border border-gray-100 relative z-10"
//       >
//         {/* Logo + Heading */}
//         <div className="flex flex-col items-center mb-8">
//           <img
//             src="/src/assets/logo.png"
//             alt="App Logo"
//             className="w-58 h-auto drop-shadow-[0_0_8px_rgba(0,121,54,0.3)] animate-pulse-slow"
//           />
//           <h2 className="mt-4 text-2xl font-semibold text-center bg-gradient-to-r from-emerald-700 to-teal-500 bg-clip-text text-transparent tracking-normal font-sans">
//             Centre of Excellence for Trauma and Emergencies (CETE)
//           </h2>
//         </div>

//         {/* Role Tabs */}
//         <div className="mb-6">
//           <label className="text-sm text-gray-600 mb-2 flex items-center gap-2">
//             Login Role
//           </label>

//           <div className="flex border border-gray-300 rounded-lg overflow-hidden shadow-sm">
//             {["Employee", "Admin"].map((tab) => (
//               <button
//                 key={tab}
//                 type="button"
//                 onClick={() => setRole(tab.toLowerCase())}
//                 className={`flex-1 px-4 py-2 font-medium text-center transition-colors
//                   ${
//                     role === tab.toLowerCase()
//                       ? "bg-emerald-100 text-emerald-800"
//                       : "bg-white text-emerald-700 hover:bg-emerald-50"
//                   }`}
//               >
//                 {tab}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Login Form */}
//         <form onSubmit={handleSubmit} className="space-y-5">
//           <input
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             placeholder="Username"
//             required
//             className="w-full p-3 pl-4 rounded-lg bg-white border border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-emerald-700 outline-none transition shadow-sm"
//           />

//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Password"
//             required
//             className="w-full p-3 pl-4 rounded-lg bg-white border border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-emerald-700 outline-none transition shadow-sm"
//           />

//           {error && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="text-sm font-medium text-red-700 text-center bg-red-100 p-2 rounded-lg border border-red-300"
//             >
//               {error}
//             </motion.div>
//           )}

//           {/* Submit Button */}
//           <motion.button
//             whileHover={{ scale: 1.02, boxShadow: "0 0 15px #047857" }}
//             whileTap={{ scale: 0.98 }}
//             type="submit"
//             className="w-full mt-2 p-3 rounded-lg bg-gradient-to-r from-emerald-700 via-teal-600 to-green-800 text-white font-semibold shadow-xl hover:shadow-emerald-700/50 transition"
//           >
//             Sign in
//           </motion.button>
//         </form>

//         {/* Demo Credentials */}
//         <div className="mt-6 text-sm text-gray-600 text-center">
//           <p>Demo Credentials:</p>
//           <p className="space-x-3 mt-1 font-mono">
//             <strong className="text-teal-700">user/user123</strong>
//             <span className="text-gray-400">|</span>
//             <strong className="text-emerald-700">rameez/rameez123</strong>
//           </p>
//         </div>
//       </motion.div>
//     </div>
//   );
// }


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Shared key with Home.jsx
const MOCK_AUTH_KEY = "mockAuth";

export default function Login() {
  const [role, setRole] = useState("employee");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ Simplified login logic
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Simple if-else login
    if (role === "admin" && username === "rameez" && password === "rameez123") {
      localStorage.setItem(MOCK_AUTH_KEY, JSON.stringify({ username, role }));
      navigate("/");
    } 
    else if (role === "employee" && username === "user" && password === "user123") {
      localStorage.setItem(MOCK_AUTH_KEY, JSON.stringify({ username, role }));
      navigate("/");
    } 
    else {
      setError("❌ Invalid credentials. Try admin/rameez123 or user/user123");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-emerald-800">
      {/* Background Blobs */}
      <div className="absolute w-[400px] h-[400px] rounded-full bg-emerald-600 opacity-20 blur-[150px] top-[-150px] left-[-150px] animate-pulse"></div>
      <div className="absolute w-[300px] h-[300px] rounded-full bg-teal-500 opacity-20 blur-[120px] bottom-[-100px] right-[-100px] animate-pulse"></div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md p-10 rounded-3xl shadow-2xl bg-white border border-gray-100 relative z-10"
      >
        {/* Logo + Heading */}
        <div className="flex flex-col items-center mb-8">
          <img
            src="/src/assets/logo.png"
            alt="App Logo"
            className="w-58 h-auto drop-shadow-[0_0_8px_rgba(0,121,54,0.3)] animate-pulse-slow"
          />
          <h2 className="mt-4 text-2xl font-semibold text-center bg-gradient-to-r from-emerald-700 to-teal-500 bg-clip-text text-transparent tracking-normal font-sans">
            Centre of Excellence for Trauma and Emergencies (CETE)
          </h2>
        </div>

        {/* Role Tabs */}
        <div className="mb-6">
          <label className="text-sm text-gray-600 mb-2 flex items-center gap-2">
            Login Role
          </label>

          <div className="flex border border-gray-300 rounded-lg overflow-hidden shadow-sm">
            {["Employee", "Admin"].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setRole(tab.toLowerCase())}
                className={`flex-1 px-4 py-2 font-medium text-center transition-colors
                  ${
                    role === tab.toLowerCase()
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-white text-emerald-700 hover:bg-emerald-50"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
            className="w-full p-3 pl-4 rounded-lg bg-white border border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-emerald-700 outline-none transition shadow-sm"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full p-3 pl-4 rounded-lg bg-white border border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-emerald-700 outline-none transition shadow-sm"
          />

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm font-medium text-red-700 text-center bg-red-100 p-2 rounded-lg border border-red-300"
            >
              {error}
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: "0 0 15px #047857" }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full mt-2 p-3 rounded-lg bg-gradient-to-r from-emerald-700 via-teal-600 to-green-800 text-white font-semibold shadow-xl hover:shadow-emerald-700/50 transition"
          >
            Sign in
          </motion.button>
        </form>

        {/* Demo Credentials */}
        <div className="mt-6 text-sm text-gray-600 text-center">
          <p>Demo Credentials:</p>
          <p className="space-x-3 mt-1 font-mono">
            <strong className="text-teal-700">user/user123</strong>
            <span className="text-gray-400">|</span>
            <strong className="text-emerald-700">rameez/rameez123</strong>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
