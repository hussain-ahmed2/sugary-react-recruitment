import { useContext } from "react";
import AuthContext from "../context/AuthContext";

// Custom hook to access the authentication context
const useAuth = () => useContext(AuthContext);

export default useAuth;

