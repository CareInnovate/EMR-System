"use client";
import {
	faLock,
	faMoon,
	faUser,
	faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useState } from "react";

const ProfileMenu = ({ user }: { user: Session }) => {
	const [open, setOpen] = useState(false);
	return (
		<div className="relative flex z-20 items-center gap-3">
			<p className="text-sm text-gray-700">Hi, {user?.user.name}</p>
			<FontAwesomeIcon
				icon={faUserCircle}
				width={30}
				className="cursor-pointer"
				onClick={() => setOpen((prev) => !prev)}
			/>
			{open && (
				<div className="absolute top-16 right-0 flex flex-col w-max text-lg font-sans justify-start items-start bg-slate-100 rounded-md shadow">
					<div className="w-full hover:bg-blue-950 hover:text-white px-5 py-2  cursor-pointer rounded-md flex gap-3 items-center">
						<FontAwesomeIcon icon={faMoon} />
						<span>Dark Mode</span>
					</div>
					<div className="w-full hover:bg-blue-950 hover:text-white px-5 py-2 cursor-pointer rounded-md flex gap-3 items-center">
						<FontAwesomeIcon icon={faLock} />
						<span>Change Password</span>
					</div>
					<div
						className="w-full hover:bg-blue-950 hover:text-white px-5 py-2 cursor-pointer rounded-md flex gap-3 items-center"
						onClick={() => signOut()}
					>
						<FontAwesomeIcon icon={faUser} />
						<span>Logout</span>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProfileMenu;
