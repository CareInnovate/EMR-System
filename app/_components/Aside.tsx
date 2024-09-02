"use client";
import {
	faAddressCard,
	faBars,
	faClock,
	faClose,
	faCross,
	faDollar,
	faHome,
	faPerson,
	faPlusSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { poppins } from "../fonts";
import { useState } from "react";

const Aside = ({ role }: { role: string }) => {
	const path = usePathname();
	const [open, setOpen] = useState(false);
	const roles = ["Patient", "Doctor", "Receptionist"];
	// if (role !== "patient" && role !== "doctor" && role !== "receptionist") {
	if (!roles.includes(role)) {
		return <div>Unauthorized</div>;
	}
	const tabs = {
		Patient: [
			{ path: "/dashboard", title: "Home", icon: faHome },
			{ path: "/appointments", title: "Appointments", icon: faClock },
			{ path: "/profile", title: "Profile", icon: faPerson },
			{ path: "/payment", title: "Payment", icon: faDollar },
		],
		Doctor: [
			{ path: "/dashboard", title: "Home", icon: faHome },
			{ path: "/appointments", title: "Appointments", icon: faClock },
			{ path: "/patients", title: "Patients", icon: faPlusSquare },
			// { path: "/profile", title: "Profile", icon: faPerson },
			// { path: "/payment", title: "Payment", icon: faDollar },
		],
		Receptionist: [
			{ path: "/dashboard", title: "Home", icon: faHome },
			{ path: "/appointments", title: "Appointments", icon: faClock },
			// { path: "/profile", title: "Profile", icon: faPerson },
			{
				path: "/register",
				title: "Register Patient",
				icon: faAddressCard,
			},
		],
	};

	return (
		<>
			<aside
				className={`top-0 ${
					open ? "w-full sm:w-72" : "w-24"
				} p-5 flex flex-col gap-2 text-lg left-0 bg-white h-auto sm:h-full transition-all fixed z-20`}
			>
				<div
					className={`mb-0 sm:mb-8 p-2 flex ${
						open ? "justify-between" : "justify-center"
					} items-center`}
				>
					{open && (
						<Link
							href={"/dashboard"}
							className={"text-5xl font-bold"}
						>
							EMR
						</Link>
					)}
					<FontAwesomeIcon
						icon={open ? faClose : faBars}
						className="text-2xl cursor-pointer"
						onClick={() => setOpen((prev) => !prev)}
					/>
				</div>
				{
					//@ts-ignore
					tabs[role].map((val, ind) => {
						return (
							<Link
								key={ind}
								href={val.path}
								className={` ${
									poppins.className
								} px-5 py-4 cursor-pointer rounded-lg gap-5 items-center   ${
									val.path === path
										? "bg-blue-950 text-white hover:bg-blue-900"
										: "hover:bg-blue-100"
								} ${
									open
										? "flex w-full sm:w-auto"
										: "hidden sm:flex justify-center text-2xl"
								}`}
							>
								<FontAwesomeIcon icon={val.icon} />
								{open && val.title}
							</Link>
						);
					})
				}
			</aside>
			<div
				className={`top-0 w-0 ${
					open ? "sm:w-72" : "sm:w-24"
				} p-5 hidden sm:invisible sm:flex sm:flex-col gap-2 text-lg left-0 bg-white h-auto sm:h-full transition-all`}
			>
				Filler
			</div>
		</>
	);
};

export default Aside;
