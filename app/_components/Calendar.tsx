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
import ReceptionistAppointmentForm from "./ReceptionistAppointmentForm";
import { useRouter } from "next/navigation";
import "react-big-calendar/lib/css/react-big-calendar.css";

const DnDCalendar = withDragandDrop<event>(BigCalendar);
export type event = {
	start: Date;
	end: Date;
	title: string;
	resourceId?: string;
	data: { id: string; patientId?: string };
};
export type resource = {
	id: string;
	title: string;
	deptId: string;
};
type props = {
	resources: resource[];
	initialEvents: event[];
	fullWidth?: boolean;
};

const Calendar = ({ resources, initialEvents, fullWidth }: props) => {
	const localizer = momentLocalizer(moment);
	const { open, handleConfirm, handleCancel, confirm } = useConfirm();
	const [popup, setPopup] = useState<boolean>(false);
	const [events, setEvents] = useState<event[]>(initialEvents);
	const router = useRouter();

	const { message, currentEvent, handleDrop } = useCalendar(
		setEvents,
		resources,
		confirm
	);

	return (
		<div
			className={`h-full ${
				fullWidth ? "w-full" : "w-5/6"
			} flex justify-center`}
		>
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
			<ReceptionistAppointmentForm
				setEvents={setEvents}
				popup={popup}
				setPopup={setPopup}
			/>

			<DnDCalendar
				localizer={localizer}
				events={events}
				resources={resources}
				views={["day", "week", "agenda"]}
				defaultView="day"
				onEventDrop={handleDrop}
				resizable={false}
				onSelectSlot={() => setPopup(true)}
				onSelectEvent={(event: event) => {
					if (event.data.patientId) {
						const searchParams = new URLSearchParams({
							appId: event.data.id,
						});
						router.push(
							`http://localhost:3000/patients/${
								event.data.patientId
							}?${searchParams.toString()}`
						);
					}
				}}
				selectable={true}
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
