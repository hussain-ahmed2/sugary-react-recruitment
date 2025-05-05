import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import AuthProvider from "./context/AuthProvider";
import useAuth from "./hooks/useAuth";

const ProtectedRoute = ({ children }) => {
	const { user } = useAuth();
	return user ? children : <Navigate to="/login" />;
};

function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/login" element={<LoginPage />} />
					<Route
						path="/dashboard"
						element={
							<ProtectedRoute>
								<DashboardPage />
							</ProtectedRoute>
						}
					/>
					<Route path="*" element={<Navigate to="/login" />} />
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;
