import { useNavigate } from "react-router-dom";

function ProfileSecurity() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Security</h1>

      <button
        onClick={handleLogout}
        className="border border-red-500 text-red-500 px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}

export default ProfileSecurity;