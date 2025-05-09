import { useEffect, useState, useCallback } from "react";
import { api } from "../api/axios";
import AuthContext from "./AuthContext";

// AuthProvider component to manage authentication state and logic
const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState(() => {
		// Retrieve auth data from localStorage or initialize to null
		const auth = localStorage.getItem("auth");
		return auth ? JSON.parse(auth) : null;
	});

	// Function to handle user login and update auth state
	const login = async (credentials) => {
		const response = await api.post("/AdminAccount/Login", credentials);
		const { Token, RefreshToken, User } = response.data;

		const newAuth = {
			accessToken: Token,
			refreshToken: RefreshToken,
			user: User,
		};

		// Store auth data in localStorage and update state
		localStorage.setItem("auth", JSON.stringify(newAuth));
		setAuth(newAuth);
	};

	// Function to handle user logout and clear auth state
	const logout = () => {
		setAuth(null);
		localStorage.removeItem("auth");
	};

	// Function to refresh access token using refresh token
	const refreshAccessToken = useCallback(async () => {
		try {
			const res = await api.post("/AdminAccount/RefreshToken", {
				Token: auth?.accessToken,
				RefreshToken: auth?.refreshToken,
			});
			const { Token, RefreshToken } = res.data;

			const updatedAuth = {
				...auth,
				accessToken: Token,
				refreshToken: RefreshToken,
			};

			// Update localStorage and auth state with new tokens
			localStorage.setItem("auth", JSON.stringify(updatedAuth));
			setAuth(updatedAuth);
			return Token;
		} catch (err) {
			console.error("Token refresh failed", err);
			logout();
			throw err;
		}
	}, [auth]);

	// Effect to set up axios interceptors for request and response
	useEffect(() => {
		const requestIntercept = api.interceptors.request.use(
			(config) => {
				if (auth?.accessToken) {
					config.headers[
						"Authorization"
					] = `Bearer ${auth.accessToken}`;
				}
				return config;
			},
			(error) => Promise.reject(error)
		);

		const responseIntercept = api.interceptors.response.use(
			(response) => response,
			async (error) => {
				const prevRequest = error.config;

				if (
					error.response?.status === 401 &&
					!prevRequest._retry &&
					auth?.refreshToken
				) {
					prevRequest._retry = true;
					try {
						const newAccessToken = await refreshAccessToken();
						prevRequest.headers[
							"Authorization"
						] = `Bearer ${newAccessToken}`;
						return api(prevRequest);
					} catch (refreshErr) {
						return Promise.reject(refreshErr);
					}
				}

				return Promise.reject(error);
			}
		);

		// Cleanup function to eject interceptors when component unmounts
		return () => {
			api.interceptors.request.eject(requestIntercept);
			api.interceptors.response.eject(responseIntercept);
		};
	}, [auth, refreshAccessToken]);

	// Provide auth state and functions to children via context
	return (
		<AuthContext.Provider value={{ auth, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;

