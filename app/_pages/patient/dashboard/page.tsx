import { faCalendarDay, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import maleImg from "@/public/Male.svg";
import femaleImg from "@/public/Female.svg";
import Image from "next/image";
import Link from "next/link";

export default function PatientDashboard() {
	return (
		<main className="w-full mt-24 grid grid-cols-1 lg:grid-cols-3 justify-center gap-5 py-4 px-10 box-border">
			<div className="flex flex-col w-full gap-4 col-span-1 lg:col-span-2">
				<div className="flex w-full gap-5">
					<Link
						href="/payment"
						className="p-5 rounded-2xl flex flex-col bg-blue-700 text-white gap-4 w-full h-48 justify-center"
					>
						<h1 className="text-lg h-1/3">Total due payments</h1>
						<p className="text-5xl h-full">$10,000</p>
					</Link>
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
				<div className="border-2 border-blue-700 rounded-2xl flex flex-col w-full min-h-96 p-5 gap-3 h-[660px]">
					<h1 className="text-2xl text-blue-700 font-bold mb-2">
						Upcoming Appointments
					</h1>
					<div className="flex flex-col overflow-scroll gap-3 flex-nowrap max-h-[880px]">
						<div className="flex bg-blue-100 text-black rounded-xl w-full p-5 gap-4 h-24">
							<Image
								src={maleImg}
								alt="male portrait illustration"
								height={70}
								className="bg-blue-300 rounded-md"
							/>
							<div className="flex flex-col h-full justify-between">
								<h1 className="text-xl font-semibold">
									Consultation with Dr. John Doe
								</h1>
								<div className="flex text-gray-800 gap-4">
									<div className="flex gap-2 items-center">
										<FontAwesomeIcon icon={faCalendarDay} />
										<p>11/12/2024</p>
									</div>
									<div className="flex gap-2 items-center">
										<FontAwesomeIcon icon={faClock} />
										<p>08:00 AM</p>
									</div>
								</div>
							</div>
						</div>
						<div className="flex bg-blue-100 text-black rounded-xl w-full p-5 gap-4 h-24">
							<Image
								src={maleImg}
								alt="male portrait illustration"
								height={70}
								className="bg-blue-300 rounded-md"
							/>
							<div className="flex flex-col h-full justify-between">
								<h1 className="text-xl font-semibold">
									Consultation with Dr. John Doe
								</h1>
								<div className="flex text-gray-800 gap-4">
									<div className="flex gap-2 items-center">
										<FontAwesomeIcon icon={faCalendarDay} />
										<p>11/12/2024</p>
									</div>
									<div className="flex gap-2 items-center">
										<FontAwesomeIcon icon={faClock} />
										<p>08:00 AM</p>
									</div>
								</div>
							</div>
						</div>
						<div className="flex bg-blue-100 text-black rounded-xl w-full p-5 gap-4 h-24">
							<Image
								src={maleImg}
								alt="male portrait illustration"
								height={70}
								className="bg-blue-300 rounded-md"
							/>
							<div className="flex flex-col h-full justify-between">
								<h1 className="text-xl font-semibold">
									Consultation with Dr. John Doe
								</h1>
								<div className="flex text-gray-800 gap-4">
									<div className="flex gap-2 items-center">
										<FontAwesomeIcon icon={faCalendarDay} />
										<p>11/12/2024</p>
									</div>
									<div className="flex gap-2 items-center">
										<FontAwesomeIcon icon={faClock} />
										<p>08:00 AM</p>
									</div>
								</div>
							</div>
						</div>
						<div className="flex bg-blue-100 text-black rounded-xl w-full p-5 gap-4 h-24">
							<Image
								src={maleImg}
								alt="male portrait illustration"
								height={70}
								className="bg-blue-300 rounded-md"
							/>
							<div className="flex flex-col h-full justify-between">
								<h1 className="text-xl font-semibold">
									Consultation with Dr. John Doe
								</h1>
								<div className="flex text-gray-800 gap-4">
									<div className="flex gap-2 items-center">
										<FontAwesomeIcon icon={faCalendarDay} />
										<p>11/12/2024</p>
									</div>
									<div className="flex gap-2 items-center">
										<FontAwesomeIcon icon={faClock} />
										<p>08:00 AM</p>
									</div>
								</div>
							</div>
						</div>
						<div className="flex bg-blue-100 text-black rounded-xl w-full p-5 gap-4 h-24">
							<Image
								src={maleImg}
								alt="male portrait illustration"
								height={70}
								className="bg-blue-300 rounded-md"
							/>
							<div className="flex flex-col h-full justify-between">
								<h1 className="text-xl font-semibold">
									Consultation with Dr. John Doe
								</h1>
								<div className="flex text-gray-800 gap-4">
									<div className="flex gap-2 items-center">
										<FontAwesomeIcon icon={faCalendarDay} />
										<p>11/12/2024</p>
									</div>
									<div className="flex gap-2 items-center">
										<FontAwesomeIcon icon={faClock} />
										<p>08:00 AM</p>
									</div>
								</div>
							</div>
						</div>
						<div className="flex bg-blue-100 text-black rounded-xl w-full p-5 gap-4 h-24">
							<Image
								src={maleImg}
								alt="male portrait illustration"
								height={70}
								className="bg-blue-300 rounded-md"
							/>
							<div className="flex flex-col h-full justify-between">
								<h1 className="text-xl font-semibold">
									Consultation with Dr. John Doe
								</h1>
								<div className="flex text-gray-800 gap-4">
									<div className="flex gap-2 items-center">
										<FontAwesomeIcon icon={faCalendarDay} />
										<p>11/12/2024</p>
									</div>
									<div className="flex gap-2 items-center">
										<FontAwesomeIcon icon={faClock} />
										<p>08:00 AM</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-col w-full gap-5">
				<div className="border-2 border-blue-700 rounded-2xl flex flex-col w-full min-h-96 h-full p-5">
					<h1 className="text-2xl text-blue-700 font-bold">
						Reminders
					</h1>
					<div className="h-full flex justify-center items-center">
						<p className="text-2xl text-gray-400">
							No reminders yet
						</p>
					</div>
				</div>
				<div className="border-2 border-blue-700 rounded-2xl flex flex-col w-full min-h-96 h-full p-5">
					<h1 className="text-2xl text-blue-700 font-bold">
						Medical History
					</h1>
					<div className="h-full flex justify-center items-center">
						<p className="text-2xl text-gray-400">
							No past medical history recorded
						</p>
					</div>
				</div>
			</div>
		</main>
	);
}
