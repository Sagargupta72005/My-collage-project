import { useTheme } from "../../context/ThemeContext";

function ProfilePreferences() {
  const { theme, toggleTheme } = useTheme();
  const darkMode = theme === "dark";

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Preferences
      </h1>

      <div className="flex items-center justify-between max-w-md bg-white dark:bg-slate-800 p-4 rounded-lg border dark:border-slate-700">
        <span className="text-gray-700 dark:text-gray-300">
          Dark Mode
        </span>

        <button
          onClick={toggleTheme}
          className={`px-4 py-1 rounded text-sm font-medium transition
            ${
              darkMode
                ? "bg-green-500 text-white"
                : "bg-gray-300 dark:bg-slate-600 text-gray-800 dark:text-gray-200"
            }
          `}
        >
          {darkMode ? "ON" : "OFF"}
        </button>
      </div>
    </div>
  );
}

export default ProfilePreferences;