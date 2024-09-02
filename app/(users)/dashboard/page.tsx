import DoctorDashboard from "@/app/_pages/doctor/dashboard/page";
import PatientDashboard from "@/app/_pages/patient/dashboard/page";
import ReceptionistDashboard from "@/app/_pages/receptionist/dashboard/page";
import Unauthorized from "@/app/_pages/Unauthorized";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export default async function Dashboard() {
	const user = await getServerSession(options);

	switch (user?.user.role) {
		case "Patient":
			return <PatientDashboard />;
		case "Doctor":
			return <DoctorDashboard />;
		case "Receptionist":
			return <ReceptionistDashboard />;
		default:
			return <Unauthorized />;
	}
}
