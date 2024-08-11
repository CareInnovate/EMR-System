import prisma from "@/app/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	const invoices = await prisma.invoice.findMany({
		where: {
			patient: { id: params.id },
		},
		include: {
			services: true,
			Invoice_Medication: { include: { medication: true } },
		},
	});

	return NextResponse.json(invoices);
}
