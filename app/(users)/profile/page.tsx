import PatientProfile from "@/app/_pages/patient/profile/page";
import Unauthorized from "@/app/_pages/Unauthorized";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
export default async function Profile() {
	const user = await getServerSession(options);

	switch (user?.user.role) {
		case "Patient":
			return <PatientProfile />;
		default:
			return <Unauthorized />;
	}
}
