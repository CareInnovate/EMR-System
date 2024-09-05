import { faCalendarDay, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import maleImg from "@/public/Male.svg";
import femaleImg from "@/public/Female.svg";
import medicationImg from "@/public/medicine.png";
import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { invoices } from "@/app/api/patient/[id]/invoices/route";
import { patientAppointment } from "@/app/api/appointments/route";
import { headers } from "next/headers";
import { ReactNode } from "react";

export default async function PatientDashboard() {
	const user = await getServerSession(options);
	const invoiceRes = fetch(
		`http://localhost:3000/api/patient/${user?.user.id}/invoices`
	).then((res) => res.json());
	const appointmentRes = fetch(`http://localhost:3000/api/appointments/`, {
		headers: headers(),
	}).then((res) => res.json());
	const [{ dueInvoices }, appointments]: [
		{ dueInvoices: invoices[] },
		patientAppointment[]
	] = await Promise.all([invoiceRes, appointmentRes]);
	const totalDue = dueInvoices.reduce<number>((acc, cur) => {
		const temp = cur.services.reduce<number>(
			(acc, cur) => acc + cur.price,
			0
		);
		return acc + temp;
	}, 0);

	const { upcomingApps, medicalRecords, prescriptions } =
		appointments.reduce<{
			upcomingApps: ReactNode[];
			medicalRecords: ReactNode[];
			prescriptions: ReactNode[];
		}>(
			(acc, cur) => {
				const datetime = new Date(cur.datetime);
				const now = new Date();

				if (cur.MedicalRecord?.id) {
					const medicalRecordCol = cur.MedicalRecord.diagnosis.map(
						(diag) => {
							return (
								<div
									key={cur.MedicalRecord?.id}
									className="flex w-full bg-blue-100 p-5 rounded-lg"
								>
									<p className="w-full text-sm sm:text-lg">
										{diag}
									</p>
									<p className="w-full text-sm sm:text-lg">
										{`Dr. ${cur.doctor.staff.firstName} ${cur.doctor.staff.middleName}`}
									</p>
									<p className="w-1/3 text-center">
										{new Date(
											cur.datetime
										).toLocaleDateString()}
									</p>
								</div>
							);
						}
					);
					const prescriptions = cur.MedicalRecord.prescription.reduce<
						ReactNode[]
					>((presAcc, presCur) => {
						const diff = now.getTime() - datetime.getTime();
						if (diff < presCur.duration) {
							const prescription = (
								<div
									className="flex bg-blue-100 text-black rounded-xl w-full p-5 gap-4 h-24"
									key={presCur.id}
								>
									<Image
										src={medicationImg}
										alt="medication icon"
										width={70}
										height={70}
									/>
									<div className="flex flex-col h-full justify-between">
										<h1 className="text-xl font-semibold">
											{presCur.medication.name}
										</h1>
										<div className="flex text-gray-800 gap-4">
											<p>{presCur.dosage}</p>
											<p>
												{Math.round(
													(presCur.duration -
														(now.getTime() -
															datetime.getTime())) /
														(24 * 60 * 60 * 1000)
												)}{" "}
												days left
											</p>
										</div>
									</div>
								</div>
							);
							return [...presAcc, prescription];
						}
						return presAcc;
					}, []);
					return {
						...acc,
						medicalRecords: [
							...acc.medicalRecords,
							...medicalRecordCol,
						],
						prescriptions: [...acc.prescriptions, ...prescriptions],
					};
				}
				if (new Date(cur.datetime) > new Date()) {
					const component = (
						<div
							className="flex bg-blue-100 text-black rounded-xl w-full p-5 gap-4 h-24"
							key={cur.id}
						>
							<Image
								src={
									cur.doctor.staff.sex === "MALE"
										? maleImg
										: femaleImg
								}
								alt="male portrait illustration"
								height={70}
								className="bg-blue-300 rounded-md"
							/>
							<div className="flex flex-col h-full justify-between">
								<h1 className="text-xl font-semibold">
									Consultation with Dr.{" "}
									{`${cur.doctor.staff.firstName} ${cur.doctor.staff.middleName}`}
								</h1>
								<div className="flex text-gray-800 gap-4">
									<div className="flex gap-2 items-center">
										<FontAwesomeIcon icon={faCalendarDay} />
										<p>
											{datetime.getDate() ===
											now.getDate()
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
											{datetime.toLocaleTimeString(
												"en-US",
												{
													hour: "2-digit",
													minute: "2-digit",
												}
											)}
										</p>
									</div>
								</div>
							</div>
						</div>
					);
					return {
						...acc,
						upcomingApps: [...acc.upcomingApps, component],
					};
				}
				return acc;
			},
			{ upcomingApps: [], medicalRecords: [], prescriptions: [] }
		);

	return (
		<main className="w-full mt-24 grid grid-cols-1 lg:grid-cols-3 justify-center gap-5 py-4 px-10 box-border">
			<div className="flex flex-col w-full gap-4 col-span-1 lg:col-span-2">
				<div className="flex w-full gap-5">
					<Link
						href="/payment"
						className="p-5 rounded-2xl flex flex-col bg-blue-700 text-white gap-4 w-full h-48 justify-center"
					>
						<h1 className="text-lg h-1/3">Total due payments</h1>
						<p className="text-5xl h-full">${totalDue}</p>
					</Link>
					<Link
						href="/appointments"
						className="p-5 rounded-2xl flex flex-col bg-blue-700 text-white gap-4 w-full h-48"
					>
						<h1 className="text-lg h-1/3">
							Total upcoming appointments
						</h1>
						<p className="text-5xl h-full">{upcomingApps.length}</p>
					</Link>
				</div>
				<div className="border-2 border-blue-700 rounded-2xl flex flex-col w-full min-h-96 p-5 gap-3 h-[660px]">
					<h1 className="text-2xl text-blue-700 font-bold mb-2">
						Upcoming Appointments
					</h1>
					<div className="flex flex-col overflow-scroll gap-3 flex-nowrap max-h-[880px] h-full">
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
				<div className="border-2 border-blue-700 rounded-2xl flex flex-col w-full min-h-96 h-full p-5 gap-3">
					<h1 className="text-2xl text-blue-700 font-bold mb-2">
						Reminders
					</h1>
					{prescriptions.length > 0 ? (
						prescriptions
					) : (
						<div className="h-full flex justify-center items-center">
							<p className="text-2xl text-gray-400">
								No reminders yet
							</p>
						</div>
					)}
				</div>
				<div className="border-2 border-blue-700 rounded-2xl flex flex-col w-full min-h-96 h-full p-5">
					<h1 className="text-2xl text-blue-700 font-bold mb-2">
						Medical History
					</h1>
					{medicalRecords.length > 0 ? (
						<div className="flex flex-col justify-center items-center gap-2">
							<div className="flex w-full font-bold sm:text-lg md:text-xl p-3 rounded-lg">
								<p className="w-full">Diagnosis</p>
								<p className="w-full">Doctor</p>
								<p className="w-1/3 text-center">Date</p>
							</div>
							{medicalRecords}
						</div>
					) : (
						<div className="h-full flex justify-center items-center">
							<p className="text-2xl text-gray-400">
								No past medical history recorded
							</p>
						</div>
					)}
				</div>
			</div>
		</main>
	);
}
