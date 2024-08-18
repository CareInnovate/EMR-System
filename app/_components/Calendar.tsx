"use client";
import moment from "moment";
import { useState } from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import withDragandDrop from "react-big-calendar/lib/addons/dragAndDrop";
import Popup from "./Popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";
import { useConfirm } from "../_hooks/useConfirm";
import { useCalendar } from "../_hooks/useCalendar";

const DnDCalendar = withDragandDrop<event>(BigCalendar);
export type event = {
	start: Date;
	end: Date;
	title: string;
	resourceId?: number;
	data: { id: number };
};
export type resource = {
	id: number;
	title: string;
};

//TODO: add Props to enter the doctors that the receptionist
//handles(based on department) and the events of the week(patients)
const Calendar = () => {
	const localizer = momentLocalizer(moment);
	const { open, handleConfirm, handleCancel, confirm } = useConfirm();
	const resources = [
		{ id: 1, title: "Dr. John Smith" },
		{ id: 2, title: "Dr. Anna Frank" },
		{ id: 3, title: "Dr. Tom Cat" },
	];
	const [events, setEvents] = useState<event[]>([
		//temporary demo data
		{
			start: moment("2024-08-18T11:00").toDate(),
			end: moment("2024-08-18T11:30").toDate(),
			title: "Hello there",
			data: {
				id: 1,
			},
			resourceId: 1,
		},
		{
			start: moment("2024-08-18T11:00").toDate(),
			end: moment("2024-08-18T12:00").toDate(),
			title: "Hello World",
			data: {
				id: 2,
			},
			resourceId: 2,
		},
	]);
	const { message, currentEvent, handleDrop } = useCalendar(
		setEvents,
		resources,
		confirm
	);

	return (
		<div className="h-full w-5/6 flex justify-center">
			<Popup isOpen={open}>
				<div className="flex flex-col p-10 m-auto absolute inset-0 bg-white items-center justify-around gap-5 text-center">
					<FontAwesomeIcon
						icon={faWarning}
						className={`text-7xl text-orange-400`}
					/>
					<div className="text-gray-600 text-xl">
						{message.current}
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
			<DnDCalendar
				localizer={localizer}
				events={events}
				resources={resources}
				views={["day", "week", "agenda"]}
				defaultView="day"
				onEventDrop={handleDrop}
				onEventResize={handleDrop}
				onDragStart={({ event }) => {
					currentEvent.current = event;
				}}
				style={{ width: "100%" }}
				min={moment("2024-02-04T08:00:00").toDate()}
				max={moment("2024-02-04T18:00:00").toDate()}
			/>
		</div>
	);
};

export default Calendar;
