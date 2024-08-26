"use client";
import { ChangeEvent, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
const PatientConsultation = () => {
	const [consulting, setConsulting] = useState<boolean>(false);
	function handleClick() {
		setConsulting((prev) => !prev);
	}
	function handleInput(e: ChangeEvent<HTMLInputElement>) {
		const key = e.target.name;
		const value = e.target.value;

		// setData((prev) => ({ ...prev, [key]: prev[key] }));
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
				<div className="rounded-3xl w-full p-5 border-2 border-blue-700 flex flex-col gap-4">
					<Tabs selectedTabClassName="bg-blue-700 text-white rounded-t-lg">
						<TabList className={"border-b border-blue-700"}>
							<Tab>Symptoms</Tab>
							<Tab>Examination</Tab>
							<Tab>Diagnose & Prescribe</Tab>
							<Tab>Review</Tab>
						</TabList>
						<TabPanel>
							<div className="py-3 px-2 h-48">
								Symptoms go here
								<input
									type="text"
									name="symptom"
									onChange={handleInput}
								/>
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
