import { consultationData } from "@/app/_components/PatientConsultation";
import prisma from "@/app/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";

type reqBody = {
	patientId: string;
	doctorId: string;
	appointmentId: string;
	data: consultationData;
};
export async function POST(req: NextRequest) {
	const { patientId, doctorId, appointmentId, data }: reqBody =
		await req.json();
	const doctor = await prisma.doctor.findUnique({
		where: {
			staffId: doctorId,
		},
	});
	try {
		const medicalRecord = await prisma.medicalRecord.create({
			data: {
				diagnosis: data.diagnosis,
				patientId: patientId,
				doctorId: doctor?.id,
				appointmentId: appointmentId,
				medicalProcedures: data.examination,
				prescription: {
					createMany: {
						data: data.prescription.map((pres) => {
							return {
								dosage: pres.dosage,
								duration: pres.duration,
								medicationId: pres.medication.id,
								instruction: pres.instruction,
								quantity: pres.quantity,
							};
						}),
					},
				},
			},
		});
		return NextResponse.json(medicalRecord);
	} catch (e) {
		if (e instanceof PrismaClientKnownRequestError) {
			console.log("been here");
			if (e.code === "P2002") {
				const target: any = e.meta?.target;
				if (Array.from(target).includes("appointmentId")) {
					console.log(target);
					return NextResponse.json(
						{
							message:
								"You can't submit more than one medical records for a single appointment",
							error: true,
						},
						{ status: 500 }
					);
				}
			}
		}
		return NextResponse.json(
			{
				message: "There was a server error",
				error: true,
			},
			{ status: 500 }
		);
	}
}
