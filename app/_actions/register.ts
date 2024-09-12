"use server";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import prisma from "../client";
import { z } from "zod";
import { Sex } from "@prisma/client";

const registerPatientSchema = z.object({
	firstName: z.string().min(3, { message: "First name is required" }),
	middleName: z.string().min(2, { message: "Middle name is required" }),
	lastName: z.string().min(3, { message: "Last name is required" }),
	mobileNumber: z
		.string({ message: "Phone number is required" })
		.min(10, { message: "Phone number must be at least 10 digits" }),
	email: z.string().email({ message: "Invalid email address" }),
	emergencyContactName: z
		.string()
		.min(3, { message: "Emergency Contact name is required" }),
	emergencyContactMobileNo: z
		.string({ message: "Emergency contact's phone number is required" })
		.min(10, {
			message:
				"Emergency contact's phone number must be at least 10 digits",
		}),
});
export async function registerPatient(initialState: any, formData: FormData) {
	const birthDate = new Date(formData.get("birthDate") as string);
	const password = generatePassword(8);
	const data = {
		birthDate: birthDate,
		city: formData.get("city") as string,
		firstName: formData.get("firstName") as string,
		middleName: formData.get("middleName") as string,
		lastName: formData.get("lastName") as string,
		sex: formData.get("sex") as Sex,
		mobileNumber: formData.get("mobileNo") as string,
		email: formData.get("email") as string,
		region: formData.get("region") as string,
		woreda: formData.get("woreda") as string,
		kebele: formData.get("kebele")?.toString() as string,
		occupation: formData.get("occupation") as string,
		emergencyContactName: formData.get("emergencyContactName") as string,
		emergencyContactMobileNo: formData.get(
			"emergencyContactPhone"
		) as string,
		password: password,
	};
	const parsed = registerPatientSchema.safeParse(data);
	if (!parsed.success) {
		return {
			message: parsed.error.errors[0].message,
			error: true,
		};
	}
	try {
		const patient = await prisma.patient.create({
			data: data,
		});
		if (patient) {
			return {
				message: "Patient registered successfully",
				password: patient.password,
				error: false,
			};
		}
	} catch (e) {
		if (e instanceof PrismaClientKnownRequestError) {
			if (e.code === "P2002") {
				const target = e.meta?.target;
				if (typeof target === "string" && target.includes("email")) {
					return {
						message: "A user already exists with this email",
						error: true,
					};
				} else if (
					typeof target === "string" &&
					target.includes("mobileNumber")
				) {
					return {
						message: "A user already exists with this phone number",
						error: true,
					};
				}
			}
		}
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
function generatePassword(length: number): string {
	let result = "";
	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	const charactersLength = characters.length;
	let counter = 0;
	while (counter < length) {
		result += characters.charAt(
			Math.floor(Math.random() * charactersLength)
		);
		counter += 1;
	}
	return result;
}
