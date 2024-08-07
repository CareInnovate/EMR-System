"use client";
import {
	faClock,
	faDollar,
	faHome,
	faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { poppins } from "../fonts";

const Aside = () => {
	const path = usePathname();
	const tabs = [
		{ path: "/", title: "Home", icon: faHome },
		{ path: "/appointments", title: "Appointments", icon: faClock },
		{ path: "/profile", title: "Profile", icon: faPerson },
		{ path: "/payment", title: "Payment", icon: faDollar },
	];
	return (
		<aside className="fixed top-24 w-72 p-5 flex flex-col gap-2 text-lg left-0 bg-white h-full">
			{tabs.map((val, ind) => {
				return (
					<Link
						key={ind}
						href={val.path}
						className={`px-5 py-4 cursor-pointer rounded-lg flex gap-5 items-center hover:bg-slate-200 ${
							poppins.className
						} ${val.path === path ? "bg-blue-950 text-white" : ""}`}
					>
						<FontAwesomeIcon icon={val.icon} />
						{val.title}
					</Link>
				);
			})}
		</aside>
	);
};

export default Aside;
