import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import SearchBox from "../SearchBox";
import { consultationData } from "../PatientConsultation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import Popup from "../Popup";
import { Medication } from "@prisma/client";

export type props = {
	data: consultationData;
	setData: Dispatch<SetStateAction<consultationData>>;
};
const Prescription = ({ data, setData }: props) => {
	const [popup, setPopup] = useState<boolean>(false);
	const [error, setError] = useState<string>("");
	const [medication, setMedication] = useState<Medication>();
	const quantity = useRef<HTMLInputElement>(null);
	const additionalInstructions = useRef<HTMLTextAreaElement>(null);

	const [dosage, setDosage] = useState<number>(-1);
	const [duration, setDuration] = useState<number>(-1);
	const dosages = [
		"1 tablet, 2x per day",
		"1 tablet, 3x per day",
		"2 tablet, 2x per day",
		"2 tablet, 3x per day",
	];
	const durations = [
		{ key: "5 days", value: 5 * 24 * 60 * 60 * 1000 },
		{ key: "1 week", value: 7 * 24 * 60 * 60 * 1000 },
		{ key: "2 weeks", value: 14 * 24 * 60 * 60 * 1000 },
	];
	function handleSave() {
		if (medication === undefined) {
			return setError("You didn't select a medication");
		}
		if (dosage === -1) {
			setError("You must select a dosage");
		} else if (duration === -1) {
			setError("You must select a duration");
		} else {
			setError("");
			setData((prev) => {
				return {
					...prev,
					prescription: [
						...prev.prescription,
						{
							dosage: dosages[dosage],
							duration: durations[duration].value,
							medication: medication,
							quantity: parseInt(
								quantity.current?.value as string
							),
							instruction: additionalInstructions.current
								?.value as string,
						},
					],
				};
			});
			setPopup(false);
		}
	}

	const patientPrescription = data.prescription.map((prescription, ind) => {
		return (
			<div
				className="rounded-3xl px-5 py-2 bg-gray-200 flex items-center gap-3"
				key={ind}
			>
				<p>{prescription.medication?.name}</p>
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
		<>
			<div className="py-3 px-2 h-48 flex flex-col gap-4 ">
				<div className="p-2 min-h-18 flex flex-col gap-2">
					<p className="py-2">Patient&apos;s Prescription</p>
					<div className="flex gap-2">
						{data.prescription.length > 0 ? (
							patientPrescription
						) : (
							<p className="text-gray-400">
								No medications selected
							</p>
						)}
					</div>
				</div>
				<div className="p-2 min-h-18 flex flex-col gap-2 mt-2">
					<SearchBox
						label="Medication"
						name="prescription"
						fetchUrl="medications"
						setMedication={(med: Medication) => {
							setMedication(med);
							setPopup(true);
						}}
						placeholder="Search for medication ..."
					/>
				</div>
			</div>
			<Popup isOpen={popup}>
				<div className="flex flex-col p-5 justify-between h-full">
					{error && (
						<div className="absolute top-0 left-0 w-full py-2 px-4 bg-red-300 rounded-t-md flex justify-between items-center">
							<p className="text-red-950 w-full text-center">
								{error}
							</p>
							<FontAwesomeIcon
								icon={faClose}
								onClick={() => setError("")}
							/>
						</div>
					)}
					<div
						className={`flex flex-col p-2 gap-2 ${error && "mt-8"}`}
					>
						<div className="flex flex-col gap-5 justify-center">
							<h1>
								<strong>Medication:</strong> {medication?.name}
							</h1>
							<div className="flex gap-3 items-center mt-2">
								<h1>Quantity:</h1>
								<input
									type="number"
									name="quantity"
									id="quantity"
									ref={quantity}
									min={1}
									defaultValue={1}
									className="w-16 border border-gray-300 rounded-md px-2 py-1"
								/>
							</div>
						</div>
						<div className="grid grid-cols-2 gap-2">
							<div className="min-h-24 flex flex-col gap-2">
								<p className="py-2">Dosage</p>
								<div className="flex flex-wrap gap-2 ">
									{dosages.map((dose, ind) => {
										return (
											<div
												className={`rounded-3xl px-5 py-2 cursor-pointer ${
													dosage === ind
														? "bg-blue-700 text-white"
														: "bg-gray-200 text-black"
												}`}
												key={ind}
												onClick={() => setDosage(ind)}
											>
												{dose}
											</div>
										);
									})}
								</div>
							</div>
							<div className="p-2 min-h-24 flex flex-col gap-2">
								<p className="py-2">Duration</p>
								<div className="flex flex-wrap gap-2 ">
									{durations.map((dose, ind) => {
										return (
											<div
												className={`rounded-3xl px-5 py-2 cursor-pointer ${
													duration === ind
														? "bg-blue-700 text-white"
														: "bg-gray-200 text-black"
												}`}
												key={ind}
												onClick={() => setDuration(ind)}
											>
												{dose.key}
											</div>
										);
									})}
								</div>
							</div>
							<div className="col-span-2 mb-2">
								<p className="py-2">Additional Instructions</p>
								<textarea
									className="border border-gray-300 rounded-md px-2 py-1 w-full"
									rows={3}
									ref={additionalInstructions}
								></textarea>
							</div>
						</div>
					</div>
					<div className="flex justify-end w-full pr-5 gap-2">
						<button
							className="border border-blue-950 text-blue-900 w-1/3 py-2 md:w-auto md:py-3 md:px-8 rounded-md"
							onClick={() => {
								setDosage(-1);
								setDuration(-1);
								setError("");
								setPopup(false);
							}}
							type="button"
						>
							Cancel
						</button>
						<button
							type="submit"
							className="bg-blue-950 text-white w-1/3 py-2 md:w-auto md:py-3 md:px-8 rounded-md"
							onClick={handleSave}
						>
							Save
						</button>
					</div>
				</div>
			</Popup>
		</>
	);
};

export default Prescription;
