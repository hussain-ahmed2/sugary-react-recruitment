import React from "react";

/**
 * A simple input field component that handles text, email, password, and number types.
 * @param {string} name The name of the input field.
 * @param {string} label The label for the input field.
 * @param {string} type The type of input field (text, email, password, number).
 * @param {boolean} required Whether the input field is required or not.
 * @param {string} placeholder The placeholder text for the input field.
 * @param {string} value The value of the input field.
 * @param {function} onChange A function to call when the input field changes.
 * @param {boolean} disabled Whether the input field is disabled or not.
 * @returns {JSX.Element} The JSX element representing the input field.
 */
const InputField = ({
	name,
	label,
	type = "text",
	required = true,
	placeholder = "",
	value = "",
	onChange = () => {},
	disabled = false,
}) => {
	return (
		<div className="flex flex-col gap-1">
			{label && (
				<label className="font-medium" htmlFor={name}>
					{" "}
					{label}{" "}
				</label>
			)}
			<input
				className={`p-3 rounded-md border border-neutral-200 outline-none ring-black/20 focus:ring-4 transition duration-300`}
				type={type}
				id={name}
				name={name}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				required={required}
				disabled={disabled}
			/>
		</div>
	);
};

export default InputField;
