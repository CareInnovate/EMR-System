import PatientAppointments from "@/app/_pages/patient/appointments/page";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export default async function Appointments() {
	const user = await getServerSession(options);

	switch (user?.user.role) {
		case "Patient":
			return <PatientAppointments />;
		case "Doctor":
			return;
		case "Receptionist":
			return;
		default:
			return <div>You are Unauthorized to view this page </div>;
	}
}
