"use client";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormEvent, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import InputBox from "./InputBox";
import SearchBox from "./SearchBox";
import Prescription from "./Consultation/Prescription";
import Diagnosis from "./Consultation/Diagnosis";
import Symptoms from "./Consultation/Symptoms";
import Examination from "./Consultation/Examination";
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
							<Symptoms
								data={data}
								setData={setData}
								handleSubmit={handleSubmit}
							/>
						</TabPanel>
						<TabPanel>
							<Examination handleSubmit={handleSubmit} />
						</TabPanel>
						<TabPanel>
							<Diagnosis data={data} setData={setData} />
						</TabPanel>
						<TabPanel>
							<Prescription data={data} setData={setData} />
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
