import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import ProfessionalDashboard from "./pages/ProfessionalDashboard";

import Profile from "./pages/Profile";
import TaskSection from "./components/tasks/TaskSection";

function App() {
  const role = localStorage.getItem("role");

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

  const ProtectedRoute = ({ children }) => {
    if (!role) return <Navigate to="/" />;
    return children;
  };

  return (
    <div className="selection:bg-yellow-100 bg-white dark:bg-slate-900 min-h-screen transition-colors">
      <Routes>

        {/* Entry */}
        {/* <Route path="/" element={<Signup />} /> */}
        <Route path="/login" element={<Login />} />

        {/* DASHBOARD */}
        <Route
          path="/:role/dashboard"
          element={
            <ProtectedRoute>
              {role === "student" && (
                <StudentDashboard
                  toggleTheme={toggleTheme}
                  theme={theme}
                />
              )}
              {role === "teacher" && (
                <TeacherDashboard
                  toggleTheme={toggleTheme}
                  theme={theme}
                />
              )}
              {role === "professional" && (
                <ProfessionalDashboard
                  toggleTheme={toggleTheme}
                  theme={theme}
                />
              )}
            </ProtectedRoute>
          }
        />

        {/* TASKS */}
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

        {/* PROFILE */}
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

        {/* Fallback */}
        <Route
          path="*"
          element={
            role ? <Navigate to={`/${role}/dashboard`} /> : <Navigate to="/" />
          }
        />

      </Routes>
    </div>
  );
}

export default App;