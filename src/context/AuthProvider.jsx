import { useState } from "react";
import { api } from "../api/axios";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	const login = async (credentials) => {
		const response = await api.post("/AdminAccount/Login", credentials);

		const { Token, RefreshToken, User } = response.data;

		localStorage.setItem("accessToken", Token);
		localStorage.setItem("refreshToken", RefreshToken);

		setUser(User);
	};

	return (
		<AuthContext.Provider value={{ user, login }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
