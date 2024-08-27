import React, { Dispatch, SetStateAction } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { consultationData } from "../PatientConsultation";

type props = {
	data: consultationData;
	setData: Dispatch<SetStateAction<consultationData>>;
	handleSubmit: Function;
};
const Symptoms = ({ data, setData, handleSubmit }: props) => {
	const commonSymptoms = [
		"Fever",
		"Cough",
		"Abdominal Pain",
		"Chest Pain",
		"Anxiety",
		"Back Pain",
		"Constipation",
		"Diarrhea",
		"Depression",
		"Nausea/Vomiting",
		"Sore throat",
		"Heart Burn",
	];
	const patientSymptoms = Array.from(data.symptoms).map((symptom, ind) => {
		return (
			<div
				className="rounded-3xl px-5 py-2 bg-gray-200 flex items-center gap-3"
				key={ind}
			>
				<p>{symptom}</p>
				<FontAwesomeIcon
					icon={faClose}
					onClick={() => {
						setData((prev) => {
							const newSet = new Set(prev.symptoms);
							newSet.delete(symptom);
							return {
								...prev,
								symptoms: newSet,
							};
						});
					}}
					className="cursor-pointer text-gray-600 mt-0.5"
				/>
			</div>
		);
	});
	return (
		<div className="py-3 px-2 h-48 flex flex-col gap-4 ">
			<div className="p-2 min-h-18 flex flex-col gap-2">
				<p className="py-2">Patient&apos;s Symptoms</p>
				{data.symptoms.size > 0 ? (
					<div className="flex flex-wrap gap-2">
						{patientSymptoms}
					</div>
				) : (
					<p className="text-gray-400">No symptoms selected</p>
				)}
			</div>
			<form
				className="flex gap-6 items-end"
				onSubmit={(e) => {
					e.preventDefault();
					let input = e.currentTarget.symptom.value as string;
					input = input.trim();
					const symptoms = new Set(input.split(/\s*,\s*/));
					handleSubmit(e, "symptoms", symptoms);
					e.currentTarget.symptom.value = "";
				}}
			>
				<label className="flex flex-col gap-2 w-full">
					<span className=" p-2 w-full ">Symptoms:</span>
					<input
						className="ml-2 p-2 w-full border border-gray-300 rounded-md"
						type="text"
						name="symptom"
						id="symptom"
						placeholder="Add symptoms here"
					/>
				</label>
				<button
					className="w-1/12 py-2.5 bg-blue-700 text-white font-bold rounded"
					type="submit"
				>
					Add
				</button>
			</form>
			<div className="p-2 min-h-24 flex flex-col gap-2">
				<p className="py-2">Common Symptoms</p>
				<div className="flex flex-wrap gap-2 ">
					{commonSymptoms.map((symptom, ind) => {
						return (
							<div
								className="rounded-3xl px-5 py-2 bg-gray-200 cursor-pointer"
								key={ind}
								onClick={() => {
									setData((prev) => {
										const newSet = new Set(prev.symptoms);
										newSet.add(symptom);
										return {
											...prev,
											symptoms: newSet,
										};
									});
								}}
							>
								{symptom}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Symptoms;
