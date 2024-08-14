import PatientAppointments from "@/app/_pages/patient/appointments/page";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export default async function Appointments() {
	const user = await getServerSession(options);

	switch (user?.user.role) {
		case "patient":
			return <PatientAppointments />;
		case "doctor":
			return;
		case "receptionist":
			return;
		default:
			return <div>You are Unauthorized to view this page </div>;
	}
}
