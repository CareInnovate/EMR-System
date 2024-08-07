"use client";
import {
	faBars,
	faBurger,
	faClock,
	faDollar,
	faHamburger,
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
		<aside className="absolute top-0 w-72 p-5 flex flex-col gap-2 text-lg left-0 bg-white h-full ">
			<div className="mb-8 p-2 flex justify-between items-center">
				<Link href={"/"} className=" text-5xl font-bold">
					EMR
				</Link>
				<FontAwesomeIcon
					icon={faBars}
					className="text-2xl cursor-pointer"
				/>
			</div>
			{tabs.map((val, ind) => {
				return (
					<Link
						key={ind}
						href={val.path}
						className={`px-5 py-4 cursor-pointer rounded-lg flex gap-5 items-center  ${
							poppins.className
						} ${
							val.path === path
								? "bg-blue-950 text-white hover:bg-blue-900"
								: "hover:bg-blue-100"
						}`}
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
