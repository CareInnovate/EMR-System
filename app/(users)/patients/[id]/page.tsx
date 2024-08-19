import PatientDetails from "@/app/_components/PatientDetails";
import { patient } from "@/app/api/patient/[id]/route";

export default async function PatientPage({
	params,
}: {
	params: { id: string };
}) {
	const res = await fetch(`http://localhost:3000/api/patient/${params.id}`, {
		cache: "no-cache",
	});
	const patient: patient = await res.json();
	return (
		<main className="w-3/4 mt-24 flex flex-col mx-auto gap-5 h-3/4 sm:text-lg text-sm">
			<PatientDetails patient={patient} />
			<div className="rounded-3xl w-full p-5 border-2 border-blue-900 flex flex-col gap-4 ">
				<h1 className="text-lg sm:text-2xl font-bold">
					Medical Records
				</h1>
				<div className="flex flex-col justify-center items-center gap-2">
					{patient.medicalRecords.length > 0 ? (
						patient.medicalRecords.map((record, ind) => {
							return (
								<div key={ind}>
									<p>
										{record.createdAt.toLocaleDateString()}
									</p>
									<p>{record.diagnosis}</p>
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
