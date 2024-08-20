import DoctorSearch from "@/app/_pages/doctor/search/page";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export default async function Patients() {
	const user = await getServerSession(options);

	switch (user?.user.role) {
		case "Doctor":
			return <DoctorSearch />;
		default:
			return <div>You are Unauthorized to view this page </div>;
	}
}
