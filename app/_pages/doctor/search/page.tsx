"use client";
import {
	faCaretDown,
	faCaretUp,
	faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Patient } from "@prisma/client";
import Link from "next/link";
import { FormEvent, useRef, useState } from "react";

export default function DoctorSearch() {
	const [open, setOpen] = useState<boolean>(false);
	const [patients, setPatients] = useState<Patient[]>();
	const form = useRef<HTMLFormElement>(null);
	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const input = {
			firstname: form.current?.firstName.value,
			middlename: form.current?.middleName.value,
			lastname: form.current?.lastName.value,
			mobileNo: form.current?.mobileNo?.value || "",
			email: form.current?.email?.value || "",
		};
		const searchParams = new URLSearchParams(input);
		const res = await fetch(
			`http://localhost:3000/api/patients?${searchParams.toString()}`
		);
		const data = await res.json();
		setPatients(data);
	}

	return (
		<main className="flex flex-col p-6 w-3/4 mx-auto mt-24 gap-6 h-5/6">
			<form
				className="bg-white p-6 rounded-md text-xl border border-gray-400 flex flex-col gap-4 w-full"
				onSubmit={handleSubmit}
				ref={form}
			>
				<h1 className="text-2xl mb-4 font-bold">Search for patients</h1>
				<div className="flex items-between border border-gray-400 rounded-md">
					<input
						className="flex-grow p-2 border border-gray-300 bg-gray-100  focus:outline-none mr-1"
						type="text"
						name="firstName"
						placeholder="First-name"
					/>
					<input
						className="flex-grow p-2 border border-gray-300 bg-gray-100  focus:outline-none mr-1"
						type="text"
						name="middleName"
						placeholder="Middle-name"
					/>
					<input
						className="flex-grow p-2 border border-gray-300 bg-gray-100  focus:outline-none"
						type="text"
						name="lastName"
						placeholder="Last-name"
					/>

					<button
						className="py-2 px-5 bg-blue-900 hover:bg-blue-950 text-white focus:outline-none"
						type="submit"
					>
						<FontAwesomeIcon icon={faSearch} />
					</button>
				</div>
				<button
					className="p-2  text-lg rounded-lg justify-center hover:bg-gray-100 flex gap-2 items-center focus:outline-none border border-gray-800"
					type="button"
					onClick={() => setOpen((prev) => !prev)}
				>
					Advanced Search
					<FontAwesomeIcon icon={open ? faCaretUp : faCaretDown} />
				</button>
				{open && (
					<div className="flex items-between border border-gray-400 rounded-md gap-1">
						<input
							className="flex-grow p-2 border border-gray-300 bg-gray-100  focus:outline-none "
							type="text"
							name="mobileNo"
							placeholder="Mobile number"
						/>
						<input
							className="flex-grow p-2 border border-gray-300 bg-gray-100  focus:outline-none"
							type="email"
							name="email"
							placeholder="Email"
						/>
					</div>
				)}
			</form>

			{patients && (
				<div className="bg-white p-6 rounded-md text-xl border border-gray-400 flex flex-col gap-3 h-full overflow-y-scroll relative">
					<div className="flex p-3 font-bold text-xl rounded-md sticky top-0 bg-white">
						<p className="w-24">No.</p>
						<p className="w-full">Patient&apos;s name</p>
						<p className="w-1/3 text-center">Sex</p>
						<p className="w-1/3 text-center">Age</p>
					</div>
					{patients.map((patient, ind) => {
						return (
							<Link key={ind} href={`/patients/${patient.id}`}>
								<div className="flex p-3 bg-blue-100 rounded-md">
									<p className="w-24">{ind + 1}</p>
									<p className="w-full">{`${patient.firstName} ${patient.middleName} ${patient.lastName}`}</p>
									<p className="w-1/3 text-center">
										{patient.sex}
									</p>
									<p className="w-1/3 text-center">
										{new Date().getFullYear() -
											new Date(
												patient.birthDate
											).getFullYear()}
									</p>
								</div>
							</Link>
						);
					})}
				</div>
			)}
		</main>
	);
}
