import prisma from "../client";

export default async function getUserByPhone(phone: string, password: string) {
	const user = await prisma.patient.findUnique({
		where: { mobileNumber: phone, password: password },
	});
	return user;
}
