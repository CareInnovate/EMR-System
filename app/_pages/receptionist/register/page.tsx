import { registerPatient } from "@/app/_actions/register";
import Button from "@/app/_components/Button";
import InputBox from "@/app/_components/InputBox";

export function ReceptionistRegister() {
	return (
		<main className="w-full mt-24 flex flex-col items-center gap-3 py-1 px-9 sm:px-5">
			<form
				className="grid grid-cols-1 lg:grid-cols-2 w-full sm:w-3/4  gap-2 text-sm sm:text-lg break-words border-gray-200 rounded-md border-2 p-9"
				action={registerPatient}
			>
				<h1 className="text-3xl lg:col-span-2 font-bold p-2">
					Register Patient
				</h1>
				<InputBox label="First Name" name="firstName" required={true} />
				<InputBox
					label="Middle Name"
					name="middleName"
					required={true}
				/>
				<InputBox label="Last Name" name="lastName" required={true} />
				<label className="flex flex-col gap-2 ">
					<span className="p-2 w-1/3 max-w-48 font-bold">Sex:</span>
					<select
						className="ml-2 p-2 w-3/5 max-w-96 border border-gray-200 rounded-md"
						required
					>
						<option value="MALE">Male</option>
						<option value="FEMALE">Female</option>
					</select>
				</label>
				<InputBox
					label="Birthdate"
					name="birthDate"
					type="date"
					required={true}
				/>
				<InputBox label="Region" name="region" required={true} />
				<InputBox label="City" name="city" required={true} />
				<InputBox label="Woreda" name="woreda" required={true} />
				<InputBox label="Kebele" name="kebele" />
				<InputBox label="Mobile No." name="mobileNo" required={true} />
				<InputBox label="Email" name="email" />
				<InputBox label="Occupation" name="occupation" />
				<InputBox
					label="Emergency Contact Name"
					name="emergencyContactName"
				/>
				<InputBox
					label="Emergency Contact Mobile No."
					name="emergencyContactPhone"
				/>
				<InputBox label="Blood Type" name="bloodType" />
				<div></div>
				<div className="lg:col-span-2 flex justify-end w-3/4 m-auto mt-2 gap-2">
					<Button />
					<button
						type="submit"
						className="bg-blue-950 text-white py-4 px-12 rounded-md"
					>
						Save
					</button>
				</div>
			</form>
		</main>
	);
}
