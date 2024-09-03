import {
	faCalendarDay,
	faClock,
	faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Calendar from "@/app/_components/Calendar";

export default function DoctorDashboard() {
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
							<p className="text-5xl h-full">4</p>
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
						{true ? (
							<>
								<div className="rounded-md flex overflow-hidden flex-col sm:flex-row justify-between bg-blue-100 text-blue-900 p-4 gap-2">
									<h1 className="text-xl font-semibold">
										Mr. John Wick
									</h1>
									<div className="flex text-gray-800 justify-between flex-wrap gap-4">
										<div className="flex gap-2 items-center">
											<FontAwesomeIcon
												icon={faCalendarDay}
											/>
											<p>Today</p>
										</div>
										<div className="flex gap-2 items-center">
											<FontAwesomeIcon icon={faClock} />
											<p>08:00 AM</p>
										</div>
									</div>
								</div>
								<div className="rounded-md flex overflow-hidden flex-col sm:flex-row justify-between bg-blue-100 text-blue-900 p-4 gap-2">
									<h1 className="text-xl font-semibold">
										Mr. John Wick
									</h1>
									<div className="flex text-gray-800 justify-between flex-wrap gap-4">
										<div className="flex gap-2 items-center">
											<FontAwesomeIcon
												icon={faCalendarDay}
											/>
											<p>Today</p>
										</div>
										<div className="flex gap-2 items-center">
											<FontAwesomeIcon icon={faClock} />
											<p>09:00 AM</p>
										</div>
									</div>
								</div>
							</>
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
						{true ? (
							<>
								<div className="rounded-md flex overflow-hidden flex-col sm:flex-row justify-between bg-blue-100 text-blue-900 p-4 gap-2">
									<h1 className="text-xl font-semibold">
										Mr. Wallace Green
									</h1>
									<div className="flex text-gray-600 justify-between flex-wrap gap-4">
										<div className="flex gap-2 items-center">
											<FontAwesomeIcon
												icon={faCalendarDay}
											/>
											<p>Today</p>
										</div>
										<div className="flex gap-2 items-center">
											<FontAwesomeIcon icon={faClock} />
											<p>07:00 AM</p>
										</div>
									</div>
								</div>
							</>
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
