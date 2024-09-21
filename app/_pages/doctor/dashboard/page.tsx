import { faCalendarDay, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { doctorAppointment } from "@/app/api/appointments/route";
import { headers } from "next/headers";
import { ReactNode } from "react";

export default async function DoctorDashboard() {
	const appointments: doctorAppointment[] = await fetch(
		`http://localhost:3000/api/appointments/`,
		{
			headers: headers(),
		}
	).then((res) => res.json());
	const recentApps = appointments.reduce<ReactNode[]>((acc, cur) => {
		if (new Date(cur.datetime) <= new Date()) {
			const datetime = new Date(cur.datetime);
			const now = new Date();
			const component = (
				<Link
					href={`/patients/${cur.patientId}?appId=${cur.id}`}
					className="rounded-md flex overflow-hidden flex-col sm:flex-row justify-between bg-blue-100 text-blue-900 p-4 gap-2"
					key={cur.id}
				>
					<h1 className="text-xl font-semibold">{`${
						cur.patient.sex === "MALE" ? "Mr." : "Mrs./Ms."
					} ${cur.patient.firstName} ${cur.patient.middleName}`}</h1>
					<div className="flex text-gray-600 justify-between flex-wrap gap-4">
						<div className="flex gap-2 items-center">
							<FontAwesomeIcon icon={faCalendarDay} />
							<p>
								{datetime.getDate() === now.getDate()
									? "Today"
									: datetime.getDate() === now.getDate() + 1
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
				</Link>
			);
			return [...acc, component];
		}
		return acc;
	}, []);
	const upcomingApps = appointments.reduce<ReactNode[]>((acc, cur) => {
		if (new Date(cur.datetime) > new Date()) {
			const datetime = new Date(cur.datetime);
			const now = new Date();
			const component = (
				<Link
					href={`/patients/${cur.patientId}?appId=${cur.id}`}
					className="rounded-md flex overflow-hidden flex-col sm:flex-row justify-between bg-blue-100 text-blue-900 p-4 gap-2"
					key={cur.id}
				>
					<h1 className="text-xl font-semibold">{`${
						cur.patient.sex === "MALE" ? "Mr." : "Mrs./Ms."
					} ${cur.patient.firstName} ${cur.patient.middleName}`}</h1>
					<div className="flex text-gray-800 justify-between flex-wrap gap-4">
						<div className="flex gap-2 items-center">
							<FontAwesomeIcon icon={faCalendarDay} />
							<p>
								{datetime.getDate() === now.getDate()
									? "Today"
									: datetime.getDate() === now.getDate() + 1
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
				</Link>
			);
			return [...acc, component];
		}
		return acc;
	}, []);
	return (
		<main className="w-full pt-24 grid grid-cols-1 lg:grid-cols-3 justify-center gap-5 py-4 px-10 box-border min-h-full">
			<div className="flex flex-col w-full gap-4 col-span-1 lg:col-span-2">
				<div className="flex w-full gap-5">
					<div className="flex w-full gap-5">
						<Link
							href="/appointments"
							className="p-5 rounded-2xl flex flex-col bg-blue-700 text-white gap-4 w-full h-48"
						>
							<h1 className="text-lg h-1/3">
								Total upcoming appointments
							</h1>
							<p className="text-5xl h-full">
								{upcomingApps.length}
							</p>
						</Link>
					</div>
					<div className="p-5 rounded-2xl flex flex-col bg-blue-700 text-white gap-4 w-full h-48 justify-center">
						<h1 className="text-xl md:text-2xl lg:text-3xl min-h-1/3">
							Search for patients
						</h1>
						<div>
							<Link
								href="/search"
								className="text-sm md:text-lg lg:text-xl bg-blue-100 text-blue-700 rounded-md py-2 px-5 text-center font-semibold"
							>
								Search
							</Link>
						</div>
					</div>
				</div>
				<div className="border-2 border-blue-700 rounded-2xl flex flex-col w-full min-h-96 h-full p-5 gap-5">
					<h1 className="text-2xl text-blue-700 font-bold">
						Upcoming appointments
					</h1>
					<div className="h-full flex flex-col gap-3">
						{upcomingApps.length > 0 ? (
							upcomingApps
						) : (
							<div className="flex justify-center items-center h-full">
								<p className="text-2xl text-gray-400">
									No upcoming appointments
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
			<div className="flex flex-col w-full gap-5">
				<div className="border-2 border-blue-700 rounded-2xl flex flex-col w-full min-h-96 h-1/2 p-5 gap-5 overflow-scroll">
					<h1 className="text-2xl text-blue-700 font-bold">
						Recent patients
					</h1>
					<div className="h-full flex flex-col gap-3">
						{recentApps.length > 0 ? (
							recentApps
						) : (
							<div className="flex justify-center items-center h-full">
								<p className="text-2xl text-gray-400">
									No recent patients
								</p>
							</div>
						)}
					</div>
				</div>
				<div className="border-2 border-blue-700 rounded-2xl flex flex-col w-full min-h-96 p-5 gap-5 h-1/2">
					<h1 className="text-2xl text-blue-700 font-bold">Notes</h1>
					<div className="h-full flex flex-col gap-3">
						{false ? (
							<>
								<div className="rounded-md flex overflow-hidden flex-col bg-blue-100 text-blue-900 p-4 gap-2"></div>
							</>
						) : (
							<div className="flex justify-center items-center h-full">
								<p className="text-2xl text-gray-400">
									You have no notes
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</main>
	);
}
