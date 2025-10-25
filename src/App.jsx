import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login.jsx";
import Home from "./components/Home.jsx";
import ChatPage from "./components/ChatPage.jsx";
import { getCurrentUser } from "./utils/auth.js";

export default function App() {
  const PrivateRoute = ({ children }) => {
    return getCurrentUser() ? children : <Navigate to="/login" replace />;
  };

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
      <Route path="/chat/:chatId?" element={<PrivateRoute><ChatPage /></PrivateRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import Home from "./components/Home.jsx";
// import ChatPage from "./components/ChatPage.jsx";

// export default function App() {
//   return (
//     <Routes>
//       {/* Default route — go directly to Home */}
//       <Route path="/" element={<Home />} />
      
//       {/* Chat page (optional chatId param) */}
//       <Route path="/chat/:chatId?" element={<ChatPage />} />

//       {/* Catch-all redirect */}
//       <Route path="*" element={<Navigate to="/" replace />} />
//     </Routes>
//   );
// }