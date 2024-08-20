import DoctorTreatmentPage from "@/app/_pages/doctor/patient/page";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export default async function PatientPage({
	params,
}: {
	params: { id: string };
}) {
	const user = await getServerSession(options);

	switch (user?.user.role) {
		case "Doctor":
			return <DoctorTreatmentPage params={params} />;
		default:
			return <div>You are Unauthorized to view this page </div>;
	}
}
