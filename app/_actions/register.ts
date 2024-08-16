"use server";
import prisma from "../client";

export async function registerPatient(initialState: any, formData: FormData) {
	const birthDate = new Date(formData.get("birthDate") as string);
	const kebele = parseInt(formData.get("kebele") as string);
	try {
		const patient = await prisma.patient.create({
			data: {
				birthDate: birthDate,
				city: formData.get("city") as string,
				firstName: formData.get("firstName") as string,
				middleName: formData.get("middleName") as string,
				lastName: formData.get("lastName") as string,
				//@ts-ignore
				sex: formData.get("sex"),
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
		if (patient) {
			return {
				message: "Patient registered successfully",
				password: patient.password,
				error: false,
			};
		}
	} catch (e) {
		//TODO: handle different errors
		console.log(e);
		return {
			message: "There was an error when registering the patient",
			error: true,
		};
	}
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
