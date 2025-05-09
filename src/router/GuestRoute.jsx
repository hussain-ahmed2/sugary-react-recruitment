import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

/**
 * Redirects the user to the dashboard if they are already authenticated.
 * Otherwise, renders the guest route.
 */
const GuestRoute = ({ children }) => {
	const { auth } = useAuth();
	return auth ? <Navigate to="/dashboard" /> : children;
};

export default GuestRoute;
