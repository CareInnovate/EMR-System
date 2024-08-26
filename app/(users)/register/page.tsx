import { ReceptionistRegister } from "@/app/_pages/receptionist/register/page";
import Unauthorized from "@/app/_pages/Unauthorized";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export default async function Register() {
	const user = await getServerSession(options);

	switch (user?.user.role) {
		case "Administrator":
			return <div></div>;
		case "Receptionist":
			return <ReceptionistRegister />;
		default:
			return <Unauthorized />;
	}
}
