import PatientConsultation from "@/app/_components/PatientConsultation";
import PatientDetails from "@/app/_components/PatientDetails";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { patient } from "@/app/api/patient/[id]/route";
import { getServerSession } from "next-auth";
import { Fragment, ReactNode } from "react";

export default async function DoctorTreatmentPage({
	patientId,
	appointmentId,
}: {
	patientId: string;
	appointmentId?: string;
}) {
	const res = await fetch(`http://localhost:3000/api/patient/${patientId}`, {
		cache: "no-cache",
	});
	const patient: patient = await res.json();
	const doctor = await getServerSession(options);

	const patientMedicalRecords = patient.medicalRecords.reduce(
		(acc: ReactNode[], record) => {
			const doctor = record.appointment.doctor.staff;
			if (record.diagnosis.length > 0) {
				return [
					...acc,
					<Fragment key={record.id}>
						{record.diagnosis.map((diag, i) => {
							return (
								<div
									key={i}
									className="flex w-full bg-blue-100 p-5 rounded-lg"
								>
									<p className="w-full text-sm sm:text-lg">
										{diag}
									</p>
									<p className="w-full text-sm sm:text-lg">
										{`Dr. ${doctor.firstName} ${doctor.middleName}`}
									</p>
									<p className="w-1/3 text-center">
										{new Date(
											record.appointment.datetime
										).toLocaleDateString()}
									</p>
								</div>
							);
						})}
					</Fragment>,
				];
			}
			return acc;
		},
		[]
	);

	return (
		<main className="w-3/4 mt-24 flex flex-col mx-auto gap-5 h-3/4 sm:text-lg text-sm">
			<PatientDetails patient={patient} />
			{appointmentId && (
				<PatientConsultation
					patientId={patientId}
					doctorId={doctor?.user.id as string}
					appointmentId={appointmentId}
				/>
			)}

			<div className="rounded-3xl w-full p-5 border-2 border-blue-700 flex flex-col gap-4">
				<h1 className="text-lg sm:text-2xl font-bold">
					Past Medical Records
				</h1>
				<div className="flex flex-col justify-center items-center gap-2">
					<div className="flex w-full font-bold sm:text-lg md:text-xl p-5 rounded-lg">
						<p className="w-full">Diagnosis</p>
						<p className="w-full">Diagnosed by</p>
						<p className="w-1/3 text-center">Appointment Date</p>
					</div>
					{patientMedicalRecords.length > 0 ? (
						patientMedicalRecords
					) : (
						<p className="py-24">No previous medical records</p>
					)}
				</div>
			</div>
		</main>
	);
}
