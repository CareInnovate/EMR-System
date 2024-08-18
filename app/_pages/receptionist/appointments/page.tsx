import Calendar from "@/app/_components/Calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

export function ReceptionistAppointments() {
	return (
		<main className="w-full h-4/5 mt-24 flex flex-col items-center gap-3 py-1 px-5">
			<Calendar />
		</main>
	);
}
