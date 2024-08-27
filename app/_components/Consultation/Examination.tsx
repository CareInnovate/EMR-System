import React from "react";
import InputBox from "../InputBox";
import { examinationData } from "../PatientConsultation";

const Examination = ({ handleSubmit }: { handleSubmit: Function }) => {
	return (
		<form
			className="py-3 px-2 h-48 flex flex-col gap-4"
			onSubmit={(e) => {
				e.preventDefault();
				const input = new FormData(e.currentTarget);
				let inputData: examinationData = {
					vitals: {
						temperature: parseInt(
							input.get("temperature") as string
						),
						bloodPressure: input.get("bloodPressure") as string,
						respiratoryRate: parseInt(
							input.get("respRate") as string
						),
						pulseRate: parseInt(input.get("pulseRate") as string),
					},
					heent: input.get("heent") as string,
					lgs: input.get("lgs") as string,
				};
				handleSubmit(e, "examination", inputData);
			}}
		>
			<div className="p-2 min-h-18 flex flex-col gap-2 ">
				<p className="py-2 font-bold text-xl">Vitals:</p>
				<div className="grid grid-cols-4 w-full">
					<InputBox
						label="Temperature"
						name="temperature"
						placeholder={"Temperature in \u00B0C"}
						type="number"
					/>
					<InputBox
						label="Blood Pressure"
						name="bloodPressure"
						placeholder="Blood Pressure in mmHg"
					/>
					<InputBox
						label="Respiratory Rate"
						name="respRate"
						placeholder="Respiratory Rate in bpm"
						type="number"
					/>
					<InputBox
						label="Pulse Rate"
						name="pulseRate"
						placeholder="Pulse Rate in bpm"
						type="number"
					/>
				</div>
			</div>
			<div className="grid grid-cols-2 gap-4 pr-5">
				<div className="p-2 min-h-18 flex flex-col gap-2">
					<p className="py-2 font-bold text-xl">HEENT:</p>
					<textarea
						className="p-2 w-full border border-gray-300 rounded-md"
						rows={5}
						name="heent"
					></textarea>
				</div>
				<div className="p-2 min-h-18 flex flex-col gap-2 ">
					<p className="py-2 font-bold text-xl">LGS:</p>
					<textarea
						className="p-2 w-full border border-gray-300 rounded-md"
						name="lgs"
						rows={5}
					></textarea>
				</div>
			</div>
			<div className="lg:col-span-2 flex justify-end w-full mx-auto mt-3 gap-2 pb-5 pr-5">
				<button
					type="submit"
					className="bg-blue-950 text-white w-1/3 py-2 md:w-auto md:py-4 md:px-12 rounded-md"
				>
					Save
				</button>
			</div>
		</form>
	);
};

export default Examination;
