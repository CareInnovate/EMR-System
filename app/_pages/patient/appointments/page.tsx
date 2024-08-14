import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PatientAppointments() {
	return (
		<main className="w-full mt-24 flex flex-col items-center gap-3 py-1 px-9 sm:px-5">
			<h1 className="text-2xl sm:text-4xl mb-5 w-full sm:w-3/4 text-left">
				My Appointments
			</h1>
			<table className="w-full sm:w-3/4 text-sm sm:text-lg bg-red-100">
				<thead>
					<tr className="text-xl p-14">
						<th>Doctor</th>
						<th>Date</th>
						<th>Time</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td className="w-3/5">Mr. Bean</td>
						<td className="text-center">10/12/2024</td>
						<td className="text-center">08:00</td>
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
					<tr>
						<td className="w-3/5">Mr. Bean</td>
						<td className="text-center">10/12/2024</td>
						<td className="text-center">08:00</td>
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
					<tr>
						<td className="w-3/5">Mr. Bean</td>
						<td className="text-center">10/12/2024</td>
						<td className="text-center">08:00</td>
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
				</tbody>
			</table>
			<div className="mt-8 w-3/4 flex justify-end mr-2">
				<button className="bg-red-300 px-3 py-2 rounded">
					Schedule Appointment
				</button>
			</div>
		</main>
	);
}
