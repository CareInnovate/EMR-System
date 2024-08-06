export default function Home() {
	return (
		<main className="w-4/5 inset-0 m-auto flex flex-col items-center gap-3 p-5">
			<h1 className="text-4xl mb-5 w-3/4 text-left">My Appointments</h1>
			<table className="w-3/4 text-lg bg-red-100">
				<tr className="text-xl p-14">
					<th>Doctor</th>
					<th>Date</th>
					<th>Time</th>
					<th>Actions</th>
				</tr>
				<tr>
					<td className="w-3/5">Mr. Bean</td>
					<td className="text-center">10/12/2024</td>
					<td className="text-center">08:00</td>
					<td className="text-center">
						<button>Edit</button>
						<button>Delete</button>
					</td>
				</tr>
				<tr>
					<td className="w-3/5">Mr. Bean</td>
					<td className="text-center">10/12/2024</td>
					<td className="text-center">08:00</td>
					<td className="text-center">
						<button>Edit</button>
						<button>Delete</button>
					</td>
				</tr>
				<tr>
					<td className="w-3/5">Mr. Bean</td>
					<td className="text-center">10/12/2024</td>
					<td className="text-center">08:00</td>
					<td className="text-center">
						<button>Edit</button>
						<button>Delete</button>
					</td>
				</tr>
			</table>
			<div className="mt-8 w-3/4 flex justify-end mr-2">
				<button className="bg-red-300 px-3 py-2 rounded">
					Schedule Appointment
				</button>
			</div>
		</main>
	);
}
