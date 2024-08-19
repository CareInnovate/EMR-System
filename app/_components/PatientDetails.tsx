import malePic from "@/public/Male.svg";
import femalePic from "@/public/Male.svg";
import Image from "next/image";
import { patient } from "../api/patient/[id]/route";
const PatientDetails = ({ patient }: { patient: patient }) => {
	return (
		<div className="w-full bg-blue-700 text-white flex md:flex-row flex-col items-center p-5 rounded-3xl gap-4 ">
			<div className="flex w-full gap-5 items-center ">
				<Image
					src={patient.sex === "MALE" ? malePic : femalePic}
					alt="Profile pic"
					className="w-32 h-32 bg-blue-100 rounded-xl"
				/>
				<div className="flex flex-col justify-around h-full">
					<div className="flex flex-col gap-0">
						<h1 className="text-lg sm:text-xl font-bold">{`${patient.firstName} ${patient.middleName} ${patient.lastName}`}</h1>
						<h6>
							{new Date().getFullYear() -
								new Date(patient.birthDate).getFullYear()}{" "}
							Years old
						</h6>
						<h4>{patient.sex}</h4>
					</div>
				</div>
			</div>
			<div className="grid grid-cols-3 w-full ml-4 gap-4">
				<div className="flex flex-col">
					<p>Height</p>
					<p className="font-bold">
						{patient.patientRecord?.height || "Unknown"}
					</p>
				</div>
				<div className="flex flex-col">
					<p>Weight</p>
					<p className="font-bold">
						{patient.patientRecord?.weight || "Unknown"}
					</p>
				</div>
				<div className="flex flex-col">
					<p>Blood Type</p>
					<p className="font-bold">
						{patient.patientRecord?.bloodType || "Unknown"}
					</p>
				</div>
				<div className="flex flex-col">
					<p>Allergies</p>
					<p className="font-bold">
						{patient.patientRecord?.allergies || "Unknown"}
					</p>
				</div>
				<div className="flex flex-col">
					<p>Family History</p>
					<p className="font-bold">
						{patient.patientRecord?.familyHistory || "Unknown"}
					</p>
				</div>
				<div className="flex flex-col">
					<p>Condition</p>
					<p className="font-bold">
						{patient.patientRecord?.patientCondition || "Unknown"}
					</p>
				</div>
			</div>
		</div>
	);
};

export default PatientDetails;
