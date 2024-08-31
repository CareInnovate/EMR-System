import DoctorAppointments from "@/app/_pages/doctor/appointments/page";
import PatientAppointments from "@/app/_pages/patient/appointments/page";
import { ReceptionistAppointments } from "@/app/_pages/receptionist/appointments/page";
import Unauthorized from "@/app/_pages/Unauthorized";
import { patientAppointment } from "@/app/api/appointments/route";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { Department } from "@prisma/client";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";

export default async function Appointments() {
	const user = await getServerSession(options);

	switch (user?.user.role) {
		case "Patient":
			const departments: Department[] = await fetch(
				"http://localhost:3000/api/departments"
			).then((res) => res.json());
			const appointments: patientAppointment[] = await fetch(
				"http://localhost:3000/api/appointments",
				{
					headers: headers(),
				}
			).then((res) => res.json());
			return (
				<PatientAppointments
					initialAppointments={appointments}
					departments={departments}
					patientId={user.user.id}
				/>
			);
		case "Doctor":
			return <DoctorAppointments />;
		case "Receptionist":
			return <ReceptionistAppointments />;
		default:
			return <Unauthorized />;
	}
}
