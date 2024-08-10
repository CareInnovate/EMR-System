import Tabs from "./Tabs";
import ProfileMenu from "./ProfileMenu";
import SignInButton from "./SignInButton";
import { getServerSession } from "next-auth";

const Nav = async () => {
	const user = await getServerSession();
	return (
		<nav className="h-24 flex flex-col items-center justify-center mb-10 relative px-10">
			<div className="w-full flex justify-end items-center text-5xl font-bold">
				{user ? <ProfileMenu user={user} /> : <SignInButton />}
			</div>
			{/* <Tabs /> */}
		</nav>
	);
};

export default Nav;
