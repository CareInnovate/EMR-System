import React from "react";
import { props } from "./Prescription";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import SearchBox from "../SearchBox";

const Diagnosis = ({ data, setData }: props) => {
	const patientDiagnosis = data.diagnosis.map((diagnosis, ind) => {
		return (
			<div
				className="rounded-3xl px-5 py-2 bg-gray-200 flex items-center gap-3"
				key={ind}
			>
				<p>{diagnosis}</p>
				<FontAwesomeIcon
					icon={faClose}
					onClick={() => {
						setData((prev) => {
							return {
								...prev,
								diagnosis: prev.diagnosis.filter(
									(diag, i) => i !== ind
								),
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
				<p className="py-2">Patient&apos;s Diagnosis</p>
				<div className="flex gap-2">
					{data.diagnosis.length > 0 ? (
						patientDiagnosis
					) : (
						<p className="text-gray-400">No diagnosis selected</p>
					)}
				</div>
			</div>
			<div className="p-2 min-h-18 flex flex-col gap-2 mt-2">
				<SearchBox
					label="Diagnosis"
					name="diagnosis"
					fetchUrl="diseases"
					setData={setData}
					placeholder="Search for diagnosis ..."
				/>
			</div>
		</div>
	);
};

export default Diagnosis;
