import axios from "axios";
import { useState } from "react";
import { BASEAPIURL } from "../utils";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isProcessing, setIsProcessing] = useState(false);
	const [error, setError] = useState("");

	const login = async (credentials) => {
		try {
			setIsProcessing(true);

			const response = await axios.post(
				`${BASEAPIURL}/AdminAccount/Login`,
				credentials
			);

			const { Token, RefreshToken, User } = response.data;

			localStorage.setItem("accessToken", Token);
			localStorage.setItem("refreshToken", RefreshToken);

			setUser(User);
		} catch (error) {
			setError(error.response.data.Message);
			return false;
		} finally {
			setIsProcessing(false);
		}

		return true;
	};

    const resetError = () => setError('');

	return (
		<AuthContext.Provider value={{ user, login, isProcessing, error, resetError }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
