import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { consultationData } from "./PatientConsultation";
import { Diseases, Medication } from "@prisma/client";
type props = {
	label: string;
	name: "diagnosis" | "prescription";
	fetchUrl: string;
	placeholder?: string;
	setData?: Dispatch<SetStateAction<consultationData>>;
	setMedication?: (med: Medication) => void;
};
const SearchBox = ({
	label,
	name,
	setData,
	placeholder,
	fetchUrl,
	setMedication,
}: props) => {
	const [time, setTime] = useState<NodeJS.Timeout>();
	const [options, setOptions] = useState<Diseases[] | Medication[]>([]);
	function onChange(e: ChangeEvent<HTMLInputElement>) {
		if (time) {
			clearTimeout(time);
		}
		const timeout = setTimeout(async () => {
			const searchParams = new URLSearchParams({
				search: e.target.value,
			});
			const res = await fetch(
				`http://localhost:3000/api/${fetchUrl}?${searchParams.toString()}`
			);
			const data = await res.json();
			setOptions(data);
		}, 1000);
		setTime(timeout);
	}
	return (
		<div className="pr-5 flex flex-col gap-2">
			<input
				className="p-2 w-full border border-gray-300 rounded-md"
				name={name}
				id={name}
				placeholder={placeholder}
				onChange={onChange}
			/>

			{options?.length > 0 && (
				<div className="flex flex-col gap-2 shadow-md p-2">
					{options.map((option, ind) => {
						return (
							<p
								key={ind}
								onClick={() => {
									setOptions([]);
									setData &&
										setData((prev) => {
											return {
												...prev,
												[name]: [
													...prev[name],
													option.name,
												],
											};
										});
									setMedication &&
										setMedication(option as Medication);
								}}
								className="p-2 bg-gray-50 rounded-md cursor-pointer"
							>
								{option.name}
							</p>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default SearchBox;
