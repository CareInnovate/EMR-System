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
export async function POST(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	await prisma.patient.createMany({
		data: [
			{
				id: "patient-1",
				firstName: "John",
				middleName: "A.",
				lastName: "Doe",
				sex: "MALE",
				birthDate: new Date("1990-01-01"),
				region: "Addis Ababa",
				city: "Addis Ababa",
				woreda: "01",
				kebele: 123,
				mobileNumber: "0911000000",
				password: "hashed_password",
				email: "john.doe@example.com",
			},
			{
				id: "patient-2",
				firstName: "Jane",
				middleName: "B.",
				lastName: "Smith",
				sex: "FEMALE",
				birthDate: new Date("1985-05-15"),
				region: "Oromia",
				city: "Adama",
				woreda: "02",
				kebele: 456,
				mobileNumber: "0912000000",
				password: "hashed_password",
				email: "jane.smith@example.com",
			},
		],
	});
	await prisma.medication.createMany({
		data: [
			{
				id: "med-1",
				name: "Aspirin",
				description: "Pain reliever and anti-inflammatory",
				price: 5.0,
				available: 100,
			},
			{
				id: "med-2",
				name: "Amoxicillin",
				description: "Antibiotic",
				price: 10.0,
				available: 50,
			},
			{
				id: "med-3",
				name: "Lisinopril",
				description: "Blood pressure medication",
				price: 7.0,
				available: 75,
			},
		],
	});
	await prisma.service.createMany({
		data: [
			{
				id: "service-1",
				name: "Consultation",
				description: "Service provided by doctor to patient",
				price: 200,
			},
			{
				id: "service-2",
				name: "Blood Test",
				description: "Comprehensive blood test",
				price: 30.0,
			},
			{
				id: "service-3",
				name: "X-Ray",
				description: "Chest X-ray",
				price: 75.0,
			},
		],
	});
	await prisma.invoice.create({
		data: {
			id: "invoice-1",
			status: "Unpaid",
			patientId: "patient-1",
			services: {
				connect: [{ id: "service-1" }, { id: "service-2" }],
			},
			Invoice_Medication: {
				create: [{ quantity: 2, medicationId: "med-1" }],
			},
		},
	});
	await prisma.invoice.create({
		data: {
			id: "invoice-2",
			status: "Paid",
			patientId: "patient-2",
			services: {
				connect: [{ id: "service-3" }],
			},
			Invoice_Medication: {
				create: [{ quantity: 1, medicationId: "med-3" }],
			},
		},
	});
	return NextResponse.json("Successful");
}

export type invoices = Prisma.InvoiceGetPayload<{
	include: {
		services: true;
		Invoice_Medication: { include: { medication: true } };
	};
}>;
