import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useParams } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import ProfessionalDashboard from "./pages/ProfessionalDashboard";

import Profile from "./pages/Profile";
import TaskSection from "./components/tasks/TaskSection";

// ✅ Role-based dashboard handler
const RoleBasedDashboard = ({ theme, toggleTheme }) => {
  const { role } = useParams();
  const storedRole = localStorage.getItem("role");

  // 🔒 Not logged in
  if (!storedRole) return <Navigate to="/login" />;

  // 🔒 URL mismatch fix
  if (role !== storedRole) {
    return <Navigate to={`/${storedRole}/dashboard`} />;
  }

  switch (role) {
    case "student":
      return <StudentDashboard theme={theme} toggleTheme={toggleTheme} />;
    case "teacher":
      return <TeacherDashboard theme={theme} toggleTheme={toggleTheme} />;
    case "professional":
      return <ProfessionalDashboard theme={theme} toggleTheme={toggleTheme} />;
    default:
      return <Navigate to="/login" />;
  }
};

function App() {
  // 🔥 GLOBAL THEME STATE
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  // 🔥 APPLY THEME
  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  // 🔥 TOGGLE FUNCTION
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // 🔒 Protected Route
  const ProtectedRoute = ({ children }) => {
    const role = localStorage.getItem("role");
    return role ? children : <Navigate to="/login" />;
  };

  return (
    <div className="selection:bg-yellow-100 bg-white dark:bg-slate-900 min-h-screen transition-colors">
      <Routes>

        {/* ✅ Entry */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ✅ DASHBOARD */}
        <Route
          path="/:role/dashboard"
          element={
            <ProtectedRoute>
              <RoleBasedDashboard
                theme={theme}
                toggleTheme={toggleTheme}
              />
            </ProtectedRoute>
          }
        />

        {/* ✅ TASKS */}
        <Route
          path="/:role/tasks"
          element={
            <ProtectedRoute>
              <TaskSection
                title="My Tasks"
                toggleTheme={toggleTheme}
                theme={theme}
              />
            </ProtectedRoute>
          }
        />

        {/* ✅ PROFILE */}
        <Route
          path="/:role/profile"
          element={
            <ProtectedRoute>
              <Profile
                toggleTheme={toggleTheme}
                theme={theme}
              />
            </ProtectedRoute>
          }
        />

        {/* ✅ Fallback */}
        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>
    </div>
  );
}

export default App;