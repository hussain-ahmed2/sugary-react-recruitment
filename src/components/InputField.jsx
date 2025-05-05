import React from "react";

const InputField = ({
	name,
	label,
	type = "text",
	required = true,
	placeholder = "",
	value = "",
	onChange = () => {},
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
			/>
		</div>
	);
};

export default InputField;