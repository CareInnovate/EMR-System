import prisma from "../client";

export async function registerPatient(formData: FormData) {
	const birthDate = new Date();
	birthDate.setFullYear(2024, 1, 1);
	const patient = await prisma.patient.create({
		data: {
			birthDate: birthDate,
			city: "Birmingham",
			firstName: "Arthur",
			middleName: "Shelby",
			lastName: "Limited",
			mobileNumber: "111-055-2554",
			region: "North-England",
			sex: "MALE",
			woreda: "",
			occupation: "Business Man",
			emergencyContactName: "Thomas Shelby",
			password: "",
		},
	});
}

export async function registerStaff(formData: FormData) {
	const birthDate = new Date();
	birthDate.setFullYear(2024, 1, 1);
	const staff = await prisma.staff.create({
		data: {
			birthDate: birthDate,
			city: "Birmingham",
			firstName: "Arthur",
			middleName: "Shelby",
			lastName: "Limited",
			mobileNumber: "111-055-2554",
			region: "North-England",
			sex: "MALE",
			woreda: "",
			emergencyContact: "Thomas Shelby",
			email: "example@test.com",
			employmentStatus: "Active",
			password: "password",
			username: "username",
			role: { connect: { id: "" } }, //By name is better
			doctor: {
				create: {},
			}, //If Doctor
		},
	});
}
