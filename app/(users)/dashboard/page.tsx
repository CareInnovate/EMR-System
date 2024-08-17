import PatientDashboard from "@/app/_pages/patient/dashboard/page";
import { ReceptionistDashboard } from "@/app/_pages/receptionist/dashboard/page";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export default async function Dashboard() {
	const user = await getServerSession(options);

	switch (user?.user.role) {
		case "Patient":
			return <PatientDashboard />;
		case "Doctor":
			return;
		case "Receptionist":
			return <ReceptionistDashboard />;
		default:
			return <div>You are Unauthorized to view this page </div>;
	}
}
