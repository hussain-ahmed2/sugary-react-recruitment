import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

/**
 * Redirects the user to the login page if they are not authenticated.
 * Otherwise, renders the protected route.
 */
const ProtectedRoute = ({ children }) => {
	const { auth } = useAuth();
	return auth ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
