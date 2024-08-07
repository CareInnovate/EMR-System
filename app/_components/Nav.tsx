import Tabs from "./Tabs";
import ProfileMenu from "./ProfileMenu";
import Link from "next/link";

const Nav = () => {
	return (
		<nav className="h-24 flex flex-col items-center justify-center px-10 mb-10 relative">
			<div className="w-full flex justify-between items-center text-5xl font-bold">
				<Link href={"/"}>EMR</Link>
				<ProfileMenu />
			</div>
			{/* <Tabs /> */}
		</nav>
	);
};

export default Nav;
