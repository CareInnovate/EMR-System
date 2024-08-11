import { options } from "@/app/api/auth/[...nextauth]/options";
import { invoices } from "@/app/api/patient/[id]/invoices/route";
import { getServerSession } from "next-auth";
import { ReactElement } from "react";

export default async function Payment() {
	const user = await getServerSession(options);
	const res = await fetch(
		`http://localhost:3000/api/patient/${user?.user.id}/invoices`
	);
	const {
		dueInvoices,
		paidInvoices,
	}: { dueInvoices: invoices[]; paidInvoices: invoices[] } = await res.json();

	const { medications, services, medicationTotal, serviceTotal } =
		separateInvoices(dueInvoices);

	return (
		<main className="w-full mt-24 flex flex-col items-center gap-3 py-1 px-5">
			<h1 className="text-4xl mb-5 w-3/4 text-left">Due Payment</h1>
			{services.length !== 0 && (
				<table className="w-3/4 text-lg bg-red-100">
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
				<table className="w-3/4 text-lg bg-red-100">
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
				<div className="h-48 flex items-center text-xl text-gray-600">
					<p>You are caught up with your fees</p>
				</div>
			) : (
				<div className="mt-8 w-3/4 flex justify-end mr-2">
					<button className="bg-red-300 px-3 py-2 rounded">
						Submit Payment
					</button>
				</div>
			)}
			{paidInvoices.length !== 0 &&
				paidInvoices.map((invoice, ind) => {
					return (
						<div key={ind}>
							<span>{invoice.createdAt.toISOString()}</span>
							<span>
								$
								{invoice.services.reduce(
									(prev, cur) => prev + cur.price,
									0
								) +
									invoice.Invoice_Medication.reduce(
										(prev, cur) =>
											prev +
											cur.quantity * cur.medication.price,
										0
									)}
							</span>
						</div>
					);
				})}
		</main>
	);
}

function separateInvoices(invoices: invoices[]) {
	let serviceTotal = 0;
	const services = invoices.map((invoice, i): ReactElement | undefined => {
		return (
			<>
				{invoice.services.map((service, ind) => {
					serviceTotal += service.price;
					return (
						<tr key={ind}>
							<td className="w-3/5">{service.name}</td>
							<td className="text-right">
								{invoice.createdAt.toString().split("T")[0]}
							</td>
							<td className="text-right">{service.price}</td>
						</tr>
					);
				})}
			</>
		);
	});
	let medicationTotal = 0;
	const medications = invoices.map((invoice, i): ReactElement | undefined => {
		return (
			<>
				{invoice.Invoice_Medication.map((inv, ind) => {
					medicationTotal += inv.quantity * inv.medication.price;
					return (
						<tr key={ind}>
							<td className="w-3/5">{inv.medication.name}</td>
							<td className="text-right">{inv.quantity}</td>
							<td className="text-right">
								{invoice.createdAt.toString().split("T")[0]}
							</td>
							<td className="text-right">
								{inv.medication.price}
							</td>
						</tr>
					);
				})}
			</>
		);
	});
	return { medications, services, medicationTotal, serviceTotal };
}
