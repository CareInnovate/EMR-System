"use client";
import {
	faBars,
	faClock,
	faDollar,
	faHome,
	faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { poppins } from "../fonts";
import { useState } from "react";

const Aside = () => {
	const path = usePathname();
	const tabs = [
		{ path: "/", title: "Home", icon: faHome },
		{ path: "/appointments", title: "Appointments", icon: faClock },
		{ path: "/profile", title: "Profile", icon: faPerson },
		{ path: "/payment", title: "Payment", icon: faDollar },
	];
	const [open, setOpen] = useState(false);
	return (
		<aside
			className={`top-0 ${
				open ? "w-72" : "w-24"
			} p-5 flex flex-col gap-2 text-lg left-0 bg-white h-full transition-all fixed`}
		>
			<div
				className={`mb-8 p-2 flex ${
					open ? "justify-between" : "justify-center"
				} items-center`}
			>
				{open && (
					<Link href={"/"} className={"text-5xl font-bold"}>
						EMR
					</Link>
				)}
				<FontAwesomeIcon
					icon={faBars}
					className="text-2xl cursor-pointer"
					onClick={() => setOpen((prev) => !prev)}
				/>
			</div>
			{tabs.map((val, ind) => {
				return (
					<Link
						key={ind}
						href={val.path}
						className={` ${
							poppins.className
						} px-5 py-4 cursor-pointer rounded-lg flex gap-5 items-center   ${
							val.path === path
								? "bg-blue-950 text-white hover:bg-blue-900"
								: "hover:bg-blue-100"
						} ${open ? "" : "justify-center text-2xl"}`}
					>
						<FontAwesomeIcon icon={val.icon} />
						{open && val.title}
					</Link>
				);
			})}
		</aside>
	);
};

export default Aside;
