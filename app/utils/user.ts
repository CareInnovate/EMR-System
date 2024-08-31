import prisma from "../client";

export default async function getUserByPhone(phone: string, password: string) {
	const patient = await prisma.patient.findUnique({
		where: { mobileNumber: phone, password: password },
		select: {
			firstName: true,
			middleName: true,
			lastName: true,
			email: true,
			id: true,
		},
	});
	if (patient) {
		return { ...patient, role: { name: "Patient" }, departmentId: null };
	}
	const staff = await prisma.staff.findUnique({
		where: { mobileNumber: phone, password: password },
		select: {
			firstName: true,
			middleName: true,
			lastName: true,
			email: true,
			id: true,
			role: { select: { name: true } },
			departmentId: true,
		},
	});
	return staff;
}
