import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [role, setRole] = useState("student"); // default role
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // No validation, just store role
    localStorage.setItem("role", role);

    // Redirect
    navigate(`/${role}/dashboard`);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-xl shadow-md w-80"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

        {/* Role Selection Only */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="professional">Professional</option>
        </select>

        <button className="w-full bg-blue-500 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;