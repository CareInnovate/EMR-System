import React, { Dispatch, SetStateAction } from "react";
import SearchBox from "../SearchBox";
import { consultationData } from "../PatientConsultation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

export type props = {
	data: consultationData;
	setData: Dispatch<SetStateAction<consultationData>>;
};
const Prescription = ({ data, setData }: props) => {
	const patientPrescription = data.prescription.map((prescription, ind) => {
		return (
			<div
				className="rounded-3xl px-5 py-2 bg-gray-200 flex items-center gap-3"
				key={ind}
			>
				<p>{prescription}</p>
				<FontAwesomeIcon
					icon={faClose}
					onClick={() => {
						setData((prev) => {
							return {
								...prev,
								prescription: prev.prescription.filter(
									(pres, i) => i !== ind
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
				<p className="py-2">Patient&apos;s Prescription</p>
				<div className="flex gap-2">
					{data.prescription.length > 0 ? (
						patientPrescription
					) : (
						<p className="text-gray-400">No medications selected</p>
					)}
				</div>
			</div>
			<div className="p-2 min-h-18 flex flex-col gap-2 mt-2">
				<SearchBox
					label="Medication"
					name="prescription"
					fetchUrl="medications"
					setData={setData}
					placeholder="Search for medication ..."
				/>
			</div>
		</div>
	);
};

export default Prescription;
