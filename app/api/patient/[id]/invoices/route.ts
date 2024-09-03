import prisma from "@/app/client";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	const dueInvoices = await prisma.invoice.findMany({
		where: {
			patient: { id: params.id },
			status: "Unpaid",
		},
		include: {
			services: true,
			Invoice_Medication: { include: { medication: true } },
		},
	});
	const paidInvoices = await prisma.invoice.findMany({
		where: {
			patient: { id: params.id },
			status: "Paid",
		},
		include: {
			services: true,
			Invoice_Medication: { include: { medication: true } },
		},
	});

	return NextResponse.json({ dueInvoices, paidInvoices });
}

export type invoices = Prisma.InvoiceGetPayload<{
	include: {
		services: true;
		Invoice_Medication: { include: { medication: true } };
	};
}>;
