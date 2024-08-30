import Calendar from "@/app/_components/Calendar";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { doctor } from "@/app/api/doctors/[dept]/route";
import { getServerSession } from "next-auth";
import "react-big-calendar/lib/css/react-big-calendar.css";

export async function ReceptionistAppointments() {
	const user = await getServerSession(options);
	const doctors: doctor[] = await fetch(
		"http://localhost:3000/api/doctors/general-id"
	).then((res) => res.json());
	console.log(doctors[0].appointments);
	const resources = doctors.map((doctor) => ({
		id: doctor.id,
		title: `Dr. ${doctor.staff.firstName} ${doctor.staff.middleName}`,
	}));
	const events = doctors.flatMap((doctor) => {
		return doctor.appointments.map((app) => {
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
					id: doctor.id,
				},
				resourceId: doctor.id,
			};
		});
	});

	return (
		<main className="w-full h-4/5 mt-24 flex flex-col items-center gap-3 py-1 px-5">
			<Calendar resources={resources} initialEvents={events} />
		</main>
	);
}
