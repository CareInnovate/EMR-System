import PatientPayment from "@/app/_pages/patient/payment/page";
import Unauthorized from "@/app/_pages/Unauthorized";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export default async function Payment() {
	const user = await getServerSession(options);

	switch (user?.user.role) {
		case "Patient":
			return <PatientPayment />;
		default:
			return <Unauthorized />;
	}
}
