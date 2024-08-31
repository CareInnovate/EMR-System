import React, { MouseEventHandler } from "react";
import { consultationData } from "../PatientConsultation";
import { useSession } from "next-auth/react";

const Review = ({
	data,
	handleSave,
}: {
	data: consultationData;
	handleSave: MouseEventHandler<HTMLButtonElement>;
}) => {
	const patientSymptoms = Array.from(data.symptoms).map((symptom, ind) => {
		return (
			<div
				className="rounded-3xl px-5 py-2 bg-gray-200 flex items-center gap-3"
				key={ind}
			>
				<p>{symptom}</p>
			</div>
		);
	});
	const patientDiagnosis = data.diagnosis.map((diagnosis, ind) => {
		return (
			<div
				className="rounded-3xl px-5 py-2 bg-gray-200 flex items-center gap-3"
				key={ind}
			>
				<p>{diagnosis}</p>
			</div>
		);
	});
	const patientPrescription = data.prescription.map((prescription, ind) => {
		return (
			<div
				className="rounded-3xl px-5 py-2 bg-gray-200 flex items-center gap-3"
				key={ind}
			>
				<p>{prescription.medication?.name}</p>
			</div>
		);
	});
	return (
		<div className="py-3 px-2 h-48 flex flex-col gap-4">
			<div className="flex flex-col gap-2">
				<h1 className="border-b border-gray-400">Symptoms</h1>
				{data.symptoms.size > 0 ? (
					<div className="flex flex-wrap gap-2">
						{patientSymptoms}
					</div>
				) : (
					<p className="text-gray-400">No symptoms selected</p>
				)}
			</div>
			<div className="flex flex-col gap-2">
				<h1 className="border-b border-gray-400">Examination</h1>
				<div className="grid grid-cols-4 gap-2">
					<p>
						<strong>Temp: </strong>
						{data.examination.vitals?.temperature
							? `${data.examination.vitals?.temperature} \u00B0C`
							: "Unknown"}
					</p>
					<p>
						<strong>Blood Pressure: </strong>
						{data.examination.vitals?.bloodPressure
							? `${data.examination.vitals?.bloodPressure} mmHg`
							: "Unknown"}
					</p>
					<p>
						<strong>Respiratory Rate: </strong>
						{data.examination.vitals?.respiratoryRate
							? `${data.examination.vitals?.respiratoryRate} bpm`
							: "Unknown"}
					</p>
					<p>
						<strong>Pulse Rate: </strong>
						{data.examination.vitals?.pulseRate
							? `${data.examination.vitals?.pulseRate} bpm`
							: "Unknown"}
					</p>
					<p className="col-span-2">
						<strong>HEENT: </strong>
						{data.examination.heent || "Not specified"}
					</p>
					<p className="col-span-2">
						<strong>LGS: </strong>
						{data.examination.lgs || "Not specified"}
					</p>
				</div>
			</div>
			<div className="flex flex-col gap-2">
				<h1 className="border-b border-gray-400">Diagnosis</h1>
				{data.diagnosis.length > 0 ? (
					<div className="flex flex-wrap gap-2">
						{patientDiagnosis}
					</div>
				) : (
					<p className="text-gray-400">No diagnosis specified</p>
				)}
			</div>
			<div className="flex flex-col gap-2">
				<h1 className="border-b border-gray-400">Prescription</h1>
				{data.prescription.length > 0 ? (
					<div className="flex flex-wrap gap-2">
						{patientPrescription}
					</div>
				) : (
					<p className="text-gray-400">No medication prescribed</p>
				)}
			</div>
			<div className="flex justify-end w-full pr-5 gap-2">
				<button
					type="submit"
					className="bg-blue-950 text-white w-1/3 py-2 md:w-auto md:py-3 md:px-8 rounded-md"
					onClick={handleSave}
				>
					Finish
				</button>
			</div>
		</div>
	);
};

export default Review;
