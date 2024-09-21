"use server";
import { z } from "zod";
import prisma from "../client";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const passwordSchema = z.object({
	prevPass: z.string().min(8, {
		message: "Your previous password must be atleast 8 characters long",
	}),
	newPass: z.string().min(8, {
		message: "Your new password must be atleast 8 characters long",
	}),
	confirmPass: z.string(),
});
export async function changePassword(
	initialState: any,
	formData: FormData
): Promise<{
	message: string;
	error: boolean;
}> {
	const user = await getServerSession(options);
	const data = {
		prevPass: formData.get("prevPass") as string,
		newPass: formData.get("newPass") as string,
		confirmPass: formData.get("confirmPass") as string,
	};
	const parsed = passwordSchema.safeParse(data);
	if (!parsed.success) {
		return {
			message: parsed.error.errors[0].message,
			error: true,
		};
	}
	if (data.confirmPass !== data.newPass) {
		return {
			message:
				"The confirmation password doesn't match your new password",
			error: true,
		};
	}
	try {
		let updatedUser;
		if (user?.user.role === "Patient") {
			updatedUser = await prisma.patient.update({
				where: {
					id: user?.user.id,
					password: parsed.data.prevPass,
				},
				data: {
					password: parsed.data.newPass,
				},
			});
		} else {
			updatedUser = await prisma.staff.update({
				where: {
					id: user?.user.id,
					password: parsed.data.prevPass,
				},
				data: {
					password: parsed.data.newPass,
				},
			});
		}
		if (updatedUser) {
			return {
				message: "Password changed successfully",
				error: false,
			};
		}
		return {
			message: "Couldn't get user's session",
			error: true,
		};
	} catch (e) {
		console.error(e);
		if (e instanceof PrismaClientKnownRequestError) {
			console.log(e.code);
			if (e.code === "P2025") {
				return {
					message: "Your previous password is Incorrect",
					error: true,
				};
			}
		}
		return {
			message: "There was an error when changing password",
			error: true,
		};
	}
}
