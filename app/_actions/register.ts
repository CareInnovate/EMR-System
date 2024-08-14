"use server";
import prisma from "../client";

export async function registerPatient(formData: FormData) {
	const birthDate = new Date(formData.get("birthDate") as string);
	const kebele = parseInt(formData.get("kebele") as string);
	const patient = await prisma.patient.create({
		data: {
			birthDate: birthDate,
			city: formData.get("city") as string,
			firstName: formData.get("firstName") as string,
			middleName: formData.get("middleName") as string,
			lastName: formData.get("lastName") as string,
			sex: formData.get("sex"),
			bloodType: formData.get("bloodType") as string,
			mobileNumber: formData.get("mobileNo") as string,
			email: formData.get("email") as string,
			region: formData.get("region") as string,
			woreda: formData.get("woreda") as string,
			kebele: kebele,
			occupation: formData.get("occupation") as string,
			emergencyContactName: formData.get(
				"emergencyContactName"
			) as string,
			emergencyContactMobileNo: formData.get(
				"emergencyContactPhone"
			) as string,
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
