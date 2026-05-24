import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../App";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  // AUTH CONTEXT
  const { login } = useAuth();

  const validate = () => {
    const newErrors = {};

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

    if (!emailOk) {
      newErrors.email = "Enter a valid email";
    }

    if (!password) {
      newErrors.password = "Please enter your password";
    }

    if (!role) {
      newErrors.role = "Please select a role";
    }

    return newErrors;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const foundErrors = validate();

    if (Object.keys(foundErrors).length > 0) {
      setErrors(foundErrors);
      return;
    }

    setErrors({});

    // EXTRACT NAME FROM EMAIL
    // example: john@gmail.com => John
    const userName =
      email.split("@")[0].charAt(0).toUpperCase() +
      email.split("@")[0].slice(1);

    // SAVE LOGIN DATA
    login(role, {
  name: userName,
  email: email.trim(),
});

    // REDIRECT
    navigate(`/${role}/dashboard`);
  };

  const roles = [
    { value: "student", label: "Student", icon: "🎓" },
    { value: "teacher", label: "Teacher", icon: "🏫" },
    { value: "professional", label: "Professional", icon: "💼" },
  ];

  return (
    <div className="flex items-center justify-center h-screen bg-(--primary-gradient) px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm">

        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-1">
          Welcome back
        </h2>

        <p className="text-sm text-gray-400 text-center mb-6">
          Log in to continue
        </p>

        <form onSubmit={handleLogin} className="space-y-4">

          {/* EMAIL */}
          <div>
            <input
              type="email"
              placeholder="Email"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? "border-red-400" : "border-gray-300"
              }`}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);

                if (errors.email) {
                  setErrors((prev) => ({
                    ...prev,
                    email: "",
                  }));
                }
              }}
            />

            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 ${
                  errors.password ? "border-red-400" : "border-gray-300"
                }`}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);

                  if (errors.password) {
                    setErrors((prev) => ({
                      ...prev,
                      password: "",
                    }));
                  }
                }}
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((prev) => !prev)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm"
              >
                {showPassword ? "Hide" : "Show"}
              </button>

            </div>

            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password}
              </p>
            )}
          </div>

          {/* ROLE PICKER */}
          <div>

            <p className="text-sm text-gray-500 mb-2">
              Log in as...
            </p>

            <div className="grid grid-cols-3 gap-2">

              {roles.map((r) => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => {
                    setRole(r.value);

                    if (errors.role) {
                      setErrors((prev) => ({
                        ...prev,
                        role: "",
                      }));
                    }
                  }}
                  className={`flex flex-col items-center gap-1 py-3 px-2 rounded-xl border text-sm font-medium transition-all duration-150 ${
                    role === r.value
                      ? "bg-blue-50 border-blue-500 text-blue-600"
                      : "bg-gray-50 border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}
                >
                  <span className="text-xl">
                    {r.icon}
                  </span>

                  {r.label}
                </button>
              ))}

            </div>

            {errors.role && (
              <p className="text-red-500 text-xs mt-1">
                {errors.role}
              </p>
            )}

          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-medium hover:bg-blue-700 active:scale-[0.98] transition-all duration-150"
          >
            Log in
          </button>

        </form>

        <p className="text-sm text-center text-gray-500 mt-4">
          No account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;