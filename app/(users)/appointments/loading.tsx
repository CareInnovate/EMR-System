const loading = () => {
	return (
		<main className="flex flex-row gap-2 w-full h-lvh justify-center items-center">
			<div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
			<div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
			<div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
		</main>
	);
};

export default loading;
