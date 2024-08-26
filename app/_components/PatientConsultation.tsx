"use client";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, FormEvent, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";

type consultationData = {
	symptoms: Set<string>;
	examination: string[];
	diagnosis: string[];
	prescription: string[];
};
const PatientConsultation = () => {
	const [consulting, setConsulting] = useState<boolean>(false);
	const [data, setData] = useState<consultationData>({
		symptoms: new Set(),
		examination: [],
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
	function handleClick() {
		setConsulting((prev) => !prev);
	}
	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		let input = e.currentTarget.symptom.value as string;
		input = input.trim();
		const symptoms = new Set(input.split(/\s*,\s*/));
		setData((prev) => {
			const newSet = new Set(prev.symptoms);

			return {
				...prev,
				symptoms: newSet.union(symptoms),
			};
		});
		e.currentTarget.symptom.value = "";
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
							<Tab>Diagnose & Prescribe</Tab>
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
									onSubmit={handleSubmit}
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
							<div className="py-3 px-2 h-48">
								Examination goes here
								<input type="text" name="examination" />
							</div>
						</TabPanel>
						<TabPanel>
							<div className="py-3 px-2 h-48">
								Go here to diagnose the disease
								<input type="text" name="diagnose" />
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
