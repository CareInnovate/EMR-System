import {
	faCalendarDay,
	faClock,
	faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Calendar from "@/app/_components/Calendar";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { doctor } from "@/app/api/doctors/[dept]/route";

export default async function ReceptionistDashboard() {
	const user = await getServerSession(options);
	const deptId = user?.user.deptId as string;
	const doctors: doctor[] = await fetch(
		`http://localhost:3000/api/doctors/${deptId}`
	).then((res) => res.json());
	const resources = doctors.map((doctor) => ({
		id: doctor.id,
		title: `Dr. ${doctor.staff.firstName} ${doctor.staff.middleName}`,
		deptId: deptId,
	}));
	const events = doctors.flatMap((doctor) => {
		return doctor.appointments.map((app) => {
			const startTime = new Date(app.datetime);
			const endTime = new Date(startTime.getTime() + 30 * 60000);
			const title = `${app.patient.sex === "MALE" ? "Mr." : "Mrs./Ms."} ${
				app.patient.firstName
			} ${app.patient.middleName} ${app.patient.lastName}`;
			return {
				start: startTime,
				end: endTime,
				title: title,
				data: {
					id: app.id,
				},
				resourceId: doctor.id,
			};
		});
	});
	const upcomingApps = doctors
		.flatMap((doctor) => {
			return doctor.appointments.map((app) => {
				const datetime = new Date(app.datetime);
				const now = new Date();
				const component = (
					<div
						className="rounded-md flex overflow-hidden"
						key={app.id}
					>
						<div className="flex flex-col bg-blue-100 text-blue-900 w-1/2 p-4 gap-2">
							<h1 className="text-xl font-semibold">{`${
								app.patient.sex === "MALE" ? "Mr." : "Mrs./Ms."
							} ${app.patient.firstName} ${
								app.patient.middleName
							}`}</h1>
							<div className="flex gap-2 items-center text-gray-800">
								<FontAwesomeIcon icon={faPhone} />
								<p>{app.patient.mobileNumber}</p>
							</div>
						</div>
						<div className="flex flex-col bg-blue-900 text-white p-4 gap-2 w-1/2">
							<h1 className="text-xl font-semibold">
								Dr.{" "}
								{`${doctor.staff.firstName} ${doctor.staff.middleName}`}
							</h1>
							<div className="flex text-gray-200 justify-between flex-wrap">
								<div className="flex gap-2 items-center">
									<FontAwesomeIcon icon={faCalendarDay} />
									<p>
										{datetime.getDate() === now.getDate()
											? "Today"
											: datetime.getDate() ===
											  now.getDate() + 1
											? "Tomorrow"
											: datetime.toLocaleDateString()}
									</p>
								</div>
								<div className="flex gap-2 items-center">
									<FontAwesomeIcon icon={faClock} />
									<p>
										{datetime.toLocaleTimeString("en-US", {
											hour: "2-digit",
											minute: "2-digit",
										})}
									</p>
								</div>
							</div>
						</div>
					</div>
				);
				return { component, datetime };
			});
		})
		.sort((a, b) => a.datetime.getTime() - b.datetime.getTime());

	return (
		<main className="w-full mt-24 grid grid-cols-1 lg:grid-cols-3 justify-center gap-5 py-4 px-10 box-border">
			<div className="flex flex-col w-full gap-4 col-span-1 lg:col-span-2">
				<div className="flex w-full gap-5">
					<div className="p-5 rounded-2xl flex flex-col bg-blue-700 text-white gap-4 w-full h-48 justify-center">
						<h1 className="text-xl md:text-2xl lg:text-3xl min-h-1/3">
							New patient?
						</h1>
						<div>
							<Link
								href="/register"
								className="text-sm md:text-lg lg:text-xl bg-blue-100 text-blue-700 rounded-md py-2 px-5 text-center font-semibold"
							>
								Register
							</Link>
						</div>
					</div>
					<div className="p-5 rounded-2xl flex flex-col bg-blue-700 text-white gap-4 w-full h-48 justify-center">
						<h1 className="text-xl md:text-2xl lg:text-3xl min-h-1/3">
							Patient with no appointment?
						</h1>
						<div>
							<Link
								href="/appointments"
								className="text-sm md:text-lg lg:text-xl bg-blue-100 text-blue-700 rounded-md py-2 px-5 text-center font-semibold"
							>
								Schedule Appointment
							</Link>
						</div>
					</div>
				</div>
				<div className="p-5 border-2 border-blue-700 rounded-2xl max-h-[600px]">
					<Calendar
						resources={resources}
						initialEvents={events}
						fullWidth={true}
					/>
				</div>
			</div>
			<div className="flex flex-col w-full gap-5">
				<div className="border-2 border-blue-700 rounded-2xl flex flex-col w-full min-h-96 h-full p-5 gap-5">
					<h1 className="text-2xl text-blue-700 font-bold">
						Upcoming appointments
					</h1>
					<div className="h-full flex flex-col gap-3">
						{upcomingApps.length > 0 ? (
							upcomingApps.map((app) => app.component)
						) : (
							<div className="flex justify-center items-center h-full">
								<p className="text-2xl text-gray-400">
									No past medical history recorded
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</main>
	);
}
