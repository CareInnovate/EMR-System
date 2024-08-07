"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Tabs = () => {
	const path = usePathname();
	const tabs = [
		{ path: "/", title: "Home" },
		{ path: "/appointments", title: "Appointments" },
		{ path: "/profile", title: "Profile" },
		{ path: "/payment", title: "Payment" },
	];
	return (
		<div className="absolute w-3/5 flex gap-2 text-lg bottom-0">
			{tabs.map((val, ind) => {
				return (
					<Link
						key={ind}
						href={val.path}
						className={`px-3 py-1 ${
							val.path === path ? "bg-orange-50" : "bg-slate-200"
						}`}
					>
						{val.title}
					</Link>
				);
			})}
		</div>
	);
};

export default Tabs;
