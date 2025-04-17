import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold text-red-600 mb-4">404</h1>
        <p className="text-lg text-gray-700">Oops! Page not found.</p>
        <p className="text-sm text-gray-500 mt-2">
          The page you're looking for doesn't exist or was moved.
        </p>   
        <Link
        to="/builder"
        className="text-blue-600 hover:underline font-semibold"
      >
        {" "}
        Go To Home{" "}
      </Link>     
      </div>
    );
  }
  