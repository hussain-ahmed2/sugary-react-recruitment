import React, { useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

const LoginPage = () => {
	const [userData, setUserData] = useState({
		UserName: "react@test.com",
		Password: "playful009",
	});
	const { login, isProcessing, error, resetError } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();

		const success = await login(userData);

		if (success) navigate("/dashboard");
	};

	const handleChange = (event) => {
		setUserData((prev) => ({
			...prev,
			[event.target.name]: event.target.value,
		}));
	};

	return (
		<section className="h-screen flex justify-center items-center">
			<div className="max-w-xl w-full mx-auto">
				<h1 className="font-bold text-4xl text-center mb-10">Login</h1>

				<div
					className={`flex gap-4 items-center justify-center text-rose-500 text-sm mb-2 transition-all duration-300 origin-top ${
						error ? "h-4" : "h-0 opacity-0"
					}`}
				>
					{error}
					{error && (
						<button
							onClick={resetError}
							className="border border-rose-200 group rounded-full p-1 hover:bg-rose-500 transition-colors duration-300"
						>
							<X
								size={22}
								className="group-hover:text-white transition-colors duration-300"
							/>
						</button>
					)}
				</div>
				<form
					onSubmit={handleSubmit}
					autoComplete="off"
					className="space-y-3"
				>
					<InputField
						name="UserName"
						label="Email"
						type="email"
						placeholder="Enter your email"
						value={userData.UserName}
						onChange={handleChange}
					/>
					<InputField
						name="Password"
						label="Password"
						type="password"
						placeholder="Enter your password"
						value={userData.Password}
						onChange={handleChange}
					/>

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
