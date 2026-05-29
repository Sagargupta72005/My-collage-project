import { createContext, useContext, useEffect, useState } from "react";
import { Routes, Route, Navigate, useParams } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import ProfessionalDashboard from "./pages/ProfessionalDashboard";
import Profile from "./pages/Profile";
import TaskSection from "./components/tasks/TaskSection";
import Analytics from "./pages/Analytics";

// AUTH CONTEXT
export const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

// PROTECTED ROUTE
const ProtectedRoute = ({ children }) => {
  const role = localStorage.getItem("role");

  return role ? children : <Navigate to="/login" replace />;
};

// PUBLIC ROUTE
const PublicRoute = ({ children }) => {
  const role = localStorage.getItem("role");

  return role ? (
    <Navigate to={`/${role}/dashboard`} replace />
  ) : (
    children
  );
};

// ROLE DASHBOARD
const RoleBasedDashboard = ({ theme, toggleTheme }) => {
  const { role } = useParams();

  const storedRole = localStorage.getItem("role");

  if (!storedRole) {
    return <Navigate to="/login" replace />;
  }

  if (role !== storedRole) {
    return (
      <Navigate
        to={`/${storedRole}/dashboard`}
        replace
      />
    );
  }

  switch (role) {
    case "student":
      return (
        <StudentDashboard
          theme={theme}
          toggleTheme={toggleTheme}
        />
      );

    case "teacher":
      return (
        <TeacherDashboard
          theme={theme}
          toggleTheme={toggleTheme}
        />
      );

    case "professional":
      return (
        <ProfessionalDashboard
          theme={theme}
          toggleTheme={toggleTheme}
        />
      );

    default:
      return <Navigate to="/signup" replace />;
  }
};

// LOGOUT BUTTON
export const LogoutButton = ({
  className = "",
}) => {
  const { logout } = useAuth();

  return (
    <button
      onClick={logout}
      className={`text-sm font-medium text-red-500 hover:text-red-600 transition-colors ${className}`}
    >
      Log out
    </button>
  );
};

function App() {

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  const [role, setRole] = useState(
    localStorage.getItem("role") || null
  );

  // APPLY THEME
  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      theme === "dark"
    );

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) =>
      prev === "dark" ? "light" : "dark"
    );
  };

  // LOGIN
  const login = (
    newRole,
    userData = {}
  ) => {

    localStorage.setItem("role", newRole);

    // SAVE USER NAME
    if (userData.name) {
      localStorage.setItem(
        "userName",
        userData.name
      );
    }

    // SAVE USER EMAIL
    if (userData.email) {
      localStorage.setItem(
        "userEmail",
        userData.email
      );
    }

    setRole(newRole);
  };

  // LOGOUT
  const logout = () => {

    localStorage.removeItem("role");

    localStorage.removeItem("userName");

    localStorage.removeItem("userEmail");

    setRole(null);

    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        role,
        login,
        logout,
      }}
    >
      <div className="selection:bg-yellow-100 bg-white min-h-screen transition-colors">

        <Routes>
          {/* ROOT */}
          <Route
            path="/"
            element={
              role ? (
                <Navigate
                  to={`/${role}/dashboard`}
                  replace
                />
              ) : (
                <Navigate
                  to="/login"
                  replace
                />
              )
            }
          />
          {/* LOGIN */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          {/* SIGNUP */}
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />

          {/* DASHBOARD */}
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

          <Route
            path="/:role/analytics"
            element={
              <ProtectedRoute>
                <Analytics
                  toggleTheme={toggleTheme}
                  theme={theme}
                />
              </ProtectedRoute>
            }
          />
          
          {/* FALLBACK */}
          <Route
            path="*"
            element={
              <Navigate
                to="/"
                replace
              />
            }
          />

        </Routes>
      </div>
    </AuthContext.Provider>
  );
}

export default App;