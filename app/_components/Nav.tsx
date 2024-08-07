import Tabs from "./Tabs";
import ProfileMenu from "./ProfileMenu";
import Link from "next/link";

const Nav = () => {
	return (
		<nav className="h-24 flex flex-col items-center justify-center mb-10 relative px-10">
			<div className="w-full flex justify-end items-center text-5xl font-bold">
				<ProfileMenu />
			</div>
			{/* <Tabs /> */}
		</nav>
	);
};

export default Nav;
