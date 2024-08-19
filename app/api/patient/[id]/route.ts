import prisma from "@/app/client";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	const patient = await prisma.patient.findUnique({
		where: {
			id: params.id,
		},
		select: {
			password: false,
			email: false,
			firstName: true,
			middleName: true,
			lastName: true,
			birthDate: true,
			mobileNumber: true,
			sex: true,
			occupation: true,
			medicalRecords: true,
			patientRecord: true,
			appointments: true,
		},
	});
	return NextResponse.json(patient);
}

export type patient = Prisma.PatientGetPayload<{
	select: {
		password: false;
		email: false;
		firstName: true;
		middleName: true;
		lastName: true;
		birthDate: true;
		mobileNumber: true;
		sex: true;
		occupation: true;
		medicalRecords: true;
		patientRecord: true;
		appointments: true;
	};
}>;
