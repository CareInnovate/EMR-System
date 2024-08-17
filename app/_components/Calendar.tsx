"use client";
import moment from "moment";
import { ReactNode, useCallback, useRef, useState } from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import withDragandDrop, {
	EventInteractionArgs,
} from "react-big-calendar/lib/addons/dragAndDrop";
import Popup from "./Popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";
import { useConfirm } from "../_hooks/useConfirm";

const DnDCalendar = withDragandDrop<event>(BigCalendar);
type event = {
	start: Date;
	end: Date;
	title: string;
	resourceId?: number;
	data: { id: number };
};
const resources = [
	{ id: 1, title: "Dr. John Smith" },
	{ id: 2, title: "Dr. Anna Frank" },
	{ id: 3, title: "Dr. Tom Cat" },
];

//TODO: add Props to enter the doctors that the receptionist
//handles(based on department) and the events of the week(patients)
const Calendar = () => {
	const localizer = momentLocalizer(moment);
	const message = useRef<ReactNode>();
	const currentEvent = useRef<event>();
	const { open, handleConfirm, handleCancel, confirm } = useConfirm();
	const [events, setEvents] = useState<event[]>([
		//temporary demo data
		{
			start: moment("2024-08-16T11:00").toDate(),
			end: moment("2024-08-16T15:00").toDate(),
			title: "Hello there",
			data: {
				id: 1,
			},
			resourceId: 1,
		},
		{
			start: moment("2024-08-16T11:00").toDate(),
			end: moment("2024-08-16T15:00").toDate(),
			title: "Hello World",
			data: {
				id: 2,
			},
			resourceId: 2,
		},
	]);
	const handleDrop = useCallback(
		async ({
			event,
			start,
			end,
			resourceId,
		}: EventInteractionArgs<event>) => {
			let doctorChange = <span></span>;
			if (
				currentEvent.current?.resourceId &&
				typeof resourceId === "number" &&
				currentEvent.current?.resourceId !== resourceId
			) {
				const doctors = resources.reduce<{ prev: string; cur: string }>(
					(acc, cur) => {
						if (cur.id === resourceId) {
							acc.cur = cur.title;
							return acc;
						} else if (
							cur.id === currentEvent.current?.resourceId
						) {
							acc.prev = cur.title;
							return acc;
						}
						return acc;
					},
					{ prev: "", cur: "" }
				);
				doctorChange = (
					<span>
						and from {doctors.prev} to {doctors.cur}
					</span>
				);
			}
			message.current = (
				<p>
					Are you sure you want to change the schedule from{" "}
					<strong>
						{currentEvent.current?.start.toLocaleString()}{" "}
					</strong>
					to <strong> {start.toLocaleString()}</strong> {doctorChange}
					?
				</p>
			);
			const ans = await confirm();
			if (ans) {
				setEvents((prevEvents) =>
					prevEvents.map((prevEvent) =>
						prevEvent.data.id === event?.data?.id
							? {
									...prevEvent,
									start: start as Date,
									end: end as Date,
									resourceId: resourceId as number,
							  }
							: prevEvent
					)
				);
			}
		},
		[setEvents, confirm]
	);
	return (
		<div className="h-full w-4/5 flex justify-center">
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
				onDragStart={({ event }) => {
					currentEvent.current = event;
				}}
				style={{ width: "100%" }}
			/>
		</div>
	);
};

export default Calendar;
