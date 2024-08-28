"use client";
import { FormEvent, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Prescription from "./Consultation/Prescription";
import Diagnosis from "./Consultation/Diagnosis";
import Symptoms from "./Consultation/Symptoms";
import Examination from "./Consultation/Examination";
import Review from "./Consultation/Review";
import { SessionProvider } from "next-auth/react";
import { useConfirm } from "../_hooks/useConfirm";
import Popup from "./Popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";
import { Medication } from "@prisma/client";
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
export type prescriptionData = {
	medication?: Medication;
	dosage: string;
	duration: string;
	quantity: number;
	instruction?: string;
};
export type consultationData = {
	symptoms: Set<string>;
	examination: examinationData;
	diagnosis: string[];
	prescription: prescriptionData[];
};
const PatientConsultation = ({
	patientId,
	doctorId,
}: {
	patientId: string;
	doctorId: string;
}) => {
	const [consulting, setConsulting] = useState<boolean>(false);
	const [data, setData] = useState<consultationData>({
		symptoms: new Set(),
		examination: {},
		diagnosis: [],
		prescription: [],
	});
	const { open, handleConfirm, handleCancel, confirm } = useConfirm();

	async function handleSave() {
		await fetch("http://localhost:3000/api/medicalRecord", {
			method: "POST",
			body: JSON.stringify({
				patientId: patientId,
				doctorId: doctorId,
				data: data,
			}),
		});
	}
	async function handleClick() {
		let confirmed = true;
		if (consulting) {
			confirmed = (await confirm()) as boolean;
		}
		confirmed && setConsulting((prev) => !prev);
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
			<Popup isOpen={open}>
				<div className="flex flex-col p-10 m-auto absolute inset-0 bg-white items-center justify-around gap-5 text-center">
					<FontAwesomeIcon
						icon={faWarning}
						className={`text-7xl text-orange-400`}
					/>
					<div className="text-gray-600 text-xl">
						<p>Are you sure you want to stop the consultation?</p>
						<p>Your data will be lost</p>
					</div>
					<div className="flex w-full justify-end gap-2">
						<button
							className="py-2 px-5 rounded-md text-xl border border-blue-950 text-blue-900"
							onClick={handleCancel}
						>
							No
						</button>
						<button
							className="py-2 px-5 rounded-md text-xl bg-blue-900 text-white"
							onClick={handleConfirm}
						>
							Yes
						</button>
					</div>
				</div>
			</Popup>
			<div className="w-full flex justify-end">
				<button
					className="px-5 py-2 bg-blue-900 text-white hover:bg-blue-700 hover:text-white rounded-md"
					onClick={handleClick}
				>
					{consulting ? "Stop" : "Start"} Consultation
				</button>
			</div>
			{consulting && (
				<div className="rounded-3xl w-full p-5 border-2 border-blue-700 flex flex-col gap-4 min-h-[550px] overflow-scroll h-fit">
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
							<SessionProvider>
								<Review data={data} handleSave={handleSave} />
							</SessionProvider>
						</TabPanel>
					</Tabs>
				</div>
			)}
		</div>
	);
};

export default PatientConsultation;
