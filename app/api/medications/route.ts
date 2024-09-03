import prisma from "@/app/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const name = req.nextUrl.searchParams.get("search") as string;
	const medications = await prisma.medication.findMany({
		where: {
			OR: [
				{
					name: {
						contains: name,
						mode: "insensitive",
					},
				},
				{
					description: {
						contains: name,
						mode: "insensitive",
					},
				},
			],
		},
		take: 5,
	});
	return NextResponse.json(medications);
}
