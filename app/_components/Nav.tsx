import Tabs from "./Tabs";
import ProfileMenu from "./ProfileMenu";
import { getSession } from "next-auth/react";
import SignInButton from "./SignInButton";

const Nav = async () => {
	const user = await getSession();
	console.log(user);
	return (
		<nav className="h-24 flex flex-col items-center justify-center mb-10 relative px-10">
			<div className="w-full flex justify-end items-center text-5xl font-bold">
				{user ? <ProfileMenu /> : <SignInButton />}
			</div>
			{/* <Tabs /> */}
		</nav>
	);
};

export default Nav;
