import { ReactElement } from "react";

type data = {
	data: {
		medications: (ReactElement | undefined)[];
		services: (ReactElement | undefined)[];
		medicationTotal: number;
		serviceTotal: number;
	};
};
const DueInvoices = ({ data }: data) => {
	const { services, medications, serviceTotal, medicationTotal } = data;
	return (
		<div className="w-full flex flex-col items-center gap-6">
			{services.length !== 0 && (
				<table className="w-full sm:w-3/4 text-lg bg-red-100">
					<thead>
						<tr className="text-xl p-14">
							<th className="text-left">Service</th>
							<th className="text-right">Date</th>
							<th className="text-right">Price (in ETB)</th>
						</tr>
					</thead>
					<tbody>
						{services}
						<tr className="text-xl font-bold">
							<td colSpan={2} className="text-right">
								Total
							</td>
							<td className="text-right">{serviceTotal}</td>
						</tr>
					</tbody>
				</table>
			)}
			{medications.length !== 0 && (
				<table className="w-full sm:w-3/4  text-lg bg-red-100">
					<thead>
						<tr className="text-xl p-14">
							<th className="text-left">Medication</th>
							<th className="text-right">Quantity</th>
							<th className="text-right">Date Prescribed</th>
							<th className="text-right">Price (in ETB)</th>
						</tr>
					</thead>
					<tbody>
						{medications}
						<tr className="text-xl font-bold">
							<td colSpan={3} className="text-right">
								Total
							</td>
							<td className="text-right">{medicationTotal}</td>
						</tr>
					</tbody>
				</table>
			)}
			{services.length === 0 && medications.length === 0 ? (
				<div className="h-[70vh] w-full flex justify-center items-center text-xl text-gray-600">
					<p className="text-center">
						You are caught up with your fees
					</p>
				</div>
			) : (
				<div className="mt-8 w-full sm:w-3/4 flex justify-end mr-2">
					<button className="bg-red-300 px-3 py-2 rounded">
						Submit Payment
					</button>
				</div>
			)}
		</div>
	);
};

export default DueInvoices;
