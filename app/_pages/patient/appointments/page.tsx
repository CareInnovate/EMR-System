import { patientAppointment } from "@/app/api/appointments/route";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { headers } from "next/headers";

export default async function PatientAppointments() {
	const res = await fetch("http://localhost:3000/api/appointments", {
		headers: headers(),
	});
	const appointments: patientAppointment[] = await res.json();
	return (
		<main className="w-full mt-24 flex flex-col items-center gap-3 py-1 px-9 sm:px-5">
			<h1 className="text-2xl sm:text-4xl mb-5 w-full sm:w-3/4 text-left">
				My Appointments
			</h1>
			<table className="w-full sm:w-3/4 text-sm sm:text-lg border border-blue-700">
				<thead>
					<tr className="text-xl p-14">
						<th>Doctor</th>
						<th>Date</th>
						<th>Time</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{appointments.map((app) => {
						const doctor = app.doctor.staff;
						return (
							<tr key={app.id}>
								<td className="w-3/5">
									Dr.{" "}
									{`${doctor.firstName} ${doctor.middleName}`}
								</td>
								<td className="text-center">
									{new Date(
										app.datetime
									).toLocaleDateString()}
								</td>
								<td className="text-center">
									{new Date(
										app.datetime
									).toLocaleTimeString()}
								</td>
								<td className="text-center">
									<button>
										<FontAwesomeIcon
											icon={faEdit}
											className="mr-4"
										/>
									</button>
									<button>
										<FontAwesomeIcon
											icon={faTrash}
											className="text-red-700"
										/>
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			<div className="mt-8 w-3/4 flex justify-end mr-2">
				<button className="bg-blue-900 text-white px-3 py-2 rounded">
					Schedule Appointment
				</button>
			</div>
		</main>
	);
}
