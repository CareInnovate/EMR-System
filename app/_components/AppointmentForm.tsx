import { Department } from "@prisma/client";
import React, {
	ChangeEvent,
	Dispatch,
	RefObject,
	SetStateAction,
	useEffect,
	useRef,
} from "react";
import { patientAppointment } from "../api/appointments/route";
import moment from "moment";

type props = {
	departments: Department[];
	timeSlots: Record<string, number> | undefined;
	setTimeSlots: Dispatch<SetStateAction<Record<string, number> | undefined>>;
	form: RefObject<HTMLFormElement>;
	defaultValue?: { dept?: string; datetime?: Date };
};
const AppointmentForm = ({
	departments,
	timeSlots,
	setTimeSlots,
	form,
	defaultValue,
}: props) => {
	const selectedDept = useRef<HTMLSelectElement>(null);
	const date = useRef<HTMLInputElement>(null);

	const timeOptions =
		timeSlots &&
		Object.entries(timeSlots)
			.filter((slot) => {
				const time = slot[0].split(":");
				const appDate = new Date(date.current?.value as string);
				appDate.setHours(parseInt(time[0]));
				appDate.setMinutes(parseInt(time[1]));
				const isBefore = new Date() < appDate;
				return slot[1] > 0 && isBefore;
			})
			.map((slot, ind) => {
				return (
					<option key={ind} value={slot[0]}>
						{slot[0]}
					</option>
				);
			});
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
	return (
		<form className="grid grid-cols-2 gap-4 w-full" ref={form}>
			<h1 className="col-span-2 text-left font-bold text-2xl">
				Schedule your appointment
			</h1>
			<label className="flex flex-col gap-2 w-full">
				<span className="p-2 w-full text-left text-xl">
					Department:
				</span>
				<select
					name="department"
					id="department"
					className="ml-2 p-2 w-4/5 border border-gray-300 rounded-md"
					ref={selectedDept}
					defaultValue={defaultValue?.dept}
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
				<span className="p-2 w-full text-left text-xl">Date:</span>
				<input
					className="ml-2 p-2 w-4/5 border border-gray-300 rounded-md"
					type="date"
					name="date"
					id="date"
					min={new Date().toISOString().split("T")[0]}
					onInput={fetchTimeSlots}
					ref={date}
				/>
			</label>
			<label className="flex flex-col gap-2 w-full">
				<span className="p-2 w-full text-left text-xl">Time:</span>
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
	);
};

export default AppointmentForm;
