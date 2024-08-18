import prisma from "@/app/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const firstName = req.nextUrl.searchParams.get("firstname");
	const middleName = req.nextUrl.searchParams.get("middlename");
	const lastName = req.nextUrl.searchParams.get("lastname");
	const mobileNo = req.nextUrl.searchParams.get("mobileNo");
	const patients = await prisma.patient.findMany({
		where: {
			firstName: {
				contains: firstName || "",
				mode: "insensitive",
			},
			middleName: {
				contains: middleName || "",
				mode: "insensitive",
			},
			lastName: {
				contains: lastName || "",
				mode: "insensitive",
			},
			mobileNumber: {
				contains: mobileNo || "",
				mode: "insensitive",
			},
		},
	});
	return NextResponse.json(patients);
}
