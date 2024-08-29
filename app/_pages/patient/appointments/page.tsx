"use client";
import Popup from "@/app/_components/Popup";
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
import { ChangeEvent, useRef, useState } from "react";
type props = {
	appointments: patientAppointment[];
	departments: Department[];
	patientId: string;
};
export default function PatientAppointments({
	appointments,
	departments,
	patientId,
}: props) {
	const [popup, setPopup] = useState<boolean>(false);
	const [error, setError] = useState<string>();
	const { open, confirm, handleCancel, handleConfirm } = useConfirm();
	const [timeSlots, setTimeSlots] = useState<Record<string, number>>();
	const form = useRef<HTMLFormElement>(null);
	const timeOptions =
		timeSlots &&
		Object.entries(timeSlots)
			.filter((slot) => slot[1] > 0)
			.map((slot, ind) => {
				return (
					<option key={ind} value={slot[0]}>
						{slot[0]}
					</option>
				);
			});
	const selectedDept = useRef<HTMLSelectElement>(null);

	async function fetchTimeSlots(e: ChangeEvent<HTMLInputElement>) {
		const date = new Date(e.currentTarget.value);
		const searchParams = new URLSearchParams({ date: date.toISOString() });

		const res = await fetch(
			`http://localhost:3000/api/appointments/${
				selectedDept.current?.value
			}?${searchParams.toString()}`
		);
		const data = await res.json();

		setTimeSlots(data);
	}
	async function handleSave() {
		if (form.current === null) {
			return "Error";
		}
		const formData = new FormData(form.current);
		const date = formData.get("date") as string;
		const time = formData.get("time") as string;
		const res = await fetch(
			`http://localhost:3000/api/appointments/${formData.get(
				"department"
			)}`,
			{
				method: "POST",
				body: JSON.stringify({
					date: new Date(`${date}T${time}`),
					patientId: patientId,
				}),
			}
		);
		const data: patientAppointment | { error: string } = await res.json();
		if (isAppointment(data)) {
			appointments.push(data);
			setPopup(false);
		} else {
			setError(data.error);
		}
		setTimeSlots({});
		form.current.reset();
	}
	return (
		<main className="w-full mt-24 flex flex-col items-center gap-3 py-1 px-9 sm:px-5">
			{
				<Popup isOpen={popup}>
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
						<form
							className="grid grid-cols-2 gap-4 w-full"
							ref={form}
						>
							<h1 className="col-span-2 text-left font-bold text-2xl">
								Schedule your appointment
							</h1>
							<input
								type="text"
								name="type"
								id="type"
								value={"Consultation"}
								hidden
							/>
							<input
								type="text"
								name="status"
								id="status"
								value={"Scheduled"}
								hidden
							/>
							<label className="flex flex-col gap-2 w-full">
								<span className="p-2 w-full text-left text-xl">
									Department:
								</span>
								<select
									name="department"
									id="department"
									className="ml-2 p-2 w-4/5 border border-gray-300 rounded-md"
									ref={selectedDept}
								>
									<option disabled>Choose department</option>
									{departments.map((dep) => (
										<option key={dep.id} value={dep.id}>
											{dep.name}
										</option>
									))}
								</select>
							</label>
							<label className="flex flex-col gap-2 w-full">
								<span className="p-2 w-full text-left text-xl">
									Date:
								</span>
								<input
									className="ml-2 p-2 w-4/5 border border-gray-300 rounded-md"
									type="date"
									name="date"
									id="date"
									min={new Date().toISOString().split("T")[0]}
									onInput={fetchTimeSlots}
								/>
							</label>
							<label className="flex flex-col gap-2 w-full">
								<span className="p-2 w-full text-left text-xl">
									Time:
								</span>
								<select
									className="ml-2 p-2 w-4/5 border border-gray-300 rounded-md"
									name="time"
									id="time"
								>
									<option disabled>Choose time:</option>
									{timeOptions}
								</select>
							</label>
						</form>
						<div className="flex w-full justify-end gap-2">
							<button
								className="py-2 px-5 rounded-md text-xl border border-blue-950 text-blue-900"
								onClick={() => {
									form.current && form.current.reset();
									setTimeSlots({});
									setPopup(false);
								}}
							>
								Cancel
							</button>
							<button
								className="py-2 px-5 rounded-md text-xl bg-blue-900 text-white"
								onClick={handleSave}
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
									<button onClick={() => setPopup(true)}>
										<FontAwesomeIcon
											icon={faEdit}
											className="mr-4"
										/>
									</button>
									<button
										onClick={async () => {
											const res = await confirm();
											if (res) {
												//some logic here
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
					onClick={() => setPopup(true)}
				>
					Schedule Appointment
				</button>
			</div>
		</main>
	);
}

const isAppointment = (
	x: patientAppointment | { error: string }
): x is patientAppointment => {
	return (x as patientAppointment).id !== undefined;
};
