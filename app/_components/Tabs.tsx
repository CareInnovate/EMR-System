import Link from "next/link";

const Tabs = () => {
	return (
		<div className="absolute w-3/5 flex gap-2 text-lg bottom-0">
			<Link href={"#"} className="px-3 py-1 bg-slate-200">
				Home
			</Link>
			<Link href={"#"} className="px-3 py-1 bg-orange-50">
				Appointment
			</Link>
			<Link href={"#"} className="px-3 py-1 bg-slate-200">
				Profile
			</Link>
			<Link href={"#"} className="px-3 py-1 bg-slate-200">
				Payment
			</Link>
		</div>
	);
};

export default Tabs;
