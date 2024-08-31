import Calendar, { event, resource } from "@/app/_components/Calendar";
import { doctorAppointment } from "@/app/api/appointments/route";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";

const DoctorAppointments = async () => {
	const user = await getServerSession(options);
	const appointments: doctorAppointment[] = await fetch(
		`http://localhost:3000/api/appointments/`,
		{
			headers: headers(),
		}
	).then((res) => res.json());
	const resources: resource[] = [
		{
			id: user?.user.id as string,
			title: `Your appointments`,
			deptId: user?.user.deptId as string,
		},
	];
	const events: event[] = appointments.map((app) => {
		const startTime = new Date(app.datetime);
		const endTime = new Date(startTime.getTime() + 30 * 60000);
		const title = `${app.patient.sex === "MALE" ? "Mr." : "Mrs./Ms."} ${
			app.patient.firstName
		} ${app.patient.middleName} ${app.patient.lastName}`;
		return {
			start: startTime,
			end: endTime,
			title: title,
			data: {
				id: app.id,
				patientId: app.patientId,
			},
			resourceId: user?.user.id as string,
		};
	});

	return (
		<main className="w-full h-4/5 mt-24 flex flex-col items-center gap-3 py-1 px-5">
			<Calendar resources={resources} initialEvents={events} />
		</main>
	);
};

export default DoctorAppointments;
