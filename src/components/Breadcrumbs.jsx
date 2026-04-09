import { Link, useLocation } from "react-router-dom";

function Breadcrumbs() {
  const location = useLocation();

  // Split path → /student/dashboard → ["student", "dashboard"]
  const pathnames = location.pathname.split("/").filter(Boolean);

  return (
    <div className="bg-white px-4 py-3 rounded-lg shadow mb-4">
      <nav className="text-sm text-gray-600 flex items-center flex-wrap">
        {/* Home */}
        <Link
          to="/"
          className="hover:text-blue-500 font-medium"
        >
          Home
        </Link>

        {pathnames.map((name, index) => {
          const routeTo = "/" + pathnames.slice(0, index + 1).join("/");

          return (
            <span key={routeTo} className="flex items-center">
              <span className="mx-2">/</span>

              <Link
                to={routeTo}
                className="capitalize hover:text-blue-500"
              >
                {name}
              </Link>
            </span>
          );
        })}
      </nav>
    </div>
  );
}

export default Breadcrumbs;