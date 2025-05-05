import React from "react";

const Button = ({
	type = "button",
	label = "Button",
	className = "",
	disabled = false,
}) => {
	return (
		<button
			className={`px-6 py-3.25 rounded-md text-white font-medium bg-neutral-800 ring-black/20 transition duration-300 ${
				disabled
					? "cursor-not-allowed"
					: "hover:bg-neutral-600 focus:ring-4 active:ring-4"
			} ${className}`}
			type={type}
			disabled={disabled}
		>
			{label}
		</button>
	);
};

export default Button;
