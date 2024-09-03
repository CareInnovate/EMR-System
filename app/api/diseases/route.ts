import prisma from "@/app/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const value = req.nextUrl.searchParams.get("search");
	const diseases = await prisma.diseases.findMany({
		where: {
			name: {
				contains: value || "",
				mode: "insensitive",
			},
		},
		take: 5,
	});
	return NextResponse.json(diseases);
}
