import React, { useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

// Initial errors state
const INITIAL_ERRORS = {
	IncorrectUserName: false,
	IncorrectPassword: false,
	Message: "",
};

// Initial/accepted credentials
const INITIAL_USERDATA = {
	UserName: "react@test.com",
	Password: "playful009",
};

const LoginPage = () => {
	// State for handling user credentials form
	const [userData, setUserData] = useState(INITIAL_USERDATA);
	// State for handling form validation errors
	const [errors, setErrors] = useState(INITIAL_ERRORS);
	// State to manage form submission processing
	const [isProcessing, setIsProcessing] = useState(false);
	// Function to login user from auth context
	const { login } = useAuth();
	// Hook for page navigation
	const navigate = useNavigate();

	// Form submission handler
	const handleSubmit = async (event) => {
		event.preventDefault();

		// Initialize success flag
		let success = true;

		// Handle login process
		try {
			setIsProcessing(true);
			await login(userData);
		} catch (error) {
			// Destructure error response attributes
			const { IncorrectPassword, IncorrectUserName, Message, Success } = error.response.data;
			// Update error state
			setErrors({ IncorrectPassword, IncorrectUserName, Message });
			success = Success;
		} finally {
			setIsProcessing(false);
		}

		// Redirect on successful login
		if (success) {
			setErrors(INITIAL_ERRORS);
			navigate("/dashboard");
		}
	};

	// Input change handler
	const handleChange = (event) => {
		const { name, value } = event.target;
		setUserData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	return (
		<section className="h-screen flex justify-center items-center p-5">
			<div className="max-w-xl w-full mx-auto">
				<h1 className="font-bold text-4xl text-center mb-10">Login</h1>

				{/* Display error message if present */}
				<div
					className={`transition-all duration-300 origin-top mb-3 text-nowrap text-sm text-rose-500 flex items-center justify-center ${
						errors.Message ? "h-4 " : "h-0 translate-x-full"
					}`}
				>
					{errors.Message}
				</div>

				{/* Login form */}
				<form
					onSubmit={handleSubmit}
					autoComplete="off"
					className="space-y-3"
				>
					{/* Input field for username */}
					<InputField
						name="UserName"
						label="Email"
						type="email"
						placeholder="Enter your email"
						value={userData.UserName}
						onChange={handleChange}
						disabled={isProcessing}
					/>

					{/* Input field for password */}
					<InputField
						name="Password"
						label="Password"
						type="password"
						placeholder="Enter your password"
						value={userData.Password}
						onChange={handleChange}
						disabled={isProcessing}
					/>

					{/* Submit button */}
					<Button
						type="submit"
						label="Login"
						className={`w-full ${
							isProcessing && "ring-4 cursor-progress"
						}`}
						disabled={isProcessing}
					/>
				</form>
			</div>
		</section>
	);
};

export default LoginPage;