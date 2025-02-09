
import { Link, useLocation } from "react-router-dom";
import { Home, BarChart2 } from "lucide-react";

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 glass-card px-6 py-3 z-50">
      <div className="flex gap-8">
        <Link
          to="/"
          className={`flex flex-col items-center transition-colors ${
            location.pathname === "/" ? "text-secondary-500" : "text-white/80 hover:text-white"
          }`}
        >
          <Home className="w-6 h-6" />
          <span className="text-sm">Home</span>
        </Link>
        <Link
          to="/statistics"
          className={`flex flex-col items-center transition-colors ${
            location.pathname === "/statistics" ? "text-secondary-500" : "text-white/80 hover:text-white"
          }`}
        >
          <BarChart2 className="w-6 h-6" />
          <span className="text-sm">Statistics</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
