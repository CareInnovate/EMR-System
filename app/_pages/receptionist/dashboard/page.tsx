import {
	faCalendarDay,
	faClock,
	faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Calendar from "@/app/_components/Calendar";

export default function ReceptionistDashboard() {
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
						initialEvents={[]}
						resources={[]}
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
						{true ? (
							<>
								<div className="rounded-md flex overflow-hidden">
									<div className="flex flex-col bg-blue-100 text-blue-900 w-1/2 p-4 gap-2">
										<h1 className="text-xl font-semibold">
											Mr. John Wick
										</h1>
										<div className="flex gap-2 items-center text-gray-800">
											<FontAwesomeIcon icon={faPhone} />
											<p>0999999999</p>
										</div>
									</div>
									<div className="flex flex-col bg-blue-900 text-white p-4 gap-2 w-1/2">
										<h1 className="text-xl font-semibold">
											Dr. John Doe
										</h1>
										<div className="flex text-gray-200 justify-between flex-wrap">
											<div className="flex gap-2 items-center">
												<FontAwesomeIcon
													icon={faCalendarDay}
												/>
												<p>Today</p>
											</div>
											<div className="flex gap-2 items-center">
												<FontAwesomeIcon
													icon={faClock}
												/>
												<p>08:00 AM</p>
											</div>
										</div>
									</div>
								</div>
								<div className="rounded-md flex overflow-hidden">
									<div className="flex flex-col bg-blue-100 text-blue-900 w-1/2 p-4 gap-2">
										<h1 className="text-xl font-semibold">
											Mr. John Wick
										</h1>
										<div className="flex gap-2 items-center text-gray-800">
											<FontAwesomeIcon icon={faPhone} />
											<p>0999999999</p>
										</div>
									</div>
									<div className="flex flex-col bg-blue-900 text-white p-4 gap-2 w-1/2">
										<h1 className="text-xl font-semibold">
											Dr. John Doe
										</h1>
										<div className="flex text-gray-200 justify-between flex-wrap">
											<div className="flex gap-2 items-center">
												<FontAwesomeIcon
													icon={faCalendarDay}
												/>
												<p>Today</p>
											</div>
											<div className="flex gap-2 items-center">
												<FontAwesomeIcon
													icon={faClock}
												/>
												<p>08:00 AM</p>
											</div>
										</div>
									</div>
								</div>
							</>
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
