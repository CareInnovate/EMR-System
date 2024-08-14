"use client";

const Button = () => {
	return (
		<button
			className="border border-blue-950 text-blue-900  py-4 px-12 rounded-md"
			onClick={() => console.log("Clicked")}
			type="button"
		>
			Cancel
		</button>
	);
};

export default Button;
