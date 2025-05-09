import React from "react";

/**
 * A button component with customizable label, type, className, disabled state, and onClick handler.
 * @param {string} [type="button"] - The type of button (e.g. "button", "submit", "reset")
 * @param {string} [label="Button"] - The label text for the button
 * @param {string} [className=""] - Additional CSS classes to apply to the button
 * @param {boolean} [disabled=false] - Whether the button is disabled or not
 * @param {function} [onClick=() => {}] - The function to call when the button is clicked
 */
const Button = ({
	type = "button",
	label = "Button",
	className = "",
	disabled = false,
	onClick = () => {}
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
			onClick={onClick}
		>
			{label}
		</button>
	);
};

export default Button;

