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
		<div className="w-full flex flex-col items-center gap-6 break-words">
			{services.length !== 0 && (
				<table className="w-full sm:w-3/4 text-sm sm:text-lg border border-blue-700">
					<thead>
						<tr className="text-sm sm:text-xl p-2 sm:p-14">
							<th className="text-left px-1 sm:px-3">Service</th>
							<th className="text-right px-1 sm:px-3">Date</th>
							<th className="text-right px-1 sm:px-3">
								Price{" "}
								<span className="text-xs font-normal">
									(in ETB)
								</span>
							</th>
						</tr>
					</thead>
					<tbody>{services}</tbody>
					<tfoot>
						<tr
							className="text-sm sm:text-xl font-bold"
							key={"total"}
						>
							<td colSpan={2} className="text-right px-1 sm:px-3">
								Total
							</td>
							<td className="text-right px-1 sm:px-3">
								{serviceTotal}
							</td>
						</tr>
					</tfoot>
				</table>
			)}
			{medications.length !== 0 && (
				<table className="w-full sm:w-3/4  text-sm sm:text-lg border border-blue-700">
					<thead>
						<tr className="text-sm sm:text-xl p-0 sm:p-14">
							<th className="text-left">Medication</th>
							<th className="text-right px-1 sm:px-3">
								Quantity
							</th>
							<th className="text-right px-1 sm:px-3">
								Date Prescribed
							</th>
							<th className="text-center px-1 sm:px-3">
								Price{" "}
								<span className="text-xs font-normal">
									(in ETB)
								</span>
							</th>
						</tr>
					</thead>
					<tbody>{medications}</tbody>
					<tfoot>
						<tr className="text-lg sm:text-xl font-bold">
							<td colSpan={3} className="text-right px-1 sm:px-3">
								Total
							</td>
							<td className="text-right px-1 sm:px-3">
								{medicationTotal}
							</td>
						</tr>
					</tfoot>
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
					<button className="bg-blue-900 text-white px-3 py-2 rounded">
						Submit Payment
					</button>
				</div>
			)}
		</div>
	);
};

export default DueInvoices;
