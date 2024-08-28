import { consultationData } from "@/app/_components/PatientConsultation";
import prisma from "@/app/client";
import { NextRequest, NextResponse } from "next/server";

type reqBody = {
	patientId: string;
	doctorId: string;
	data: consultationData;
};
export async function POST(req: NextRequest) {
	const { patientId, doctorId, data }: reqBody = await req.json();
	const doctor = await prisma.doctor.findUnique({
		where: {
			staffId: doctorId,
		},
	});

	//TODO: update the appointment id
	const medicalRecord = await prisma.medicalRecord.create({
		data: {
			diagnosis: data.diagnosis,
			patientId: patientId,
			doctorId: doctor?.id,
			appointmentId: "1st-app",
			medicalProcedures: data.examination,
			prescription: {
				connect: data.prescription.map((pres) => ({
					id: pres.medication?.id,
				})),
			},
		},
	});
	return NextResponse.json(medicalRecord);
}
