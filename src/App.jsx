import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import AuthProvider from "./context/AuthProvider";
import ProtectedRoute from "./router/ProtectedRoute";
import GuestRoute from "./router/GuestRoute";

// This is the main App component that sets up the routing for the application
// It uses the AuthProvider to manage the authentication state
// It uses the BrowserRouter to set up the client-side routing
// It uses the Routes component to define the routes for the application
// It uses the Route component to define the individual routes
// It uses the GuestRoute and ProtectedRoute components to protect the routes
function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route
						path="/login"
						element={
							<GuestRoute>
								<LoginPage />
							</GuestRoute>
						}
					/>
					<Route
						path="/dashboard"
						element={
							<ProtectedRoute>
								<DashboardPage />
							</ProtectedRoute>
						}
					/>
					// If the user navigates to any other route, redirect them to the login page
					<Route path="*" element={<Navigate to="/login" />} />
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;

