import Tabs from "./Tabs";

const Nav = () => {
	return (
		<nav className="h-24 shadow-lg flex flex-col items-center justify-center px-5 mb-10 relative">
			<div className="w-full flex justify-between items-center text-5xl font-bold">
				EMR
			</div>
			<Tabs />
		</nav>
	);
};

export default Nav;
