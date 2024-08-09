export default function Payment() {
	return (
		<main className="w-full mt-24 flex flex-col items-center gap-3 py-1 px-5">
			<h1 className="text-4xl mb-5 w-3/4 text-left">Due Payment</h1>
			<table className="w-3/4 text-lg bg-red-100">
				<thead>
					<tr className="text-xl p-14">
						<th className="text-left">Service</th>
						<th className="text-right">Date</th>
						<th className="text-right">Amount (in ETB)</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td className="w-3/5">Doctor Appointment</td>
						<td className="text-right">09/11/2024</td>
						<td className="text-right">200</td>
					</tr>
					<tr>
						<td className="w-3/5">Lab Exam</td>
						<td className="text-right">09/11/2024</td>
						<td className="text-right">100</td>
					</tr>
					<tr>
						<td className="w-3/5">Prescription</td>
						<td className="text-right">09/11/2024</td>
						<td className="text-right"> 300</td>
					</tr>
					<tr className="text-xl font-bold">
						<td colSpan={2} className="text-right">
							Total
						</td>
						<td className="text-right">600</td>
					</tr>
				</tbody>
			</table>
			<div className="mt-8 w-3/4 flex justify-end mr-2">
				<button className="bg-red-300 px-3 py-2 rounded">
					Submit Payment
				</button>
			</div>
		</main>
	);
}
