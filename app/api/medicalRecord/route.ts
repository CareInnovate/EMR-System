import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
	const { patientId, doctorId, data } = await req.json();
	console.log(doctorId);
}
