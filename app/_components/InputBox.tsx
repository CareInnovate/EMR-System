import React, { ChangeEventHandler } from "react";

type props = {
	type?: string;
	placeholder?: string;
	label: string;
	name: string;
	required?: boolean;
	value?: any;
	onChange?: ChangeEventHandler<HTMLInputElement>;
};
const InputBox = ({
	type,
	placeholder,
	label,
	name,
	required,
	value,
	onChange,
}: props) => {
	return (
		<label className="flex flex-col gap-2 w-full">
			<span className="p-2 w-full ">{label}:</span>
			<input
				className="ml-2 p-2 w-4/5 border border-gray-300 rounded-md"
				type={type || "text"}
				name={name}
				id={name}
				placeholder={placeholder}
				required={required || false}
				value={value}
				onChange={onChange}
			/>
		</label>
	);
};

export default InputBox;
