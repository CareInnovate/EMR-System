import DoctorTreatmentPage from "@/app/_pages/doctor/patient/page";
import Unauthorized from "@/app/_pages/Unauthorized";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export default async function PatientPage({
	params,
	searchParams,
}: {
	params: { id: string };
	searchParams?: { appId: string };
}) {
	const user = await getServerSession(options);

	switch (user?.user.role) {
		case "Doctor":
			return (
				<DoctorTreatmentPage
					patientId={params.id}
					appointmentId={searchParams?.appId}
				/>
			);
		default:
			return <Unauthorized />;
	}
}
