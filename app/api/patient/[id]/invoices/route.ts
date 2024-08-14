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
	await prisma.role.createMany({
		data: [
			{
				id: "role-doctor",
				name: "Doctor",
			},
			{
				id: "role-receptionist",
				name: "Receptionist",
			},
			{
				id: "role-administrator",
				name: "Administrator",
			},
		],
	});
	await prisma.permission.createMany({
		data: [
			{
				id: "perm-001",
				name: "View Patient Records",
				description: "Allows viewing of patient records",
				roleId: "role-doctor",
			},
			{
				id: "perm-002",
				name: "Edit Patient Records",
				description: "Allows editing of patient records",
				roleId: "role-doctor",
			},
			{
				id: "perm-003",
				name: "Manage Appointments",
				description: "Allows managing of patient appointments",
				roleId: "role-receptionist",
			},
			{
				id: "perm-004",
				name: "Manage Staff",
				description: "Allows managing of staff information",
				roleId: "role-administrator",
			},
			{
				id: "perm-005",
				name: "Access Admin Dashboard",
				description: "Allows access to the admin dashboard",
				roleId: "role-administrator",
			},
		],
	});
	await prisma.staff.createMany({
		data: [
			{
				username: "drjohnsmith",
				password: "securepassword123",
				firstName: "John",
				middleName: "Michael",
				lastName: "Smith",
				sex: "MALE",
				birthDate: new Date("1980-06-15"),
				region: "Addis Ababa",
				city: "Addis Ababa",
				woreda: "04",
				kebele: 12,
				mobileNumber: "0912345678",
				email: "john.smith@example.com",
				roleId: "role-doctor",
				specialization: "Cardiology",
				hireDate: new Date("2015-03-25"),
				emergencyContact: "0911234567",
				employmentStatus: "Active",
				notes: ["Highly experienced in cardiac surgeries"],
			},
			{
				id: "staff-002",
				username: "reception001",
				password: "securepassword456",
				firstName: "Martha",
				middleName: "Jane",
				lastName: "Doe",
				sex: "FEMALE",
				birthDate: new Date("1992-08-20"),
				region: "Oromia",
				city: "Adama",
				woreda: "03",
				kebele: 15,
				mobileNumber: "0912345679",
				email: "martha.doe@example.com",
				roleId: "role-receptionist",
				hireDate: new Date("2018-06-01"),
				emergencyContact: "0911234568",
				employmentStatus: "Active",
				notes: ["Excellent communication skills"],
			},
			{
				id: "staff-003",
				username: "admin001",
				password: "securepassword789",
				firstName: "David",
				middleName: "Andrew",
				lastName: "Johnson",
				sex: "MALE",
				birthDate: new Date("1975-12-05"),
				region: "Amhara",
				city: "Bahir Dar",
				woreda: "02",
				kebele: 8,
				mobileNumber: "0912345680",
				email: "david.johnson@example.com",
				roleId: "role-administrator",
				hireDate: new Date("2012-01-15"),
				emergencyContact: "0911234569",
				employmentStatus: "Active",
				notes: ["Experienced in hospital administration"],
			},
		],
	});
	await prisma.doctor.create({
		data: {
			staff: { connect: { username: "drjohnsmith" } },
			patients: {
				connect: [{ id: "patient-1" }, { id: "patient-2" }],
			},
			appointments: {
				create: [
					{
						datetime: new Date("2024-11-05"),
						patientId: "patient-1",
						type: "Check up",
					},
				],
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
