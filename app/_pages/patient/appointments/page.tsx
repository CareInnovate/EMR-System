"use client";
import AppointmentForm from "@/app/_components/AppointmentForm";
import Popup from "@/app/_components/Popup";
import { useAppointment } from "@/app/_hooks/useAppointment";
import { useConfirm } from "@/app/_hooks/useConfirm";
import { patientAppointment } from "@/app/api/appointments/route";
import {
	faClose,
	faEdit,
	faTrash,
	faWarning,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Department } from "@prisma/client";
import { useRef, useState } from "react";

enum PopupTypes {
	Update,
	Create,
	None,
}

type props = {
	initialAppointments: patientAppointment[];
	departments: Department[];
	patientId: string;
};

export default function PatientAppointments({
	initialAppointments,
	departments,
	patientId,
}: props) {
	const [popup, setPopup] = useState<PopupTypes>(PopupTypes.None);
	const [error, setError] = useState<string>();
	const [appointments, setAppointments] = useAppointment(initialAppointments);
	const { open, confirm, handleCancel, handleConfirm } = useConfirm();
	const [timeSlots, setTimeSlots] = useState<Record<string, number>>();
	const [edit, setEdit] = useState<{
		appId: string;
		dept?: string;
		datetime?: Date;
		docId?: string;
	}>();
	const form = useRef<HTMLFormElement>(null);
	async function handleSubmit() {
		if (form.current === null) {
			return "Error";
		}
		const formData = new FormData(form.current);
		const date = formData.get("date") as string;
		const time = formData.get("time") as string;
		const body = {
			date: new Date(`${date}T${time}`),
			patientId: patientId,
			appointmentId: edit?.appId,
			doctorId: edit?.docId,
		};
		const res = await fetch(
			`http://localhost:3000/api/appointments/${formData.get(
				"department"
			)}`,
			{
				method: popup === PopupTypes.Create ? "POST" : "PUT",
				body: JSON.stringify(body),
			}
		);
		const data: patientAppointment | { error: string } = await res.json();
		if (isAppointment(data)) {
			if (popup === PopupTypes.Create) {
				setAppointments((prev) => [...prev, data]);
			} else {
				setAppointments((prev) => [
					...prev.filter((val) => val.id !== data.id),
					data,
				]);
			}
			setPopup(PopupTypes.None);
		} else {
			setError(data.error);
		}
		setTimeSlots({});
		setEdit(undefined);
		form.current.reset();
	}
	return (
		<main className="w-full mt-24 flex flex-col items-center gap-3 py-1 px-9 sm:px-5">
			{
				<Popup isOpen={popup !== PopupTypes.None}>
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
							departments={departments}
							setTimeSlots={setTimeSlots}
							timeSlots={timeSlots}
							form={form}
							defaultValue={edit}
						/>

						<div className="flex w-full justify-end gap-2">
							<button
								className="py-2 px-5 rounded-md text-xl border border-blue-950 text-blue-900"
								onClick={() => {
									form.current && form.current.reset();
									setEdit(undefined);
									setTimeSlots({});
									setPopup(PopupTypes.None);
								}}
							>
								Cancel
							</button>
							<button
								className="py-2 px-5 rounded-md text-xl bg-blue-900 text-white"
								onClick={handleSubmit}
							>
								Save
							</button>
						</div>
					</div>
				</Popup>
			}
			{
				<Popup isOpen={open}>
					<div className="flex flex-col p-10 m-auto absolute inset-0 bg-white items-center justify-around gap-5 text-center">
						<FontAwesomeIcon
							icon={faWarning}
							className={`text-7xl text-orange-400`}
						/>
						<div className="text-gray-600 text-xl">
							<p>
								Are you sure you want to cancel this
								appointment?
							</p>
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
			}
			<h1 className="text-2xl sm:text-4xl mb-5 w-full sm:w-3/4 text-left">
				My Appointments
			</h1>
			<table className="w-full sm:w-3/4 text-sm sm:text-lg border border-blue-700">
				<thead>
					<tr className="text-xl p-14">
						<th>Doctor</th>
						<th>Date</th>
						<th>Time</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{appointments.map((app) => {
						const doctor = app.doctor.staff;
						return (
							<tr key={app.id}>
								<td className="w-3/5">
									Dr.{" "}
									{`${doctor.firstName} ${doctor.middleName}`}
								</td>
								<td className="text-center">
									{new Date(
										app.datetime
									).toLocaleDateString()}
								</td>
								<td className="text-center">
									{new Date(
										app.datetime
									).toLocaleTimeString()}
								</td>
								<td className="text-center">
									<button
										onClick={() => {
											setEdit({
												appId: app.id,
												dept: app.doctor.staff
													.department?.id,
												docId: app.doctorId,
											});
											setPopup(PopupTypes.Update);
										}}
									>
										<FontAwesomeIcon
											icon={faEdit}
											className="mr-4"
										/>
									</button>
									<button
										onClick={async () => {
											const res = await confirm();
											if (res) {
												const removedApp: patientAppointment =
													await fetch(
														"http://localhost:3000/api/appointments",
														{
															method: "DELETE",
															body: JSON.stringify(
																app
															),
														}
													).then((res) => res.json());
												setAppointments((prev) =>
													prev.filter(
														(val) =>
															val.id !==
															removedApp.id
													)
												);
											}
										}}
									>
										<FontAwesomeIcon
											icon={faTrash}
											className="text-red-700"
										/>
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			<div className="mt-8 w-3/4 flex justify-end mr-2">
				<button
					className="bg-blue-900 text-white px-3 py-2 rounded"
					onClick={() => setPopup(PopupTypes.Create)}
				>
					Schedule Appointment
				</button>
			</div>
		</main>
	);
}

export const isAppointment = (
	x: patientAppointment | { error: string }
): x is patientAppointment => {
	return (x as patientAppointment).id !== undefined;
};
