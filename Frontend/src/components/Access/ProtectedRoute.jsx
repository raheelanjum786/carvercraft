import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return <div>Loading...</div>; // Or your loading component
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  console.log(allowedRoles, user);

  if (
    allowedRoles &&
    allowedRoles[0].toLowerCase() !== user.role.toLowerCase()
  ) {
    console.log(
      "not allowed",
      allowedRoles[0].toLowerCase() !== user.role.toLowerCase(),
      allowedRoles[0].toLowerCase(),
      user.role.toLowerCase()
    );
    // return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
