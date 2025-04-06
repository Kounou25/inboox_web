import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="text-center max-w-md mx-auto">
        <h1 className="text-6xl md:text-8xl font-extrabold text-gray-800 mb-6 animate-bounce">
          404
        </h1>
        <p className="text-2xl md:text-3xl text-gray-600 mb-6 font-medium">
          Oops! Page not found
        </p>
        <p className="text-gray-500 mb-8">
          It seems you've wandered off the path. Let's get you back home!
        </p>
        <a
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold shadow-md hover:shadow-lg"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;