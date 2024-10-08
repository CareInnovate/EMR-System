import prisma from "@/app/client";
import { NextResponse } from "next/server";

export async function GET() {
	const departments = await prisma.department.findMany();
	return NextResponse.json(departments);
}
