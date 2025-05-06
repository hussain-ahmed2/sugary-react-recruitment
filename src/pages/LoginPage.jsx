import React, { useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

// initial errors
const INITIALERRORS = {
	IncorrectUserName: false,
	IncorrectPassword: false,
	Message: "",
};

// initial/accepted credentials
const INITIALUSERDATA = {
	UserName: "react@test.com",
	Password: "playful009",
};

const LoginPage = () => {
	const [userData, setUserData] = useState(INITIALUSERDATA); // state for handling the controlled form for user credentials
	const [errors, setErrors] = useState(INITIALERRORS); // state for error to handling the form validation
	const [isProcessing, setIsProcessing] = useState(false); // state for the form processing duration to disabling the submit operation
	const { login } = useAuth(); // custom hook to get the login function the the authcontext
	const navigate = useNavigate(); // hook for redirection

	// form submit function 
	const handleSubmit = async (event) => {
		event.preventDefault();

		let success = true; // initialize the success is true

		// handle error and states with try catch and finally
		try {
			setIsProcessing(true); // set processing start/true
			await login(userData); // call the login function with the user credentials
		} catch (error) {
			const { IncorrectPassword, IncorrectUserName, Message, Success } = error.response.data; // destructure the error attributes
			setErrors({ IncorrectPassword, IncorrectUserName, Message }); // set the error
			success = Success; // set success to false
		} finally {
			setIsProcessing(false); // set processing end/false
		}

		if (success) { // if success then 
			setErrors(INITIALERRORS); // reset errors
			navigate("/dashboard"); // redirect to the /dashboard
		}
	};

	// function for handling the inputs change event
	const handleChange = (event) => {
		const { name, value } = event.target; // destructure the name and value from event.target
		setUserData((prev) => ({
			...prev, // rest of the previous values
			[name]: value, // update the current changed value
		}));
	};

	return (
		<section className="h-screen flex justify-center items-center">
			<div className="max-w-xl w-full mx-auto">
				<h1 className="font-bold text-4xl text-center mb-10">Login</h1>

				{/* if error show the error message */}
				<div
					className={`transition-all duration-300 origin-top mb-3 text-nowrap text-sm text-rose-500 flex items-center justify-center ${
						errors.Message ? "h-4 " : "h-0 translate-x-full"
					}`}
				>
					{errors.Message}
				</div>

				{/* login form */}
				<form
					onSubmit={handleSubmit}
					autoComplete="off"
					className="space-y-3"
				>
					{/* custom input field for username */}
					<InputField
						name="UserName"
						label="Email"
						type="email"
						placeholder="Enter your email"
						value={userData.UserName} // set initial value 
						onChange={handleChange} // pass the handle change function
						disabled={isProcessing} // if processing make the input field disabled
					/>

					{/* custom input field for password */}
					<InputField
						name="Password"
						label="Password"
						type="password"
						placeholder="Enter your password"
						value={userData.Password} // set initial value
						onChange={handleChange} // pass the handle change function
						disabled={isProcessing} // if processing make the input field disabled
					/>

					{/* custom submit button */}
					<Button
						type="submit"
						label="Login"
						className={`w-full ${
							isProcessing && "ring-4 cursor-progress" // set cursor progress is processing
						}`}
						disabled={isProcessing} // disable if processing
					/>
				</form>
			</div>
		</section>
	);
};

export default LoginPage;
