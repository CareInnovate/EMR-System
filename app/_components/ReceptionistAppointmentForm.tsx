import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import Popup from "./Popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faClose } from "@fortawesome/free-solid-svg-icons";
import AppointmentForm from "./AppointmentForm";
import { useConfirm } from "../_hooks/useConfirm";
import PatientSearch from "./Appointment/PatientSearch";
import { Patient } from "@prisma/client";
import { patientAppointment } from "../api/appointments/route";
import { isAppointment } from "../_pages/patient/appointments/page";
import { event } from "./Calendar";

type props = {
	setEvents: Dispatch<SetStateAction<event[]>>;
	popup: boolean;
	setPopup: Dispatch<SetStateAction<boolean>>;
};
const ReceptionistAppointmentForm = ({ setEvents, popup, setPopup }: props) => {
	const { open, confirm, handleCancel, handleConfirm } = useConfirm();
	const [error, setError] = useState<string>();
	const [timeSlots, setTimeSlots] = useState<Record<string, number>>();
	const form = useRef<HTMLFormElement>(null);
	return (
		<>
			<Popup
				isOpen={popup}
				fullWidth={true}
				noMinHeight={true}
				setOpen={setPopup}
			>
				<div className="flex flex-col w-full relative pt-7">
					<div className="w-full flex justify-end py-4 px-5 text-2xl absolute right-0 top-0">
						<FontAwesomeIcon
							icon={faClose}
							onClick={() => setPopup(false)}
							className="cursor-pointer text-blue-950 hover:text-blue-800"
						/>
					</div>
					<PatientSearch
						selectPatient={async (patient: Patient) => {
							const res = await confirm();
							console.log(res);
							if (res) {
								//TODO: make better error handling
								if (form.current === null) {
									return "Error";
								}
								const formData = new FormData(form.current);
								const date = formData.get("date") as string;
								const time = formData.get("time") as string;
								const body = {
									date: new Date(`${date}T${time}`),
									patientId: patient.id,
								};
								const res = await fetch(
									`http://localhost:3000/api/appointments/${formData.get(
										"department"
									)}`,
									{
										method: "POST",
										body: JSON.stringify(body),
									}
								);
								const data:
									| patientAppointment
									| { error: string } = await res.json();
								if (isAppointment(data)) {
									const newEvent: event = {
										data: { id: data.id },
										start: new Date(data.datetime),
										end: new Date(
											new Date(data.datetime).getTime() +
												30 * 60000
										),
										title: `${
											patient.sex === "MALE"
												? "Mr."
												: "Mrs./Ms."
										} ${patient.firstName} ${
											patient.middleName
										} ${patient.lastName}`,
										resourceId: data.doctorId,
									};
									setEvents((prev) => [...prev, newEvent]);
									setPopup(false);
								} else {
									setError(data.error);
								}
								setTimeSlots({});
								form.current.reset();
							}
						}}
					/>
				</div>
			</Popup>
			<Popup isOpen={open}>
				<div className="flex flex-col p-10 m-auto absolute inset-0 bg-white items-center justify-between gap-5 text-center">
					{error && (
						<div className="absolute top-0 left-0 w-full py-2 px-4 bg-red-300 rounded-t-md flex justify-between items-center">
							<p className="text-red-950 w-full text-center">
								{error}
							</p>
							<FontAwesomeIcon
								icon={faClose}
								onClick={() => setError("")}
								className="cursor-pointer"
							/>
						</div>
					)}
					<AppointmentForm
						departments={[
							{
								id: "general-id",
								name: "General",
								description: null,
							},
						]}
						setTimeSlots={setTimeSlots}
						timeSlots={timeSlots}
						form={form}
					/>

					<div className="flex w-full justify-end gap-2">
						<button
							className="py-2 px-5 rounded-md text-xl border border-blue-950 text-blue-900"
							onClick={() => {
								form.current && form.current.reset();
								setTimeSlots({});
								handleCancel();
							}}
						>
							Cancel
						</button>
						<button
							className="py-2 px-5 rounded-md text-xl bg-blue-900 text-white"
							onClick={handleConfirm}
						>
							Save
						</button>
					</div>
				</div>
			</Popup>
		</>
	);
};

export default ReceptionistAppointmentForm;
