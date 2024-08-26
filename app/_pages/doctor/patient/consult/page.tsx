import PatientDetails from "@/app/_components/PatientDetails";
import { patient } from "@/app/api/patient/[id]/route";
import Link from "next/link";

export default async function DoctorTreatmentPage({
	params,
}: {
	params: {
		id: string;
	};
}) {
	const res = await fetch(`http://localhost:3000/api/patient/${params.id}`, {
		cache: "no-cache",
	});
	const patient: patient = await res.json();
	return (
		<main className="w-3/4 mt-24 flex flex-col mx-auto gap-5 h-3/4 sm:text-lg text-sm">
			<div className="w-full flex justify-end">
				<Link
					href={`${params.id}/consult`}
					className="px-5 py-2 bg-blue-900 text-white hover:bg-blue-700 hover:text-white rounded-md"
				>
					Start Consultation
				</Link>
			</div>
			<PatientDetails patient={patient} />

			<div className="rounded-3xl w-full p-5 border-2 border-blue-700 flex flex-col gap-4 ">
				<h1 className="text-lg sm:text-2xl font-bold">
					Past Medical Records
				</h1>
				<div className="flex flex-col justify-center items-center gap-2">
					<div className="flex w-full font-bold sm:text-lg md:text-xl p-5 rounded-lg">
						<p className="w-full">Diagnosis</p>
						<p className="w-full">Diagnosed by</p>
						<p className="w-1/3 text-center">Appointment Date</p>
					</div>
					{patient.medicalRecords.length > 0 ? (
						patient.medicalRecords.map((record, ind) => {
							const doctor = record.appointment.doctor.staff;
							return (
								<div
									key={ind}
									className="flex w-full bg-blue-100 p-5 rounded-lg"
								>
									<p className="w-full text-sm sm:text-lg">
										{record.diagnosis}
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
						})
					) : (
						<p className="py-24">No previous medical records</p>
					)}
				</div>
			</div>
		</main>
	);
}
