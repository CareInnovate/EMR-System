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
			medicalRecords: {
				include: {
					appointment: {
						include: {
							doctor: {
								select: {
									staff: {
										select: {
											firstName: true,
											lastName: true,
											middleName: true,
										},
									},
								},
							},
						},
					},
				},
				orderBy: {
					appointment: {
						datetime: "desc",
					},
				},
			},
			patientRecord: true,
			appointments: true,
		},
	});
	return NextResponse.json(patient);
}

export async function POST(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	const patient = await prisma.patient.update({
		data: {
			appointments: {
				createMany: {
					data: [
						{
							datetime: new Date("2024-07-20"),
							doctorId: "84217cb9-4af4-4a92-941d-3d26fb64e2de",
							type: "Check-up",
							id: "3rd-app",
						},
						{
							datetime: new Date("2024-05-10"),
							doctorId: "84217cb9-4af4-4a92-941d-3d26fb64e2de",
							type: "Check-up",
							id: "2nd-app",
						},
						{
							datetime: new Date("2024-05-15"),
							doctorId: "84217cb9-4af4-4a92-941d-3d26fb64e2de",
							type: "Check-up",
							id: "1st-app",
						},
					],
				},
			},
			doctorId: "84217cb9-4af4-4a92-941d-3d26fb64e2de",
			medicalRecords: {
				createMany: {
					data: [
						{
							appointmentId: "1st-app",
							diagnosis: "Common Cold",
							treatmentPlan: "Example treatment plan",
							notes: "Example notes",
						},
						{
							appointmentId: "2nd-app",
							diagnosis: "Diabetes",
							treatmentPlan: "Example treatment plan",
							notes: "Example notes",
						},
						{
							appointmentId: "3rd-app",
							diagnosis: "Cancer",
							treatmentPlan: "Example treatment plan",
							notes: "Example notes",
						},
					],
				},
			},
			patientRecord: {
				create: {
					patientCondition: "Mild",
					allergies: ["Peanuts"],
					bloodPressure: "120/80",
					bloodType: "B+",
					familyHistory: "myopia",
					height: 184,
					weight: 55,
				},
			},
			password: "123456789",
		},
		where: {
			id: params.id,
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
		medicalRecords: {
			include: {
				appointment: {
					include: {
						doctor: {
							select: {
								staff: {
									select: {
										firstName: true;
										lastName: true;
										middleName: true;
									};
								};
							};
						};
					};
				};
			};
		};
		patientRecord: true;
		appointments: true;
	};
}>;
