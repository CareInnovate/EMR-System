"use client";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormEvent, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import InputBox from "./InputBox";
import SearchBox from "./SearchBox";
export type examinationData = {
	vitals?: {
		temperature?: number;
		bloodPressure?: string;
		respiratoryRate?: number;
		pulseRate?: number;
	};
	heent?: string;
	lgs?: string;
};
export type consultationData = {
	symptoms: Set<string>;
	examination: examinationData;
	diagnosis: string[];
	prescription: string[];
};
const PatientConsultation = () => {
	const [consulting, setConsulting] = useState<boolean>(false);
	const [data, setData] = useState<consultationData>({
		symptoms: new Set(),
		examination: {},
		diagnosis: [],
		prescription: [],
	});

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
	function handleClick() {
		setConsulting((prev) => !prev);
	}
	function handleSubmit(
		e: FormEvent<HTMLFormElement>,
		field: string,
		data: Set<string> | examinationData
	) {
		if (field === "symptoms" && data instanceof Set) {
			setData((prev) => {
				const newSet = new Set(prev.symptoms);

				return {
					...prev,
					symptoms: newSet.union(data),
				};
			});
			e.currentTarget.reset();
		} else if (field === "examination" && !(data instanceof Set)) {
			setData((prev) => {
				return {
					...prev,
					examination: data,
				};
			});
		}
	}
	return (
		<div className="flex flex-col gap-5">
			<div className="w-full flex justify-end">
				<button
					className="px-5 py-2 bg-blue-900 text-white hover:bg-blue-700 hover:text-white rounded-md"
					onClick={handleClick}
				>
					{consulting ? "Finish" : "Start"} Consultation
				</button>
			</div>
			{consulting && (
				<div className="rounded-3xl w-full p-5 border-2 border-blue-700 flex flex-col gap-4 min-h-[500px] overflow-scroll">
					<Tabs selectedTabClassName="bg-blue-700 text-white rounded-t-lg">
						<TabList className={"border-b border-blue-700"}>
							<Tab>Symptoms</Tab>
							<Tab>Examination</Tab>
							<Tab>Diagnosis</Tab>
							<Tab>Prescription</Tab>
							<Tab>Review</Tab>
						</TabList>
						<TabPanel>
							<div className="py-3 px-2 h-48 flex flex-col gap-4 ">
								<div className="p-2 min-h-18 flex flex-col gap-2">
									<p className="py-2">
										Patient&apos;s Symptoms
									</p>
									{data.symptoms.size > 0 ? (
										<div className="flex flex-wrap gap-2">
											{patientSymptoms}
										</div>
									) : (
										<p className="text-gray-400">
											No symptoms selected
										</p>
									)}
								</div>
								<form
									className="flex gap-6 items-end"
									onSubmit={(e) => {
										e.preventDefault();
										let input = e.currentTarget.symptom
											.value as string;
										input = input.trim();
										const symptoms = new Set(
											input.split(/\s*,\s*/)
										);
										handleSubmit(e, "symptoms", symptoms);
										e.currentTarget.symptom.value = "";
									}}
								>
									<label className="flex flex-col gap-2 w-full">
										<span className=" p-2 w-full ">
											Symptoms:
										</span>
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
															const newSet =
																new Set(
																	prev.symptoms
																);
															newSet.add(symptom);
															return {
																...prev,
																symptoms:
																	newSet,
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
						</TabPanel>
						<TabPanel>
							<form
								className="py-3 px-2 h-48 flex flex-col gap-4"
								onSubmit={(e) => {
									e.preventDefault();
									const input = new FormData(e.currentTarget);
									let inputData: examinationData = {
										vitals: {
											temperature: parseInt(
												input.get(
													"temperature"
												) as string
											),
											bloodPressure: input.get(
												"bloodPressure"
											) as string,
											respiratoryRate: parseInt(
												input.get("respRate") as string
											),
											pulseRate: parseInt(
												input.get("pulseRate") as string
											),
										},
										heent: input.get("heent") as string,
										lgs: input.get("lgs") as string,
									};
									handleSubmit(e, "examination", inputData);
								}}
							>
								<div className="p-2 min-h-18 flex flex-col gap-2 ">
									<p className="py-2 font-bold text-xl">
										Vitals:
									</p>
									<div className="grid grid-cols-4 w-full">
										<InputBox
											label="Temperature"
											name="temperature"
											placeholder={
												"Temperature in \u00B0C"
											}
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
										<p className="py-2 font-bold text-xl">
											HEENT:
										</p>
										<textarea
											className="p-2 w-full border border-gray-300 rounded-md"
											rows={5}
											name="heent"
										></textarea>
									</div>
									<div className="p-2 min-h-18 flex flex-col gap-2 ">
										<p className="py-2 font-bold text-xl">
											LGS:
										</p>
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
						</TabPanel>
						<TabPanel>
							<div className="py-3 px-2 h-48 flex flex-col gap-4 ">
								<div className="p-2 min-h-18 flex flex-col gap-2">
									<p className="py-2">
										Patient&apos;s Diagnosis
									</p>
									<div className="flex gap-2">
										{data.diagnosis.length > 0 ? (
											patientDiagnosis
										) : (
											<p className="text-gray-400">
												No symptoms selected
											</p>
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
						</TabPanel>
						<TabPanel>
							<div className="py-3 px-2 h-48">
								Prescriptions
								<input type="text" name="review" />
							</div>
						</TabPanel>
						<TabPanel>
							<div className="py-3 px-2 h-48">
								Final Review before finish
								<input type="text" name="review" />
							</div>
						</TabPanel>
					</Tabs>
				</div>
			)}
		</div>
	);
};

export default PatientConsultation;
