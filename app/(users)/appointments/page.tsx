import DoctorAppointments from "@/app/_pages/doctor/appointments/page";
import PatientAppointments from "@/app/_pages/patient/appointments/PatientAppointments";
import ReceptionistAppointments from "@/app/_pages/receptionist/appointments/page";
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
				`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/departments`
			).then((res) => res.json());
			const requestHeaders = headers();

			const fetchHeaders = new Headers();
			fetchHeaders.set(
				"Authorization",
				requestHeaders.get("Authorization") as string
			);
			fetchHeaders.set("Content-Type", "application/json");
			const appointments: patientAppointment[] = await fetch(
				`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/appointments`,
				{
					headers: fetchHeaders,
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
