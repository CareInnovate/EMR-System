import React, {
	Dispatch,
	ReactNode,
	SetStateAction,
	useCallback,
	useRef,
} from "react";
import { EventInteractionArgs } from "react-big-calendar/lib/addons/dragAndDrop";
import { event, resource } from "@/app/_components/Calendar";
export const useCalendar = (
	setEvents: Dispatch<SetStateAction<event[]>>,
	resources: resource[],
	confirm: () => Promise<unknown>
) => {
	const message = useRef<ReactNode>();
	const currentEvent = useRef<event>();
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
		[setEvents, confirm, resources]
	);
	return { message, currentEvent, handleDrop };
};
