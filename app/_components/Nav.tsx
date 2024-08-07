import Tabs from "./Tabs";
import ProfileMenu from "./ProfileMenu";

const Nav = () => {
	return (
		<nav className="h-24 shadow-lg flex flex-col items-center justify-center px-5 mb-10 relative">
			<div className="w-full flex justify-between items-center text-5xl font-bold">
				<div>EMR</div>
				<ProfileMenu />
			</div>
			<Tabs />
		</nav>
	);
};

export default Nav;
