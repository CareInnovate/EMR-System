import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { invoices } from "../api/patient/[id]/invoices/route";
import { faReceipt } from "@fortawesome/free-solid-svg-icons";

const PaidInvoices = ({ paidInvoices }: { paidInvoices: invoices[] }) => {
	return (
		<div className="w-full sm:w-3/4 mb-10">
			<h1 className="text-2xl sm:text-4xl mb-5 w-full text-left bg-orange-200 p-5">
				Payment History
			</h1>
			{paidInvoices.map((invoice, ind) => {
				let title = "";
				if (invoice.services.length === 0) {
					title =
						invoice.Invoice_Medication.length === 1
							? `${invoice.Invoice_Medication[0].quantity} ${invoice.Invoice_Medication[0].medication.name} medication`
							: `${invoice.Invoice_Medication.length} medications`;
				} else if (invoice.services.length === 1) {
					title = invoice.services[0].name;
					title +=
						invoice.Invoice_Medication.length > 0
							? ` and ${invoice.Invoice_Medication.length} medications`
							: "";
				} else {
					title = `${invoice.services[0].name} and ${
						invoice.services.length - 1
					} other services`;
				}
				return (
					<div
						key={invoice.id}
						className="py-5 px-1 sm:px-8 md:px-10 lg:px-20 w-full flex justify-between text-xl items-center"
					>
						<div className="flex gap-6 items-center">
							<FontAwesomeIcon
								icon={faReceipt}
								className="text-4xl"
							/>
							<div className="flex flex-col">
								<h1 className="font-bold">{title}</h1>
								<span className="text-sm text-gray-800">
									{invoice.createdAt.toString().split("T")[0]}
								</span>
							</div>
						</div>
						<span className="font-bold text-2xl">
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
		</div>
	);
};

export default PaidInvoices;
