import DueInvoices from "@/app/_components/DueInvoices";
import PaidInvoices from "@/app/_components/PaidInvoices";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { invoices } from "@/app/api/patient/[id]/invoices/route";
import { getServerSession } from "next-auth";
import { Fragment, ReactElement } from "react";

export default async function PatientPayment() {
	const user = await getServerSession(options);
	const res = await fetch(
		`http://localhost:3000/api/patient/${user?.user.id}/invoices`
	);
	const {
		dueInvoices,
		paidInvoices,
	}: { dueInvoices: invoices[]; paidInvoices: invoices[] } = await res.json();

	return (
		<main className="w-full mt-24 flex flex-col items-center gap-3 py-1 px-5">
			<h1 className="text-2xl mb-5 w-full text-left sm:w-3/4 sm:text-4xl px-4 sm:px-0">
				Due Payment
			</h1>
			<DueInvoices data={separateInvoices(dueInvoices)} />
			{paidInvoices.length > 0 && (
				<PaidInvoices paidInvoices={paidInvoices} />
			)}
		</main>
	);
}

function separateInvoices(invoices: invoices[]) {
	let serviceTotal = 0;
	const services = invoices.map((invoice, i): ReactElement | undefined => {
		return (
			<Fragment key={invoice.id}>
				{invoice.services.map((service, ind) => {
					serviceTotal += service.price;
					return (
						<tr key={service.id}>
							<td className="w-3/5 px-1 sm:px-3">
								{service.name}
							</td>
							<td className="text-right px-1 sm:px-3">
								{invoice.createdAt.toString().split("T")[0]}
							</td>
							<td className="text-right px-1 sm:px-3">
								{service.price}
							</td>
						</tr>
					);
				})}
			</Fragment>
		);
	});
	let medicationTotal = 0;
	const medications = invoices.map((invoice, i): ReactElement | undefined => {
		return (
			<Fragment key={invoice.id}>
				{invoice.Invoice_Medication.map((inv, ind) => {
					medicationTotal += inv.quantity * inv.medication.price;
					return (
						<tr key={inv.id}>
							<td className="w-3/5 px-1 sm:px-3 ">
								{inv.medication.name}
							</td>
							<td className="text-right px-1 sm:px-3">
								{inv.quantity}
							</td>
							<td className="text-right px-1 sm:px-3">
								{invoice.createdAt.toString().split("T")[0]}
							</td>
							<td className="text-right px-1 sm:px-3">
								{inv.medication.price}
							</td>
						</tr>
					);
				})}
			</Fragment>
		);
	});
	return { medications, services, medicationTotal, serviceTotal };
}
